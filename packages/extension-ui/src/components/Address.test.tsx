// Copyright 2019-2020 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import '../../../../__mocks__/chrome';

import type { ReactWrapper } from 'enzyme';
import type { AccountJson } from '@polkadot/extension-base/background/types';
import type { IconTheme } from '@polkadot/react-identicon/types';
import type { Props as AddressComponentProps } from './Address';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';

import * as messaging from '../messaging';
import { flushAllPromises } from '../testHelpers';
import { buildHierarchy } from '../util/buildHierarchy';
import { DEFAULT_TYPE } from '../util/defaultType';
import { AccountContext, Address } from '.';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
configure({ adapter: new Adapter() });

interface AccountTestJson extends AccountJson {
  expectedIconTheme: IconTheme
}

interface AccountTestGenesisJson extends AccountTestJson {
  expectedEncodedAddress: string;
  expectedNetworkLabel: string;
  genesisHash: string;
}

const accounts = [
  { address: '5HSDXAC3qEMkSzZK377sTD1zJhjaPiX5tNWppHx2RQMYkjaJ', expectedIconTheme: 'polkadot', name: 'ECDSA Account', type: 'ecdsa' },
  { address: '5FjgD3Ns2UpnHJPVeRViMhCttuemaRXEqaD8V5z4vxcsUByA', expectedIconTheme: 'polkadot', name: 'Ed Account', type: 'ed25519' },
  { address: '5Ggap6soAPaP5UeNaiJsgqQwdVhhNnm6ez7Ba1w9jJ62LM2Q', expectedIconTheme: 'polkadot', name: 'Parent Sr Account', type: 'sr25519' },
  { address: '0xd5D81CD4236a43F48A983fc5B895975c511f634D', expectedIconTheme: 'ethereum', name: 'Ethereum', type: 'ethereum' },
  { address: '5D2TPhGEy2FhznvzaNYW9AkuMBbg3cyRemnPsBvBY4ZhkZXA', expectedIconTheme: 'polkadot', name: 'Child Account', parentAddress: '5Ggap6soAPaP5UeNaiJsgqQwdVhhNnm6ez7Ba1w9jJ62LM2Q', type: 'sr25519' },
  { address: '5EeaoDj4VDk8V6yQngKBaCD5MpJUCHrhYjVhBjgMHXoYon1s', expectedIconTheme: 'polkadot', isExternal: true, name: 'External Account', type: 'sr25519' }
] as AccountTestJson[];

const accountsWithGenesisHash = [
  // with Polkadot genesis Hash
  {
    address: '5Ggap6soAPaP5UeNaiJsgqQwdVhhNnm6ez7Ba1w9jJ62LM2Q',
    expectedEncodedAddress: '15csxS8s2AqrX1etYMMspzF6V7hM56KEjUqfjJvWHP7YWkoF',
    expectedIconTheme: 'polkadot',
    expectedNetworkLabel: 'Polkadot',
    genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
    type: 'sr25519'
  },
  // with Kusama genesis Hash
  {
    address: '5DoYawpxt6aBy1pKAt1beLMrakqtbWMtG3NF6jwRR8uKJGqD',
    expectedEncodedAddress: 'EKAFGAqWTb7ifdkwapeYHirjM88QBB4iRCzVQDNtw7p3bgF',
    expectedIconTheme: 'polkadot',
    expectedNetworkLabel: 'Kusama',
    genesisHash: '0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe',
    type: 'sr25519'
  },
  // with Edgeware genesis Hash
  {
    address: '5GYQRJj3NUznYDzCduENRcocMsyxmb6tjb5xW87ZMErBe9R7',
    expectedEncodedAddress: 'mzKNamvvJPM5ApxwGSYD5VjjtyfrB4g8fhMyCc29K37nuop',
    expectedIconTheme: 'substrate',
    expectedNetworkLabel: 'Edgeware',
    genesisHash: '0x742a2ca70c2fda6cee4f8df98d64c4c670a052d9568058982dad9d5a7a135c5b',
    type: 'sr25519'
  }
]as AccountTestGenesisJson[];

const mountComponent = async (addressComponentProps: AddressComponentProps, contextAccounts: AccountJson[]): Promise<{
  wrapper: ReactWrapper;
}> => {
  const actionStub = jest.fn();
  const { actions = actionStub } = addressComponentProps;

  const wrapper = mount(
    <AccountContext.Provider value={{
      accounts: contextAccounts,
      hierarchy: buildHierarchy(contextAccounts)
    }}>
      <Address
        actions={actions}
        {...addressComponentProps}
      />
    </AccountContext.Provider>
  );

  await act(flushAllPromises);
  wrapper.update();

  return { wrapper };
};

const getWrapper = async (account: AccountJson, contextAccounts : AccountJson[], withAccountsInContext: boolean) => {
  // the address component can query info about the account from the account context
  // in this case, the account's address (any encoding) should suffice
  // In case the account is not in the context, then more info are needed as props
  // to display accurately
  const mountedComponent = withAccountsInContext
  // only the address is passed as props, the full acount info are loaded in the context
    ? await mountComponent({ address: account.address }, contextAccounts)
  // the context is empty, all account's info are passed as props to the Address component
    : await mountComponent(account, []);

  return mountedComponent.wrapper;
};

