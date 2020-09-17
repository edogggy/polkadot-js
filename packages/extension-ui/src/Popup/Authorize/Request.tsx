// Copyright 2019-2020 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { RequestAuthorizeTab } from '@polkadot/extension-base/background/types';
import { ThemeProps } from '../../types';

import React, { useCallback, useContext } from 'react';
import { Trans } from 'react-i18next';
import styled from 'styled-components';

import { ActionBar, ActionContext, Button, Icon, Link, Warning } from '../../components';
import useTranslation from '../../hooks/useTranslation';
import { approveAuthRequest, rejectAuthRequest } from '../../messaging';

interface Props {
  authId: string;
  className?: string;
  isFirst: boolean;
  request: RequestAuthorizeTab;
  url: string;
}

function Request ({ authId, className, isFirst, request: { origin }, url }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const onAction = useContext(ActionContext);

  const _onApprove = useCallback(
    () => approveAuthRequest(authId)
      .then(() => onAction())
      .catch((error: Error) => console.error(error)),
    [authId, onAction]
  );

  const _onReject = useCallback(
    () => rejectAuthRequest(authId)
      .then(() => onAction())
      .catch((error: Error) => console.error(error)),
    [authId, onAction]
  );

  return (
    <div className={className}>
      <RequestInfo>
        <Info>
          <Icon
            icon='X'
            onClick={_onReject}
          />
          <div className='tab-info'>
            <Trans key='accessRequest'>An application, self-identifying as <span className='tab-name'>{origin}</span> is requesting access from{' '}
              <a
                href={url}
                rel='noopener noreferrer'
                target='_blank'
              >
                <span className='tab-url'>{url}</span>
              </a>.
            </Trans>
          </div>
        </Info>
        {isFirst && (
          <>
            <RequestWarning>{t<string>('Only approve this request if you trust the application. Approving gives the application access to the addresses of your accounts.')}</RequestWarning>
            <AcceptButton onClick={_onApprove}>{t<string>('Yes, allow this application access')}</AcceptButton>
          </>
        )}
        <RejectButton>
          <Link
            isDanger
            onClick={_onReject}
          >
            Reject
          </Link>
        </RejectButton>
      </RequestInfo>
    </div>
  );
}

const RequestInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;
  background: ${({ theme }: ThemeProps): string => theme.highlightedAreaBackground};
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
`;

const AcceptButton = styled(Button)`
  width: 90%;
  margin: 25px auto 0;
`;

const RequestWarning = styled(Warning)`
  margin: 24px 24px 0 1.45rem;
`;

AcceptButton.displayName = 'AcceptButton';

const RejectButton = styled(ActionBar)`
  margin: 8px 0 15px 0;
  text-decoration: underline;
`;

export default styled(Request)`

  .icon {
    background: ${({ theme }: ThemeProps): string => theme.buttonBackgroundDanger};
    color: white;
    min-width: 18px;
    width: 14px;
    height: 18px;
    font-size: 10px;
    line-height: 20px;
    margin: 16px 15px 0 1.35rem;
    font-weight: 800;
    padding-left: 0.5px;
  }

  .tab-info {
    overflow: hidden;
    margin: 0.75rem 20px 0 0;
  }

  .tab-name,
  .tab-url {
    color: ${({ theme }: ThemeProps): string => theme.textColor};
    display: inline-block;
    max-width: 20rem;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: top;
    cursor: pointer;
    text-decoration: underline;
  }
`;
