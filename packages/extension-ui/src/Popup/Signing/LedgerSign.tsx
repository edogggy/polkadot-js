// Copyright 2019-2024 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';

import { faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react';

import { Button, Warning } from '../../components/index.js';
import { useLedger, useMetadata, useTranslation } from '../../hooks/index.js';
import { styled } from '../../styled.js';
import { merkleizeMetadata } from '@polkadot-api/merkleize-metadata';
import type { Chain } from '@polkadot/extension-chains/types';
import { objectSpread, u8aToHex } from '@polkadot/util';
import type { SignerPayloadJSON } from '@polkadot/types/types';

interface Props {
  accountIndex?: number;
  addressOffset?: number;
  className?: string;
  error: string | null;
  genesisHash?: string;
  onSignature?: ({ signature }: { signature: HexString }) => void;
  // onSignature?: ({  signature }: {signature: HexString }) => void;
  payload?: SignerPayloadJSON;
  setError: (value: string | null) => void;
}

function getMetadataProof(chain: Chain, payload: SignerPayloadJSON) {
  const m = chain.definition.rawMetadata || '0x00';
  console.log('m', m);
  const merkleizedMetadata = merkleizeMetadata(m, {
    base58Prefix: chain.ss58Format,
    decimals: chain.tokenDecimals,
    specName: chain.name,
    specVersion: chain.specVersion,
    tokenSymbol: chain.tokenSymbol
  });
  const metadataHash = u8aToHex(merkleizedMetadata.digest());
  const newPayload = objectSpread<SignerPayloadJSON>({}, payload, { metadataHash, mode: 1 });
  const raw = chain.registry.createType('ExtrinsicPayload', newPayload);

  return {
    newPayload,
    raw,
    txMetadata: merkleizedMetadata.getProofForExtrinsicPayload(u8aToHex(raw.toU8a(true)))
  };

}

function LedgerSign({ accountIndex, addressOffset, className, error, genesisHash, onSignature, payload, setError }: Props): React.ReactElement<Props> {
  const [isBusy, setIsBusy] = useState(false);
  const { t } = useTranslation();
  const { error: ledgerError, isLoading: ledgerLoading, isLocked: ledgerLocked, ledger, refresh, warning: ledgerWarning } = useLedger(genesisHash, accountIndex, addressOffset);
  const chain = useMetadata(genesisHash);


  useEffect(() => {
    if (ledgerError) {
      setError(ledgerError);
    }
  }, [ledgerError, setError]);

  const _onRefresh = useCallback(() => {
    refresh();
    setError(null);
  }, [refresh, setError]);

  const _onSignLedger = useCallback(
    (): void => {
      console.log('signign with ledgetr')
      console.log('chain: ', chain)
      if (!ledger || !payload || !onSignature || !chain) {
        console.log('erroor')
        return;
      }

      const { newPayload, raw, txMetadata } = getMetadataProof(chain, payload);

      console.log(newPayload)

      const metaBuff = Buffer.from(txMetadata);

      setError(null);
      setIsBusy(true);
      ledger.signWithMetadata(raw.toU8a(true), accountIndex, addressOffset, { metadata: metaBuff })
        .then((signature) => {
          const extrinsic = chain.registry.createType(
            'Extrinsic',
            { method: raw.method },
            { version: 4 }
          );

          ledger.getAddress(chain.ss58Format, false, accountIndex, addressOffset)
            .then(({ address }) => { 
              extrinsic.addSignature(address, signature.signature, raw.toHex()) 
            })

          onSignature(signature);
        }).catch((e: Error) => {
          setError(e.message);
          setIsBusy(false);
        });
    },
    [accountIndex, addressOffset, chain, ledger, onSignature, payload, setError]
  );

  return (
    <div className={className}>
      {!!ledgerWarning && (
        <Warning>
          {ledgerWarning}
        </Warning>
      )}
      {error && (
        <Warning isDanger>
          {error}
        </Warning>
      )}
      {(ledgerLocked || error)
        ? (
          <Button
            isBusy={isBusy || ledgerLoading}
            onClick={_onRefresh}
          >
            <FontAwesomeIcon icon={faSync} />
            {t('Refresh')}
          </Button>
        )
        : (
          <Button
            isBusy={isBusy || ledgerLoading}
            onClick={_onSignLedger}
          >
            {t('Sign on Ledger')}
          </Button>
        )
      }
    </div>
  );
}

export default styled(LedgerSign) <Props>`
  flex-direction: column;
  padding: 6px 24px;

  .danger {
    margin-bottom: .5rem;
  }
`;
