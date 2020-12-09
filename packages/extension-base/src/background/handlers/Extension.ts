// Copyright 2019-2020 @polkadot/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { MetadataDef } from '@polkadot/extension-inject/esm/types';
import type { KeyringPair, KeyringPair$Json, KeyringPair$Meta } from '@polkadot/keyring/esm/types';
import type { SubjectInfo } from '@polkadot/ui-keyring/esm/observable/types';
import type { AccountJson, AllowedPath, AuthorizeRequest, MessageTypes, MetadataRequest, RequestAccountChangePassword, RequestAccountCreateExternal, RequestAccountCreateSuri, RequestAccountEdit, RequestAccountExport, RequestAccountForget, RequestAccountShow, RequestAccountTie, RequestAccountValidate, RequestAuthorizeApprove, RequestAuthorizeReject, RequestDeriveCreate, RequestDeriveValidate, RequestJsonRestore, RequestMetadataApprove, RequestMetadataReject, RequestSeedCreate, RequestSeedValidate, RequestSigningApprovePassword, RequestSigningApproveSignature, RequestSigningCancel, RequestSigningIsLocked, RequestTypes, ResponseAccountExport, ResponseDeriveValidate, ResponseJsonGetAccountInfo, ResponseSeedCreate, ResponseSeedValidate, ResponseSigningIsLocked, ResponseType, SigningRequest } from '../types';

import { ALLOWED_PATH, PASSWORD_EXPIRY_MS } from '@polkadot/extension-base/esm/defaults';
import chrome from '@polkadot/extension-inject/esm/chrome';
import { TypeRegistry } from '@polkadot/types/esm';
import { keyring } from '@polkadot/ui-keyring/esm';
import { accounts as accountsObservable } from '@polkadot/ui-keyring/esm/observable/accounts';
import { assert, isHex } from '@polkadot/util/esm';
import { keyExtractSuri, mnemonicGenerate, mnemonicValidate } from '@polkadot/util-crypto/esm';

import State from './State';
import { createSubscription, unsubscribe } from './subscriptions';

type CachedUnlocks = Record<string, number>;

const SEED_DEFAULT_LENGTH = 12;
const SEED_LENGTHS = [12, 15, 18, 21, 24];

// a global registry to use internally
const registry = new TypeRegistry();

function transformAccounts (accounts: SubjectInfo): AccountJson[] {
  return Object.values(accounts).map(({ json: { address, meta } }): AccountJson => ({
    address,
    ...meta
  }));
}

export default class Extension {
  readonly #cachedUnlocks: CachedUnlocks;

  readonly #state: State;

  constructor (state: State) {
    this.#cachedUnlocks = {};
    this.#state = state;
  }

  private accountsCreateExternal ({ address, genesisHash, name }: RequestAccountCreateExternal): boolean {
    keyring.addExternal(address, { genesisHash, name });

    return true;
  }

  private accountsCreateSuri ({ genesisHash, name, password, suri, type }: RequestAccountCreateSuri): boolean {
    keyring.addUri(suri, password, { genesisHash, name }, type);

    return true;
  }

  private accountsChangePassword ({ address, newPass, oldPass }: RequestAccountChangePassword): boolean {
    const pair = keyring.getPair(address);

    assert(pair, 'Unable to find pair');

    try {
      if (!pair.isLocked) {
        pair.lock();
      }

      pair.decodePkcs8(oldPass);
    } catch (error) {
      throw new Error('oldPass is invalid');
    }

    keyring.encryptAccount(pair, newPass);

    return true;
  }

  private accountsEdit ({ address, name }: RequestAccountEdit): boolean {
    const pair = keyring.getPair(address);

    assert(pair, 'Unable to find pair');

    keyring.saveAccountMeta(pair, { ...pair.meta, name });

    return true;
  }

  private accountsExport ({ address, password }: RequestAccountExport): ResponseAccountExport {
    return { exportedJson: JSON.stringify(keyring.backupAccount(keyring.getPair(address), password)) };
  }

  private accountsForget ({ address }: RequestAccountForget): boolean {
    keyring.forgetAccount(address);

    return true;
  }

