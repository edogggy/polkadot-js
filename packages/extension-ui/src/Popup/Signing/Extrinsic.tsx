// Copyright 2019-2021 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Chain } from '@polkadot/extension-chains/types';
import type { Call, ExtrinsicEra, ExtrinsicPayload } from '@polkadot/types/interfaces';
import type { AnyJson, SignerPayloadJSON } from '@polkadot/types/types';

import BN from 'bn.js';
import { TFunction } from 'i18next';
import React, { useMemo, useRef } from 'react';

import { bnToBn, formatNumber } from '@polkadot/util';

import { Address, Table } from '../../components';
import useMetadata from '../../hooks/useMetadata';
import useTranslation from '../../hooks/useTranslation';

interface Decoded {
  args: AnyJson | null;
  method: Call | null;
}

interface Props {
  className?: string;
  payload: ExtrinsicPayload;
  request: SignerPayloadJSON;
  url: string;
}

const ADDRESS_TYPE = ['AccountId', 'AuthorityId', 'LookupSource'] as const;

type AddressType = typeof ADDRESS_TYPE[number];

function displayDecodeVersion (message: string, chain: Chain, specVersion: BN): string {
  return `${message}: chain=${chain.name}, specVersion=${chain.specVersion.toString()} (request specVersion=${specVersion.toString()})`;
}

function decodeMethod (data: string, chain: Chain, specVersion: BN): Decoded {
  let args: AnyJson | null = null;
  let method: Call | null = null;

  try {
    if (specVersion.eqn(chain.specVersion)) {
      method = chain.registry.createType('Call', data);
      args = (method.toHuman() as { args: AnyJson }).args;
    } else {
      console.log(displayDecodeVersion('Outdated metadata to decode', chain, specVersion));
    }
  } catch (error) {
    console.error(`${displayDecodeVersion('Error decoding method', chain, specVersion)}:: ${(error as Error).message}`);

    args = null;
    method = null;
  }

  return { args, method };
}

function showAddress (type: AddressType, data: unknown, chain: Chain): React.ReactElement {
  const arg = chain.registry.createType(type, data);

  console.log('arg as string', arg.toString());

  return <Address
    address={arg.toString()}
    isSmall={true}
  />;
}

function Method ({ chain, data, decoded: { args, method }, t }: { chain: Chain | null, data: string, decoded: Decoded, t: TFunction }): React.ReactElement {
  if (!args || !method) {
    return (
      <tr>
        <td className='label'>{t<string>('method data')}</td>
        <td className='data'>{data}</td>
      </tr>
    );
  }

  return (
    <>
      <tr>
        <td className='label'>{t<string>('method')}</td>
        <td className='data'>{method.section}.{method.method}</td>
      </tr>
      {method.meta && (
        <>
          {/* {console.log(JSON.stringify(args, null, 2))} */}
          {method.meta.args.map((arg, index) => (
            <tr key={index}>
              <td className='label'>{arg.name}</td>
              <td className='data'>
                {
                  chain && ADDRESS_TYPE.includes(arg.type.toHuman() as AddressType)
                    ? showAddress(arg.type.toHuman() as AddressType, args[index], chain)
                    : <pre>{JSON.stringify(args[index], null, 2)}</pre>
                }
              </td>
              {/* {console.log('arg', arg.toHuman(), arg.type.toHuman())} */}
            </tr>
          ))}
          <tr>
            <td className='label'>{t<string>('info')}</td>
            <td className='data'>
              <details>
                <summary>{method.meta.documentation.map((d) => d.toString().trim()).join(' ')}</summary>
              </details>
            </td>
          </tr>
        </>
      )}
    </>
  );
}

function mortalityAsString (era: ExtrinsicEra, hexBlockNumber: string, t: TFunction): string {
  if (era.isImmortalEra) {
    return t<string>('immortal');
  }

  const blockNumber = bnToBn(hexBlockNumber);
  const mortal = era.asMortalEra;

  return t<string>('mortal, valid from {{birth}} to {{death}}', {
    replace: {
      birth: formatNumber(mortal.birth(blockNumber)),
      death: formatNumber(mortal.death(blockNumber))
    }
  });
}

function Extrinsic ({ className, payload: { era, nonce, tip }, request: { blockNumber, genesisHash, method, specVersion: hexSpec }, url }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const chain = useMetadata(genesisHash);
  const specVersion = useRef(bnToBn(hexSpec)).current;
  const decoded = useMemo(
    () => chain && chain.hasMetadata
      ? decodeMethod(method, chain, specVersion)
      : { args: null, method: null },
    [method, chain, specVersion]
  );

  return (
    <Table
      className={className}
      isFull
    >
      <Method
        chain={chain}
        data={method}
        decoded={decoded}
        t={t}
      />
      <tr>
        <td className='label'>{t<string>('from')}</td>
        <td className='data'>{url}</td>
      </tr>
      <tr>
        <td className='label'>{chain ? t<string>('chain') : t<string>('genesis')}</td>
        <td className='data'>{chain ? chain.name : genesisHash}</td>
      </tr>
      <tr>
        <td className='label'>{t<string>('version')}</td>
        <td className='data'>{specVersion.toNumber()}</td>
      </tr>
      <tr>
        <td className='label'>{t<string>('nonce')}</td>
        <td className='data'>{formatNumber(nonce)}</td>
      </tr>
      {!tip.isEmpty && (
        <tr>
          <td className='label'>{t<string>('tip')}</td>
          <td className='data'>{formatNumber(tip)}</td>
        </tr>
      )}
      <tr>
        <td className='label'>{t<string>('lifetime')}</td>
        <td className='data'>{mortalityAsString(era, blockNumber, t)}</td>
      </tr>
    </Table>
  );
}

export default React.memo(Extrinsic);
