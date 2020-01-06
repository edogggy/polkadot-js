// Copyright 2019-2020 @polkadot/extension-ui authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import Adapter from 'enzyme-adapter-react-16';
import { configure, mount, ReactWrapper } from 'enzyme';
import { themes, Header, Settings } from '@polkadot/extension-ui/components';
import { MemoryRouter } from 'react-router';
import React from 'react';

import { ThemeProvider } from 'styled-components';

configure({ adapter: new Adapter() });

describe('Header component', () => {
  let wrapper: ReactWrapper;
  const mountHeader = (props: React.ComponentProps<typeof Header> = {}): ReactWrapper => mount(
    <MemoryRouter>
      <ThemeProvider theme={themes.dark}>
        <Header {...props}>
        </Header>
      </ThemeProvider>
    </MemoryRouter>);

  it('gear icon is not highlighted when settings are hidden', () => {
    wrapper = mountHeader({ showSettings: true });

    expect(wrapper.find(Settings).length).toBe(0);
    expect(wrapper.find('Gear').prop('isSelected')).toBe(false);
  });

  it('highlights gear icon when settings are toggled', () => {
    wrapper = mountHeader({ showSettings: true });

    wrapper.find('SettingsToggle').simulate('click');

    expect(wrapper.find(Settings).length).toBe(1);
    expect(wrapper.find('Gear').prop('isSelected')).toBe(true);
  });
});