  private refreshAccountPasswordCache (pair: KeyringPair): number {
    const { address } = pair;

    const savedExpiry = this.#cachedUnlocks[address] || 0;
    const remainingTime = savedExpiry - Date.now();

    if (remainingTime < 0) {
      this.#cachedUnlocks[address] = 0;
      pair.lock();

      return 0;
    }

    return remainingTime;
  }

  private accountsShow ({ address, isShowing }: RequestAccountShow): boolean {
    const pair = keyring.getPair(address);

    assert(pair, 'Unable to find pair');

    keyring.saveAccountMeta(pair, { ...pair.meta, isHidden: !isShowing });

    return true;
  }

  private accountsTie ({ address, genesisHash }: RequestAccountTie): boolean {
    const pair = keyring.getPair(address);

    assert(pair, 'Unable to find pair');

    keyring.saveAccountMeta(pair, { ...pair.meta, genesisHash });

    return true;
  }

  private accountsValidate ({ address, password }: RequestAccountValidate): boolean {
    try {
      keyring.backupAccount(keyring.getPair(address), password);

      return true;
    } catch (e) {
      return false;
    }
  }

  // FIXME This looks very much like what we have in Tabs
  private accountsSubscribe (id: string, port: chrome.runtime.Port): boolean {
    const cb = createSubscription<'pri(accounts.subscribe)'>(id, port);
    const subscription = accountsObservable.subject.subscribe((accounts: SubjectInfo): void =>
      cb(transformAccounts(accounts))
    );

    port.onDisconnect.addListener((): void => {
      unsubscribe(id);
      subscription.unsubscribe();
    });

    return true;
  }

  private authorizeApprove ({ id }: RequestAuthorizeApprove): boolean {
    const queued = this.#state.getAuthRequest(id);

    assert(queued, 'Unable to find request');

    const { resolve } = queued;

    resolve(true);

    return true;
  }

  private authorizeReject ({ id }: RequestAuthorizeReject): boolean {
    const queued = this.#state.getAuthRequest(id);

    assert(queued, 'Unable to find request');

    const { reject } = queued;

    reject(new Error('Rejected'));

    return true;
  }

  // FIXME This looks very much like what we have in accounts
  private authorizeSubscribe (id: string, port: chrome.runtime.Port): boolean {
    const cb = createSubscription<'pri(authorize.requests)'>(id, port);
    const subscription = this.#state.authSubject.subscribe((requests: AuthorizeRequest[]): void =>
      cb(requests)
    );

    port.onDisconnect.addListener((): void => {
      unsubscribe(id);
      subscription.unsubscribe();
    });

