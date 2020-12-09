// Copyright 2019-2020 @polkadot/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { KeyringPair } from '@polkadot/keyring/esm/types';
import type { SignerPayloadRaw } from '@polkadot/types/esm/types';
import type { RequestSign } from './types';

import { TypeRegistry } from '@polkadot/types/esm';
import { hexToU8a, u8aToHex } from '@polkadot/util/esm';

export default class RequestBytesSign implements RequestSign {
  public readonly payload: SignerPayloadRaw;

  constructor (payload: SignerPayloadRaw) {
    this.payload = payload;
  }

  sign (_registry: TypeRegistry, pair: KeyringPair): { signature: string } {
    return {
      signature: u8aToHex(
        pair.sign(
          hexToU8a(this.payload.data)
        )
      )
    };
  }
}
