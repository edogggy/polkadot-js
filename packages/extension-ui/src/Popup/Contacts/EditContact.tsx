// Copyright 2019-2021 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ThemeProps } from '../../types';

import React, { useCallback, useContext } from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';

import { ActionBar, ActionContext, ActionText, Button } from '../../components';
import useTranslation from '../../hooks/useTranslation';
import { Header } from '../../partials';

interface Props extends RouteComponentProps<{address: string}>, ThemeProps {
  className?: string;
}

function EditContact ({ className = '' }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const onAction = useContext(ActionContext);

  const _goToContacts = useCallback(
    () => onAction('/contacts'),
    [onAction]
  );

  return (
    <>
      <Header
        backTo='/contacts'
        showBackArrow
        showContactDelete
        text={t<string>('Edit Contact')}
      />

      <div className={className}>
        <div className='field'>
          <text>Name</text>
          <input type='text'></input>
        </div>

        <div className='field'>
          <text>Address</text>
          <input type='text'></input>
        </div>

        <div className='field'>
          <text>Memo</text>
          <input type='text'></input>
        </div>

        <Button
          onClick={_goToContacts}
          style={{ marginTop: 20 }}
        >
          {t<string>('Save')}
        </Button>
        <ActionBar style={{ marginTop: 6 }}>
          <ActionText
            onClick={_goToContacts}
            style={{ margin: 'auto' }}
            text={t<string>('Cancel')}
          />
        </ActionBar>
      </div>
    </>
  );
}

export default styled(EditContact)(({ theme }: Props) => `
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    flex-direction: column;
  }

  .field {
    margin-top: 20px;
  }
`);
