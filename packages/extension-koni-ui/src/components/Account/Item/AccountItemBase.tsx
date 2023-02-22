// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import useAccountAvatarTheme from '@subwallet/extension-koni-ui/hooks/account/useAccountAvatarTheme';
import useAccountRecoded from '@subwallet/extension-koni-ui/hooks/account/useAccountRecoded';
import { Theme, ThemeProps } from '@subwallet/extension-koni-ui/types';
import { Icon } from '@subwallet/react-ui';
import AccountItem, { AccountItemProps } from '@subwallet/react-ui/es/web3-block/account-item';
import { CheckCircle } from 'phosphor-react';
import React from 'react';
import styled, { useTheme } from 'styled-components';

import { KeypairType } from '@polkadot/util-crypto/types';

export interface AccountItemBaseProps extends Omit<AccountItemProps, 'avatarIdentPrefix'>, ThemeProps {
  genesisHash?: string | null;
  type?: KeypairType;
  accountName?: string;
  showUnselectIcon?: boolean;
}

const Component: React.FC<AccountItemBaseProps> = (props: AccountItemBaseProps) => {
  const { address, genesisHash, isSelected, onClick, showUnselectIcon, type: givenType } = props;
  const { formatted, prefix } = useAccountRecoded(address || '', genesisHash, givenType);
  const avatarTheme = useAccountAvatarTheme(address || '');
  const { token } = useTheme() as Theme;

  return (
    <div className={props.className}>
      <AccountItem
        {...props}
        address={formatted || ''}
        avatarIdentPrefix={prefix || 42}
        avatarTheme={avatarTheme}
        onPressItem={onClick}
        rightItem={<>
          {(showUnselectIcon || isSelected) && (
            <div className={'ant-account-item-icon'}>
              <Icon
                iconColor={isSelected ? token.colorSuccess : token.colorTextLight4}
                phosphorIcon={CheckCircle}
                size='sm'
                type='phosphor'
                weight='fill'
              />
            </div>
          )}
        </>
        }
      />
    </div>
  );
};

const AccountItemBase = styled(Component)<AccountItemBaseProps>(({ theme: { token } }: AccountItemBaseProps) => {
  return {

  };
});

export default AccountItemBase;
