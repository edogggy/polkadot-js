// Copyright 2019 @polkadot/extension-ui authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from 'react';
import styled from 'styled-components';
import Identicon from '@polkadot/ui-identicon';

import Box from './Box';
import { AccountContext } from './contexts';
import defaults from './defaults';

type Props = {
  address?: string | null,
  children?: React.ReactNode;
  className?: string,
  isHidden?: boolean,
  name?: React.ReactNode | null,
  theme?: 'polkadot' | 'substrate'
};

function Address ({ address, children, className, isHidden, name, theme = 'polkadot' }: Props) {
  if (isHidden) {
    return null;
  }

  return (
    <AccountContext.Consumer>
      {(accounts) => {
        const account = accounts.find((account) => account.address === address);

        return (
          <div className={className}>
            <Box className='details'>
              <div className='name'>{name || (account && account.meta.name) || '<unknown>'}</div>
              <div className='address'>{address || '<unknown>'}</div>
              <div className='children'>{children}</div>
            </Box>
            <Identicon
              className='icon'
              size={64}
              theme={theme}
              value={address}
            />
          </div>
        );
      }}
    </AccountContext.Consumer>
  );
}

export default styled(Address)`
  position: relative;
  box-sizing: border-box;
  margin: ${defaults.boxMargin};
  padding: ${defaults.boxPadding};
  padding-left: 1.5rem;
  padding-top: 0.75rem;

  .details {
    margin: 0;
    padding-left: 4rem;

    .address {
      opacity: 0.5;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .name {
      padding: 0 0 0.5rem 0;

      input {
        margin: -0.5rem 0;
      }
    }
  }

  .icon {
    left: 0.25rem;
    position: absolute;
    top: 0;
    z-index: 1;
  }
`;
