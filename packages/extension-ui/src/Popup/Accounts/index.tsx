// Copyright 2019 @polkadot/extension-ui authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from 'react';

import { Button, Header, Tip } from '../../components';
import { AccountContext } from '../../components/contexts';
import Account from './Account';

type Props = {};

export default function Accounts (props: Props) {
  return (
    <AccountContext.Consumer>
      {(accounts) => (
        <div>
          <Header label='accounts' />
          {
            (accounts.length === 0)
              ? <Tip header='add accounts' type='warn'>You currently don't have any accounts. Either create a new account or if you have an existing account you wish to use, import it with the seed phrase</Tip>
              : accounts.map(({ address }) => (
                <Account
                  address={address}
                  key={address}
                />
              ))
          }
          <Button
            label='I want to create a new account with a new seed'
            to='/account/create'
          />
          <Button
            label='I have a pre-existing seed, import the account'
            to='/account/import'
          />
        </div>
      )}
    </AccountContext.Consumer>
  );
}
