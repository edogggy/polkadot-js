// Copyright 2019 @polkadot/extension-dapp authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { InjectedAccountWithMeta, InjectedExtension, InjectedExtensionInfo, InjectedWindow } from './types';

// just a helper (otherwise we cast all-over, so shorter and more readable)
const injectedWeb3 = (window as InjectedWindow).injectedWeb3;

// have we found the window.injectedWeb3
const isWeb3Injected = !!injectedWeb3 && Object.keys(injectedWeb3).length !== 0;

// we keep the last promise created around (for queries)
let web3EnablePromise: Promise<Array<InjectedExtension>> | null = null;

export { isWeb3Injected, web3EnablePromise };

// enables all the providers found on the injected window interface
export function web3Enable (originName: string): Promise<Array<InjectedExtension>> {
  web3EnablePromise = Promise
    .all(
      Object
        .entries(injectedWeb3)
        .map(([name, { enable, version }]) =>
          Promise
            .all([Promise.resolve({ name, version }), enable(originName)])
            .catch(() => [{ name, version }, null] as [InjectedExtensionInfo, null])
        )
    )
    .then((values) =>
      values
        .filter(([, ext]) => ext !== null)
        .map(([info, ext]) => ({ ...info, ...ext } as InjectedExtension))
    )
    .catch(() => [] as Array<InjectedExtension>)
    .then((values) => {
      const names = values.map(({ name, version }) => `${name}/${version}`);

      console.log(`web3Enable: Enabled ${values.length} extensions ${names.join(', ')}`);

      return values;
    });

  return web3EnablePromise;
}

// retrieve all the accounts accross all providers
export async function web3Accounts (): Promise<Array<InjectedAccountWithMeta>> {
  if (!web3EnablePromise) {
    throw new Error(`web3Accounts: web3Enable(originName) needs to be called before web3Accounts`);
  }

  const accounts: Array<InjectedAccountWithMeta> = [];
  const injected = await web3EnablePromise;
  const retrieved = await Promise.all(
    injected.map(async ({ accounts, name: source }) => {
      try {
        const list = await accounts.get();

        return list.map(({ address, name }) => ({
          address,
          meta: { name, source }
        }));
      } catch (error) {
        // cannot handle this one
        return [];
      }
    })
  );

  retrieved.forEach((result) => accounts.push(...result));

  const addresses = accounts.map(({ address }) => address);

  console.log(`web3Accounts: Found ${accounts.length} addresses ${addresses.join(', ')}`);

  return accounts;
}

// find a specific provider based on an address
export async function web3FromAddress (address: string): Promise<InjectedExtension> {
  if (!web3EnablePromise) {
    throw new Error(`web3FromAddress: web3Enable(originName) needs to be called before web3FromAddress`);
  }

  const accounts = await web3Accounts();
  const found = address && accounts.find((account) => account.address === address);

  if (!found) {
    throw new Error(`web3FromAddress: Unable to find injected ${address}`);
  }

  return web3FromSource(found.meta.source);
}

// find a specific provider based on the name
export async function web3FromSource (source: string): Promise<InjectedExtension> {
  if (!web3EnablePromise) {
    throw new Error(`web3FromSource: web3Enable(originName) needs to be called before web3FromSource`);
  }

  const sources = await web3EnablePromise;
  const found = source && sources.find(({ name }) => name === source);

  if (!found) {
    throw new Error(`web3FromSource: Unable to find an injected ${source}`);
  }

  return found;
}
