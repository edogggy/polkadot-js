// Copyright 2019-2023 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { RequestAuthorizeTab } from '@polkadot/extension-base/background/types';
import type { ThemeProps } from '../../types';

import React, { useCallback, useContext, useEffect } from 'react';
import styled from 'styled-components';

import { AccountContext, ActionBar, ActionContext, Button, Link } from '../../components';
import useTranslation from '../../hooks/useTranslation';
import { approveAuthRequest, deleteAuthRequest } from '../../messaging';
import { AccountSelection } from '../../partials';
import NoAccount from './NoAccount';

interface Props extends ThemeProps {
  authId: string;
  className?: string;
  isFirst: boolean;
  request: RequestAuthorizeTab;
  url: string;
}

function Request ({ authId, className, isFirst, request: { origin }, url }: Props): React.ReactElement<Props> {
  const { accounts, selectedAccounts = [], setSelectedAccounts } = useContext(AccountContext);
  const { t } = useTranslation();
  const onAction = useContext(ActionContext);

  useEffect(() => {
    const defaultAccountSelection = accounts
      .filter(({ isDefaultAuthSelected }) => !!isDefaultAuthSelected)
      .map(({ address }) => address);

    setSelectedAccounts && setSelectedAccounts(defaultAccountSelection);
  }, [accounts, setSelectedAccounts]);

  const _onApprove = useCallback(
    (): void => {
      approveAuthRequest(authId, selectedAccounts)
        .then(() => onAction())
        .catch((error: Error) => console.error(error));
    },
    [authId, onAction, selectedAccounts]
  );

  const _onClose = useCallback(
    (): void => {
      deleteAuthRequest(authId)
        .then(() => onAction())
        .catch((error: Error) => console.error(error));
    },
    [authId, onAction]
  );

  if (!accounts.length) {
    return <NoAccount authId={authId} />;
  }

  return (
    <div className={className}>
      <AccountSelection
        origin={origin}
        url={url}
      />
      {isFirst && (
        <Button
          className='acceptButton'
          onClick={_onApprove}
        >
          {t<string>('Connect {{total}} account(s)', { replace: {
            total: selectedAccounts.length
          } })}
        </Button>
      )}
      <ActionBar className='rejectionButton'>
        <Link
          className='closeLink'
          isDanger
          onClick={_onClose}
        >
          {t<string>('Ask again later')}
        </Link>
      </ActionBar>
    </div>
  );
}

export default styled(Request)`
  .acceptButton {
    width: 90%;
    margin: .5rem auto 0;
  }

  .rejectionButton {
    margin: 0 0 15px 0;
    text-decoration: underline;

    .closeLink {
      margin: auto;
      padding: 0;
    }
  }
`;
