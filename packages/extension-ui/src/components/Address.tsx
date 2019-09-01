// Copyright 2019 @polkadot/extension-ui authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { KeyringJson } from '@polkadot/ui-keyring/types';
import { Prefix } from '@polkadot/util-crypto/address/types';

import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import findChain from '@polkadot/extension/chains';
import Identicon from '@polkadot/react-identicon';
import settings from '@polkadot/ui-settings';

import IconBox from './IconBox';
import { AccountContext } from './contexts';
import { decodeAddress, encodeAddress } from '@polkadot/util-crypto';

interface Props {
  address?: string | null;
  children?: React.ReactNode;
  className?: string;
  name?: React.ReactNode | null;
  genesisHash?: string;
  theme?: 'polkadot' | 'substrate';
}

function Address ({ address, children, className, genesisHash, name, theme = 'polkadot' }: Props): React.ReactElement<Props> {
  const accounts = useContext(AccountContext);
  const [account, setAccount] = useState<KeyringJson | null>(null);
  const [formatted, setFormatted] = useState<string | null>(null);

  useEffect((): void => {
    if (!address) {
      return;
    }

    const addrU8a = decodeAddress(address);
    const addrU8aStr = addrU8a.toString();
    const account = accounts.find((account): boolean =>
      decodeAddress(account.address).toString() === addrU8aStr
    ) || null;
    const chain = findChain((account && account.meta.genesisHash) || genesisHash || '') || {
      prefix: (settings.prefix === -1 ? 42 : settings.prefix)
    };

    setFormatted(encodeAddress(addrU8a, chain.prefix as Prefix));
    setAccount(account);
  }, [address]);

  return (
    <IconBox
      className={className}
      icon={
        <Identicon
          className='icon'
          size={64}
          theme={theme}
          value={address}
        />
      }
      intro={
        <>
          <div className='name'>{name || (account && account.meta.name) || '<unknown>'}</div>
          <div className='address'>{formatted || '<unknown>'}</div>
        </>
      }
    >
      {children}
    </IconBox>
  );
}

export default styled(Address)`
  .address {
    opacity: 0.5;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .name {
    padding-bottom: 0.5rem;
  }
`;
