// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { NetworkJson } from '@subwallet/extension-base/background/KoniTypes';
import { AccountJson, FindAccountFunction } from '@subwallet/extension-base/background/types';
import { ALL_ACCOUNT_KEY } from '@subwallet/extension-koni-base/constants';
import { MODE_CAN_SIGN, SIGN_MODE } from '@subwallet/extension-koni-ui/constants/signing';
import { getNetworkJsonByGenesisHash, getNetworkKeyByGenesisHash } from '@subwallet/extension-koni-ui/util/getNetworkJsonByGenesisHash';
import { getLogoByNetworkKey } from '@subwallet/extension-koni-ui/util/index';
import reformatAddress from '@subwallet/extension-koni-ui/util/reformatAddress';
import { AccountInfoByNetwork } from '@subwallet/extension-koni-ui/util/types';

import { decodeAddress, encodeAddress, isEthereumAddress } from '@polkadot/util-crypto';

export const createFindAccountHandler = (accounts: AccountJson[]): FindAccountFunction => {
  return (networkMap: Record<string, NetworkJson>, address: string, genesisHash?: string): AccountJson | undefined => {
    if (!genesisHash) {
      return accounts.find((account) => {
        const formattedAddress = reformatAddress(account.address, 42, true);

        return formattedAddress.toLowerCase() === address.toLowerCase();
      });
    }

    const network: NetworkJson | null = getNetworkJsonByGenesisHash(networkMap, genesisHash);

    if (network) {
      for (const account of accounts) {
        const formattedAddress = reformatAddress(account.address, network.ss58Format, network.isEthereum);

        if (formattedAddress.toLowerCase() === address.toLowerCase()) {
          return account;
        }
      }
    } else {
      return accounts.find((account) => account.address.toLowerCase() === address.toLowerCase());
    }

    // eslint-disable-next-line no-useless-return
    return;
  };
};

export const getAccountInfoByNetwork = (networkMap: Record<string, NetworkJson>, address: string, network: NetworkJson): AccountInfoByNetwork => {
  const networkKey = getNetworkKeyByGenesisHash(networkMap, network.genesisHash) || '';

  return {
    address,
    key: networkKey,
    networkKey,
    networkDisplayName: network.chain,
    networkPrefix: network.ss58Format,
    networkLogo: getLogoByNetworkKey(networkKey),
    networkIconTheme: network.isEthereum ? 'ethereum' : (network.icon || 'polkadot'),
    formattedAddress: reformatAddress(address, network.ss58Format, network.isEthereum)
  };
};

export const findAccountByAddress = (accounts: AccountJson[], address?: string): AccountJson | null => {
  try {
    if (!address) {
      return null;
    }

    const originAddress = isEthereumAddress(address) ? address : encodeAddress(decodeAddress(address));
    const result = accounts.find((account) => account.address === originAddress);

    return result || null;
  } catch (e) {
    console.error('Fail to detect adddress', e);

    return null;
  }
};

export const getSignMode = (account: AccountJson | null | undefined): SIGN_MODE => {
  if (!account) {
    return SIGN_MODE.UNKNOWN;
  } else {
    if (account.address === ALL_ACCOUNT_KEY) {
      return SIGN_MODE.ALL_ACCOUNT;
    } else {
      if (account.isExternal) {
        if (account.isHardware) {
          return SIGN_MODE.LEDGER;
        } else if (account.isReadOnly) {
          return SIGN_MODE.READ_ONLY;
        } else {
          return SIGN_MODE.QR;
        }
      } else {
        return SIGN_MODE.PASSWORD;
      }
    }
  }
};

export const accountCanSign = (signMode: SIGN_MODE): boolean => {
  return MODE_CAN_SIGN.includes(signMode);
};
