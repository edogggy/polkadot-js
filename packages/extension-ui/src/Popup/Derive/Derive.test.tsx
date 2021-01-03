// Copyright 2019-2021 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import '../../../../../__mocks__/chrome';

import type { AccountJson, ResponseDeriveValidate } from '@polkadot/extension-base/background/types';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route } from 'react-router';
import { ThemeProvider } from 'styled-components';

import { AccountContext, ActionContext, themes } from '../../components';
import * as messaging from '../../messaging';
import { flushAllPromises } from '../../testHelpers';
import { buildHierarchy } from '../../util/buildHierarchy';
import AddressDropdown from './AddressDropdown';
import Derive from '.';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
configure({ adapter: new Adapter() });

const accounts = [
  { address: '5FjgD3Ns2UpnHJPVeRViMhCttuemaRXEqaD8V5z4vxcsUByA', name: 'A', type: 'sr25519' },
  { address: '5GYmFzQCuC5u3tQNiMZNbFGakrz3Jq31NmMg4D2QAkSoQ2g5', name: 'B', type: 'sr25519' },
  { address: '5D2TPhGEy2FhznvzaNYW9AkuMBbg3cyRemnPsBvBY4ZhkZXA', name: 'BB', parentAddress: '5GYmFzQCuC5u3tQNiMZNbFGakrz3Jq31NmMg4D2QAkSoQ2g5', type: 'sr25519' },
  { address: '5GhGENSJBWQZ8d8mARKgqEkiAxiW3hHeznQDW2iG4XzNieb6', isExternal: true, name: 'C', type: 'sr25519' },
  { address: '0xd5D81CD4236a43F48A983fc5B895975c511f634D', name: 'Ethereum', type: 'ethereum' },
  { address: '5EeaoDj4VDk8V6yQngKBaCD5MpJUCHrhYjVhBjgMHXoYon1s', isExternal: false, name: 'D', type: 'sr25519' },
  { address: '5HRKYp5anSNGtqC7cq9ftiaq4y8Mk7uHk7keaXUrQwZqDWLJ', name: 'DD', parentAddress: '5EeaoDj4VDk8V6yQngKBaCD5MpJUCHrhYjVhBjgMHXoYon1s', type: 'sr25519' }
] as AccountJson[];