    return true;
  }

  private metadataApprove ({ id }: RequestMetadataApprove): boolean {
    const queued = this.#state.getMetaRequest(id);

    assert(queued, 'Unable to find request');

    const { request, resolve } = queued;

    this.#state.saveMetadata(request);

    resolve(true);

    return true;
  }

  private metadataGet (genesisHash: string | null): MetadataDef | null {
    return this.#state.knownMetadata.find((result) => result.genesisHash === genesisHash) || null;
  }

  private metadataList (): MetadataDef[] {
    return this.#state.knownMetadata;
  }

  private metadataReject ({ id }: RequestMetadataReject): boolean {
    const queued = this.#state.getMetaRequest(id);

    assert(queued, 'Unable to find request');

    const { reject } = queued;

    reject(new Error('Rejected'));

    return true;
  }

  private metadataSubscribe (id: string, port: chrome.runtime.Port): boolean {
    const cb = createSubscription<'pri(metadata.requests)'>(id, port);
    const subscription = this.#state.metaSubject.subscribe((requests: MetadataRequest[]): void =>
      cb(requests)
    );

    port.onDisconnect.addListener((): void => {
      unsubscribe(id);
      subscription.unsubscribe();
    });

    return true;
  }

  private jsonRestore ({ file, password }: RequestJsonRestore): void {
    try {
      keyring.restoreAccount(file, password);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  private jsonGetAccountInfo (json: KeyringPair$Json): ResponseJsonGetAccountInfo {
    try {
      const pair = keyring.createFromJson(json);

      return {
        address: pair.address,
        genesisHash: pair.meta.genesisHash,
        name: pair.meta.name
      } as ResponseJsonGetAccountInfo;
    } catch (e) {
      console.error(e);
      throw new Error((e as Error).message);
    }
  }

  private seedCreate ({ length = SEED_DEFAULT_LENGTH, type }: RequestSeedCreate): ResponseSeedCreate {
    const seed = mnemonicGenerate(length);

    return {
      address: keyring.createFromUri(seed, {}, type).address,
      seed
    };
  }

  private seedValidate ({ suri, type }: RequestSeedValidate): ResponseSeedValidate {
    const { phrase } = keyExtractSuri(suri);

    if (isHex(phrase)) {
      assert(isHex(phrase, 256), 'Hex seed needs to be 256-bits');
    } else {
      // sadly isHex detects as string, so we need a cast here
      assert(SEED_LENGTHS.includes((phrase as string).split(' ').length), `Mnemonic needs to contain ${SEED_LENGTHS.join(', ')} words`);
      assert(mnemonicValidate(phrase), 'Not a valid mnemonic seed');
    }

    return {
      address: keyring.createFromUri(suri, {}, type).address,
      suri
    };
  }

  private signingApprovePassword ({ id, password, savePass }: RequestSigningApprovePassword): boolean {
    const queued = this.#state.getSignRequest(id);

    assert(queued, 'Unable to find request');

    const { reject, request, resolve } = queued;
    const pair = keyring.getPair(queued.account.address);

    // unlike queued.account.address the following
    // address is encoded with the default prefix
    // which what is used for password caching mapping
    const { address } = pair;

    if (!pair) {
      reject(new Error('Unable to find pair'));

      return false;
    }

    this.refreshAccountPasswordCache(pair);

    // if the keyring pair is locked, the password is needed
    if (pair.isLocked && !password) {
      reject(new Error('Password needed to unlock the account'));
    }

    if (pair.isLocked) {
      pair.decodePkcs8(password);
    }

    const result = request.sign(registry, pair);

    if (savePass) {
      this.#cachedUnlocks[address] = Date.now() + PASSWORD_EXPIRY_MS;
    } else {
      pair.lock();
    }

    resolve({
      id,
      ...result
    });

    return true;
  }

  private signingApproveSignature ({ id, signature }: RequestSigningApproveSignature): boolean {
    const queued = this.#state.getSignRequest(id);

    assert(queued, 'Unable to find request');

    const { resolve } = queued;

    resolve({ id, signature });

    return true;
  }

  private signingCancel ({ id }: RequestSigningCancel): boolean {
    const queued = this.#state.getSignRequest(id);

    assert(queued, 'Unable to find request');

    const { reject } = queued;

    reject(new Error('Cancelled'));

    return true;
  }

  private signingIsLocked ({ id }: RequestSigningIsLocked): ResponseSigningIsLocked {
    const queued = this.#state.getSignRequest(id);

    assert(queued, 'Unable to find request');

    const address = queued.request.payload.address;
    const pair = keyring.getPair(address);

    assert(pair, 'Unable to find pair');

    const remainingTime = this.refreshAccountPasswordCache(pair);

    return {
      isLocked: pair.isLocked,
      remainingTime
    };
  }

  // FIXME This looks very much like what we have in authorization
  private signingSubscribe (id: string, port: chrome.runtime.Port): boolean {
    const cb = createSubscription<'pri(signing.requests)'>(id, port);
    const subscription = this.#state.signSubject.subscribe((requests: SigningRequest[]): void =>
      cb(requests)
    );

    port.onDisconnect.addListener((): void => {
      unsubscribe(id);
      subscription.unsubscribe();
    });

    return true;
  }

  private windowOpen (path: AllowedPath): boolean {
    const url = `${chrome.extension.getURL('index.html')}#${path}`;

    if (!ALLOWED_PATH.includes(path)) {
      console.error('Not allowed to open the url:', url);

      return false;
    }

    console.log('open', url);
    chrome.tabs.create({ url });

    return true;
  }

  private derive (parentAddress: string, suri: string, password: string, metadata: KeyringPair$Meta): KeyringPair {
    const parentPair = keyring.getPair(parentAddress);

    try {
      parentPair.decodePkcs8(password);
    } catch (e) {
      throw new Error('invalid password');
    }

    try {
      return parentPair.derive(suri, metadata);
    } catch (err) {
      throw new Error(`"${suri}" is not a valid derivation path`);
    }
  }

  private derivationValidate ({ parentAddress, parentPassword, suri }: RequestDeriveValidate): ResponseDeriveValidate {
    const childPair = this.derive(parentAddress, suri, parentPassword, {});

    return {
      address: childPair.address,
      suri
    };
  }

  private derivationCreate ({ genesisHash, name, parentAddress, parentPassword, password, suri }: RequestDeriveCreate): boolean {
    const childPair = this.derive(parentAddress, suri, parentPassword, {
      genesisHash,
      name,
      parentAddress,
      suri
    });

    keyring.addPair(childPair, password);

    return true;
  }

  // Weird thought, the eslint override is not needed in Tabs
  // eslint-disable-next-line @typescript-eslint/require-await
  public async handle<TMessageType extends MessageTypes> (id: string, type: TMessageType, request: RequestTypes[TMessageType], port: chrome.runtime.Port): Promise<ResponseType<TMessageType>> {
    switch (type) {
      case 'pri(authorize.approve)':
        return this.authorizeApprove(request as RequestAuthorizeApprove);

      case 'pri(authorize.reject)':
        return this.authorizeReject(request as RequestAuthorizeReject);

      case 'pri(authorize.requests)':
        return this.authorizeSubscribe(id, port);

      case 'pri(accounts.create.external)':
        return this.accountsCreateExternal(request as RequestAccountCreateExternal);

      case 'pri(accounts.create.suri)':
        return this.accountsCreateSuri(request as RequestAccountCreateSuri);

      case 'pri(accounts.changePassword)':
        return this.accountsChangePassword(request as RequestAccountChangePassword);

      case 'pri(accounts.edit)':
        return this.accountsEdit(request as RequestAccountEdit);

      case 'pri(accounts.export)':
        return this.accountsExport(request as RequestAccountExport);

      case 'pri(accounts.forget)':
        return this.accountsForget(request as RequestAccountForget);

      case 'pri(accounts.show)':
        return this.accountsShow(request as RequestAccountShow);

      case 'pri(accounts.subscribe)':
        return this.accountsSubscribe(id, port);

      case 'pri(accounts.tie)':
        return this.accountsTie(request as RequestAccountTie);

      case 'pri(accounts.validate)':
        return this.accountsValidate(request as RequestAccountValidate);

      case 'pri(metadata.approve)':
        return this.metadataApprove(request as RequestMetadataApprove);

      case 'pri(metadata.get)':
        return this.metadataGet(request as string);

      case 'pri(metadata.list)':
        return this.metadataList();

      case 'pri(metadata.reject)':
        return this.metadataReject(request as RequestMetadataReject);

      case 'pri(metadata.requests)':
        return this.metadataSubscribe(id, port);

      case 'pri(derivation.create)':
        return this.derivationCreate(request as RequestDeriveCreate);

      case 'pri(derivation.validate)':
        return this.derivationValidate(request as RequestDeriveValidate);

      case 'pri(json.restore)':
        return this.jsonRestore(request as RequestJsonRestore);

      case 'pri(json.account.info)':
        return this.jsonGetAccountInfo(request as KeyringPair$Json);

      case 'pri(seed.create)':
        return this.seedCreate(request as RequestSeedCreate);

      case 'pri(seed.validate)':
        return this.seedValidate(request as RequestSeedValidate);

      case 'pri(signing.approve.password)':
        return this.signingApprovePassword(request as RequestSigningApprovePassword);

      case 'pri(signing.approve.signature)':
        return this.signingApproveSignature(request as RequestSigningApproveSignature);

      case 'pri(signing.cancel)':
        return this.signingCancel(request as RequestSigningCancel);

      case 'pri(signing.isLocked)':
        return this.signingIsLocked(request as RequestSigningIsLocked);

      case 'pri(signing.requests)':
        return this.signingSubscribe(id, port);

      case 'pri(window.open)':
        return this.windowOpen(request as AllowedPath);

      default:
        throw new Error(`Unable to handle message of type ${type}`);
    }
  }
}
