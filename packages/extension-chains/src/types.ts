// Copyright 2019 @polkadot/extension-chains authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

export interface Chain {
  genesisHash?: string;
  icon: string;
  isUnknown?: boolean;
  metaRaw?: Uint8Array;
  name: string;
  specVersion: number;
  ss58Format: number;
  tokenDecimals: number;
  tokenSymbol: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  types: Record<string, any>;
}