describe('Derive', () => {
  const mountComponent = async (locked = false): Promise<{
    wrapper: ReactWrapper;
    onActionStub: jest.Mock;
  }> => {
    const onActionStub = jest.fn();

    const wrapper = mount(
      <MemoryRouter initialEntries={ [`/account/derive/${accounts[1].address}`] }>
        <ActionContext.Provider value={onActionStub}>
          <AccountContext.Provider value={{
            accounts: accounts,
            hierarchy: buildHierarchy(accounts)
          }}>
            <ThemeProvider theme={themes.dark}>
              <Route path='/account/derive/:address'>
                <Derive isLocked={locked}/>
              </Route>
            </ThemeProvider>
          </AccountContext.Provider>
        </ActionContext.Provider>
      </MemoryRouter>
    );

    await act(flushAllPromises);

    return { onActionStub, wrapper };
  };

  let wrapper: ReactWrapper;
  let onActionStub: jest.Mock;

  const type = async (input: ReactWrapper, value: string): Promise<void> => {
    input.simulate('change', { target: { value } });
    await act(flushAllPromises);
    input.update();
  };

  describe('Parent selection screen', () => {
    beforeEach(async () => {
      const mountedComponent = await mountComponent();

      wrapper = mountedComponent.wrapper;
      onActionStub = mountedComponent.onActionStub;
    });

    // eslint-disable-next-line @typescript-eslint/require-await
    jest.spyOn(messaging, 'validateAccount').mockImplementation(async (_, pass: string) => pass === 'pass');
    // eslint-disable-next-line @typescript-eslint/require-await
    jest.spyOn(messaging, 'validateDerivationPath').mockImplementation(async (_, path) => {
      if (path === '//') {
        throw new Error('wrong suri');
      }

      return {} as ResponseDeriveValidate;
    });

    it('Button is disabled and password field visible', () => {
      const button = wrapper.find('[data-button-action="create derived account"] button');

      expect(button.exists()).toBe(true);
      expect(button.prop('disabled')).toBe(true);
    });

    it('Password field is visible and not in error state', () => {
      const passwordField = wrapper.find('[data-input-password]').first();

      expect(passwordField.exists()).toBe(true);
      expect(passwordField.prop('isError')).toBe(false);
    });

    it('No error is visible when first loading the page', () => {
      expect(wrapper.find('Warning')).toHaveLength(0);
    });

    it('An error is visible, input higlighted and the button disabled when password is incorrect', async () => {
      await type(wrapper.find('input[type="password"]'), 'wrong_pass');
      wrapper.find('[data-button-action="create derived account"] button').simulate('click');
      await act(flushAllPromises);
      wrapper.update();

      const button = wrapper.find('[data-button-action="create derived account"] button');

      expect(button.prop('disabled')).toBe(true);
      expect(wrapper.find('[data-input-password]').first().prop('isError')).toBe(true);
      expect(wrapper.find('.warning-message')).toHaveLength(1);
      expect(wrapper.find('.warning-message').first().text()).toEqual('Wrong password');
    });

    it('The error disappears when typing a new password and "Create derived account" is enabled', async () => {
      await type(wrapper.find('input[type="password"]'), 'wrong_pass');
      wrapper.find('[data-button-action="create derived account"] button').simulate('click');
      await act(flushAllPromises);
      wrapper.update();

      await type(wrapper.find('input[type="password"]'), 'new_attempt');

      const button = wrapper.find('[data-button-action="create derived account"] button');

      expect(button.prop('disabled')).toBe(false);
      expect(wrapper.find('[data-input-password]').first().prop('isError')).toBe(false);
      expect(wrapper.find('.warning-message')).toHaveLength(0);
    });

    it('Button is enabled when password is set', async () => {
      await type(wrapper.find('input[type="password"]'), 'pass');

      const button = wrapper.find('[data-button-action="create derived account"] button');

      expect(button.prop('disabled')).toBe(false);
      expect(wrapper.find('.warning-message')).toHaveLength(0);
    });

    it('An error is visible and the button is disabled when suri is incorrect', async () => {
      await type(wrapper.find('input[type="password"]'), 'pass');
      await type(wrapper.find('[data-input-suri] input'), '//');
      wrapper.find('[data-button-action="create derived account"] button').simulate('click');
      await act(flushAllPromises);
      wrapper.update();

      const button = wrapper.find('[data-button-action="create derived account"] button');

      expect(button.prop('disabled')).toBe(true);
      expect(wrapper.find('.warning-message')).toHaveLength(1);
      expect(wrapper.find('.warning-message').first().text()).toEqual('Incorrect derivation path');
    });

    it('The error disappears and "Create derived account" is enabled when typing a new suri', async () => {
      await type(wrapper.find('input[type="password"]'), 'pass');
      await type(wrapper.find('[data-input-suri] input'), '//');
      wrapper.find('[data-button-action="create derived account"] button').simulate('click');
      await act(flushAllPromises);
      wrapper.update();
      await type(wrapper.find('[data-input-suri] input'), 'new');

      const button = wrapper.find('[data-button-action="create derived account"] button');

      expect(button.prop('disabled')).toBe(false);
      expect(wrapper.find('Warning')).toHaveLength(0);
    });

    it('takes selected address from URL as parent account', () => {
      expect(wrapper.find('[data-field="name"]').first().text()).toBe('B');
    });

    it('selects internal root accounts as other options, no external and no Ethereum account', () => {
      const options = wrapper.find('[data-parent-option] [data-field="name"]').map((el) => el.text());

      expect(options).toEqual(['A', 'B', 'D']);
    });

    it('redirects to derive from next account when other option is selected', () => {
      wrapper.find('[data-parent-option]').first().simulate('click');

      expect(onActionStub).toBeCalledWith(`/account/derive/${accounts[0].address}`);
    });
  });

  describe('Locked parent selection', () => {
    beforeAll(async () => {
      wrapper = (await mountComponent(true)).wrapper;
    });

    it('address dropdown does not exist', () => {
      expect(wrapper.exists(AddressDropdown)).toBe(false);
    });

    it('parent is taken from URL', () => {
      expect(wrapper.find('[data-field="name"]').first().text()).toBe('B');
    });
  });
});
