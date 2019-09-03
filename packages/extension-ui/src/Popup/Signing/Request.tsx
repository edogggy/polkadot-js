// Copyright 2019 @polkadot/extension-ui authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ExtrinsicPayload } from '@polkadot/types/interfaces';
import { MessageExtrinsicSign } from '@polkadot/extension/background/types';

import React, { useContext, useState, useEffect } from 'react';
import { createType } from '@polkadot/types';

import { ActionBar, ActionContext, Address, Link } from '../../components';
import { approveSignPassword, approveSignSignature, cancelSignRequest } from '../../messaging';
import Details from './Details';
import Qr from './Qr';
import Unlock from './Unlock';

interface Props {
  isExternal: boolean;
  isFirst: boolean;
  request: MessageExtrinsicSign;
  signId: string;
  url: string;
}

export default function Request ({ isExternal, isFirst, request, signId, url }: Props): React.ReactElement<Props> | null {
  const onAction = useContext(ActionContext);
  const [payload, setPayload] = useState<ExtrinsicPayload | null>(null);

  useEffect((): void => {
    setPayload(createType('ExtrinsicPayload', request, { version: request.version }));
  }, [request]);

  if (!payload) {
    return null;
  }

  const _onCancel = (): Promise<void> =>
    cancelSignRequest(signId)
      .then((): void => onAction())
      .catch((error: Error) => console.error(error));
  const _onSign = (password: string): Promise<void> =>
    approveSignPassword(signId, password)
      .then((): void => onAction())
      .catch((error: Error) => console.error(error));
  const _onSignature = ({ signature }: { signature: string }): Promise<void> =>
    approveSignSignature(signId, signature)
      .then((): void => onAction())
      .catch((error: Error) => console.error(error));
  const action = (
    <ActionBar>
      <Link isDanger onClick={_onCancel}>Cancel</Link>
    </ActionBar>
  );

  return (
    <Address address={request.address}>
      {isExternal && isFirst
        ? <Qr
          payload={payload}
          request={request}
          onSignature={_onSignature}
        />
        : <Details
          isDecoded={isFirst}
          payload={payload}
          request={request}
          url={url}
        />
      }
      {isFirst && !isExternal && <Unlock onSign={_onSign} />}
      {action}
    </Address>
  );
}
