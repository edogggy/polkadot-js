// Copyright 2019-2025 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import '@polkadot/extension-mocks/chrome';

import type { ReactWrapper } from 'enzyme';
import type * as _ from '@polkadot/dev-test/globals.d.ts';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import enzyme from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router';

import * as messaging from '../../messaging.js';
import { flushAllPromises } from '../../testHelpers.js';
import Account from './Account.js';

const { configure, mount } = enzyme;

// // NOTE Required for spyOn when using @swc/jest
// // https://github.com/swc-project/swc/issues/3843
// jest.mock('../../messaging', (): Record<string, unknown> => ({
//   __esModule: true,
//   ...jest.requireActual('../../messaging')
// }));

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
configure({ adapter: new Adapter() });

jest.spyOn(messaging, 'getAllMetadata').mockImplementation(() => Promise.resolve([]));

describe('Account component', () => {
  let wrapper: ReactWrapper;
  const VALID_ADDRESS = 'HjoBp62cvsWDA3vtNMWxz6c9q13ReEHi9UGHK7JbZweH5g5';
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const mountAccountComponent = (additionalAccountProperties: Record<string, unknown>): ReactWrapper => mount(
    <MemoryRouter>
      <Account
        {...{ address: VALID_ADDRESS, ...additionalAccountProperties }}
      />
    </MemoryRouter>);

  it('shows Export option if account is not external', async () => {
    wrapper = mountAccountComponent({ isExternal: false, type: 'ed25519' });
    wrapper.find('.settings').first().simulate('click');
    await act(flushAllPromises);

    expect(wrapper.find('a.menuItem').length).toBe(4);
    expect(wrapper.find('a.menuItem').at(0).text()).toBe('Rename');
    expect(wrapper.find('a.menuItem').at(1).text()).toBe('Derive New Account');
    expect(wrapper.find('a.menuItem').at(2).text()).toBe('Export Account');
    expect(wrapper.find('a.menuItem').at(3).text()).toBe('Forget Account');
    expect(wrapper.find('.genesisSelection').exists()).toBe(true);
  });

  it('does not show Export option if account is external', async () => {
    wrapper = mountAccountComponent({ isExternal: true, type: 'ed25519' });
    wrapper.find('.settings').first().simulate('click');
    await act(flushAllPromises);

    expect(wrapper.find('a.menuItem').length).toBe(2);
    expect(wrapper.find('a.menuItem').at(0).text()).toBe('Rename');
    expect(wrapper.find('a.menuItem').at(1).text()).toBe('Forget Account');
    expect(wrapper.find('.genesisSelection').exists()).toBe(true);
  });

  it('shows Derive option if account is of ethereum type', async () => {
    wrapper = mountAccountComponent({ isExternal: false, type: 'ethereum' });
    wrapper.find('.settings').first().simulate('click');
    await act(flushAllPromises);

    expect(wrapper.find('a.menuItem').length).toBe(4);
    expect(wrapper.find('a.menuItem').at(0).text()).toBe('Rename');
    expect(wrapper.find('a.menuItem').at(1).text()).toBe('Derive New Account');
    expect(wrapper.find('a.menuItem').at(2).text()).toBe('Export Account');
    expect(wrapper.find('a.menuItem').at(3).text()).toBe('Forget Account');
    expect(wrapper.find('.genesisSelection').exists()).toBe(true);
  });

  it('does not show genesis hash selection dropsown if account is hardware', async () => {
    wrapper = mountAccountComponent({ isExternal: true, isHardware: true });
    wrapper.find('.settings').first().simulate('click');
    await act(flushAllPromises);

    expect(wrapper.find('a.menuItem').length).toBe(2);
    expect(wrapper.find('a.menuItem').at(0).text()).toBe('Rename');
    expect(wrapper.find('a.menuItem').at(1).text()).toBe('Forget Account');
    expect(wrapper.find('.genesisSelection').exists()).toBe(false);
  });
});
