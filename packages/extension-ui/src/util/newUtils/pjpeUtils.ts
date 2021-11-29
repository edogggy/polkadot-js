/* eslint-disable camelcase */

// [object Object]
// SPDX-License-Identifier: Apache-2.0

// eslint-disable-next-line header/header
import { AccountWithChildren } from '@polkadot/extension-base/background/types';
import { Chain } from '@polkadot/extension-chains/types';
import { decodeAddress, encodeAddress } from '@polkadot/util-crypto';

import { AccountsBalanceType, savedMetaData, TransactionDetail } from './pjpeTypes';

// eslint-disable-next-line header/header
export const FLOATING_POINT_DIGIT = 5;
export const DEFAULT_TOKEN_DECIMALS = 12;
export const MIN_EXTRA_BOND = 0.01;
export const DEFAULT_COIN = 'WND';
export const DEFAULT_CHAIN_NAME = 'Westend';
export const DEFAULT_VALIDATOR_COMMISION_FILTER = 20;

export function fixFloatingPoint(_number: number | string): string {
  const sNumber = String(_number);
  const dotIndex = sNumber.indexOf('.');

  if (dotIndex < 0) return sNumber;

  return sNumber.slice(0, dotIndex) + sNumber.slice(dotIndex, dotIndex + FLOATING_POINT_DIGIT + 1);
}

export function balanceToHuman(_balance: AccountsBalanceType | null, _type: string): string {
  if (!_balance || !_balance.balanceInfo) return '';

  const balance = _balance.balanceInfo;
  const x = 10 ** balance.decimals;

  switch (_type) {
    case 'total':
      return fixFloatingPoint(Number(balance.total) / x);
    case 'available':
      return fixFloatingPoint(Number(balance.available) / x);
    default:
      console.log('_type is unknown in balanceToHuman!');

      return '';
  }
}

export function amountToHuman(_amount: string | undefined, _decimals: number): string {
  if (!_amount) return '';

  _amount = String(_amount).replaceAll(',', '');

  const x = 10 ** _decimals;

  return fixFloatingPoint(Number(_amount) / x);
}

export function amountToMachine(_amount: string | undefined, _decimals: number): bigint {
  if (!_amount) return BigInt(0);

  const dotIndex = _amount.indexOf('.');

  if (dotIndex > 0) {
    const decimalsOfAmount = _amount.length - dotIndex - 1;

    _amount = _amount.slice(0, dotIndex) + _amount.slice(dotIndex + 1, _amount.length);
    _decimals -= decimalsOfAmount;
    if (_decimals < 0) throw new Error("_decimals should be more than _amount's decimals digits");
  }

  const x = 10 ** _decimals;

  return BigInt(_amount) * BigInt(x);
}

export function getFormattedAddress(_address: string | null | undefined, _chain: Chain | null | undefined, settingsPrefix: number): string {
  const publicKey = decodeAddress(_address);
  const prefix = _chain ? _chain.ss58Format : (settingsPrefix === -1 ? 42 : settingsPrefix);

  return encodeAddress(publicKey, prefix);
}

export function handleAccountBalance(balance: any): { available: bigint, feeFrozen: bigint, miscFrozen: bigint, reserved: bigint, total: bigint } {
  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    available: BigInt(String(balance.free)) - BigInt(String(balance.miscFrozen)),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    feeFrozen: BigInt(String(balance.feeFrozen)),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    miscFrozen: BigInt(String(balance.miscFrozen)),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    reserved: BigInt(String(balance.reserved)),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    total: BigInt(String(balance.free)) + BigInt(String(balance.reserved))
  };
}

export function getSubstrateAddress(address: string): string {
  const publicKey = decodeAddress(address);

  return encodeAddress(publicKey, 42);
}

export function prepareMetaData(chain: Chain, label: string, data: any): string {
  const chainName = chain.name.replace(' Relay Chain', '');

  return JSON.stringify({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    [label]: JSON.stringify({ chainName: chainName, metaData: data })
  });
}

export function getTransactionHistoryFromLocalStorage(
  chain: Chain,
  hierarchy: AccountWithChildren[],
  accountSubstrateAddress: string): TransactionDetail[] {
  const account = hierarchy.find((h) => h.address === accountSubstrateAddress);

  if (!account) {
    console.log('something went wrong while looking for the account in accounts!!');

    return [];
  }

  const chainName = chain?.name.replace(' Relay Chain', '');

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const transactionHistoryFromLocalStorage: savedMetaData = account?.history ? JSON.parse(String(account.history)) : null;

  if (transactionHistoryFromLocalStorage) {
    if (transactionHistoryFromLocalStorage.chainName === chainName) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return transactionHistoryFromLocalStorage.metaData;
    }
  }

  return [];
}

// export async function saveHistory(chain: Chain, hierarchy: AccountWithChildren[], address: string, currentTransactionDetail: TransactionDetail): Promise<boolean> {
//   const accountSubstrateAddress = getSubstrateAddress(address);
//   const savedHistory: TransactionDetail[] = getTransactionHistoryFromLocalStorage(chain, hierarchy, accountSubstrateAddress);

//   savedHistory.push(currentTransactionDetail);

//   return updateMeta(accountSubstrateAddress, prepareMetaData(chain, 'history', savedHistory));
// }