const genericTestSuite = (account: AccountTestJson, withAccountsInContext = true) => {
  let wrapper: ReactWrapper;
  const { address, expectedIconTheme, name = '', type = DEFAULT_TYPE } = account;

  describe(`Account ${withAccountsInContext ? 'in context from address' : 'from props'} (${name}) - ${type}`, () => {
    beforeEach(async () => {
      wrapper = await getWrapper(account, accounts, withAccountsInContext);
    });

    it('shows the account address and name', () => {
      expect(wrapper.find('[data-field="address"]').text()).toEqual(address);
      expect(wrapper.find('Name span').text()).toEqual(name);
    });

    it(`shows a ${expectedIconTheme} identicon`, () => {
      expect(wrapper.find('Identicon').first().prop('iconTheme')).toEqual(expectedIconTheme);
    });

    it('can copy its address', () => {
      // the first CopyToClipboard is from the identicon, the second from the copy button
      expect(wrapper.find('CopyToClipboard').at(0).prop('text')).toEqual(address);
      expect(wrapper.find('CopyToClipboard').at(1).prop('text')).toEqual(address);
    });

    it('has the account visiblity icon', () => {
      expect(wrapper.find('FontAwesomeIcon.visibleIcon')).toHaveLength(1);
    });

    it('can hide the account', () => {
      jest.spyOn(messaging, 'showAccount').mockResolvedValue(false);

      const visibleIcon = wrapper.find('FontAwesomeIcon.visibleIcon');
      const hiddenIcon = wrapper.find('FontAwesomeIcon.hiddenIcon');

      expect(visibleIcon.exists()).toBe(true);
      expect(hiddenIcon.exists()).toBe(false);

      visibleIcon.simulate('click');
      expect(messaging.showAccount).toBeCalledWith(address, false);
    });

    it('can show the account if hidden', async () => {
      const additionalProps = { isHidden: true };

      const mountedHiddenComponent = withAccountsInContext
        ? await mountComponent({ address, ...additionalProps }, accounts)
        : await mountComponent({ ...account, ...additionalProps }, []);

      const wrapperHidden = mountedHiddenComponent.wrapper;

      jest.spyOn(messaging, 'showAccount').mockResolvedValue(true);

      const visibleIcon = wrapperHidden.find('FontAwesomeIcon.visibleIcon');
      const hiddenIcon = wrapperHidden.find('FontAwesomeIcon.hiddenIcon');

      expect(visibleIcon.exists()).toBe(false);
      expect(hiddenIcon.exists()).toBe(true);

      hiddenIcon.simulate('click');
      expect(messaging.showAccount).toBeCalledWith(address, true);
    });

    it('has settings button', () => {
      expect(wrapper.find('.settings')).toHaveLength(1);
    });

    it('has no account hidding and settings button if no action is provided', async () => {
      const additionalProps = { actions: null };

      const mountedComponentWithoutAction = withAccountsInContext
        ? await mountComponent({ address, ...additionalProps }, accounts)
        : await mountComponent({ ...account, ...additionalProps }, []);

      wrapper = mountedComponentWithoutAction.wrapper;

      expect(wrapper.find('.settings')).toHaveLength(0);
    });
  });
};

const genesisHashTestSuite = (account: AccountTestGenesisJson, withAccountsInContext = true) => {
  const { expectedEncodedAddress, expectedIconTheme, expectedNetworkLabel } = account;

  describe(`Account ${withAccountsInContext ? 'in context from address' : 'from props'} with ${expectedNetworkLabel} genesiHash`, () => {
    let wrapper: ReactWrapper;

    beforeEach(async () => {
      wrapper = await getWrapper(account, accountsWithGenesisHash, withAccountsInContext);
    });

    it('shows the account address correctly encoded', () => {
      expect(wrapper.find('[data-field="address"]').text()).toEqual(expectedEncodedAddress);
    });

    it(`shows a ${expectedIconTheme} identicon`, () => {
      expect(wrapper.find('Identicon').first().prop('iconTheme')).toEqual(expectedIconTheme);
    });

    it('Copy buttons contain the encoded address', () => {
      // the first CopyToClipboard is from the identicon, the second from the copy button
      expect(wrapper.find('CopyToClipboard').at(0).prop('text')).toEqual(expectedEncodedAddress);
      expect(wrapper.find('CopyToClipboard').at(1).prop('text')).toEqual(expectedEncodedAddress);
    });

    it('Network label shows the correct network', () => {
      expect(wrapper.find('[data-field="chain"]').text()).toEqual(expectedNetworkLabel);
    });
  });
};

describe('Address', () => {
  accounts.forEach((account) => {
    genericTestSuite(account);
    genericTestSuite(account, false);
  });

  accountsWithGenesisHash.forEach((account) => {
    genesisHashTestSuite(account);
    genesisHashTestSuite(account, false);
  });

  describe('External account', () => {
    let wrapper: ReactWrapper;

    beforeAll(async () => {
      wrapper = await getWrapper(accounts[5], [], false);
    });

    it('has an icon in front of its name', () => {
      expect(wrapper.find('Name').find('FontAwesomeIcon [data-icon="external-link-square-alt"]').exists()).toBe(true);
    });
  });
});
