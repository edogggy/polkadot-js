// Copyright 2019 @polkadot/extension-ui authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { MessageExtrinsicSign } from '@polkadot/extension/background/types';
import { OnActionFromCtx } from '../../components/types';

import React from 'react';

import { ActionBar, Address, Link, withOnAction } from '../../components';
import { approveSignRequest, cancelSignRequest } from '../../messaging';
import Details from './Details';
import Unlock from './Unlock';

type Props = {
  isFirst: boolean,
  onAction: OnActionFromCtx,
  request: MessageExtrinsicSign,
  signId: number,
  url: string
};

function Request ({ isFirst, onAction, request: { address, genesisHash, method, nonce }, signId, url }: Props) {
  const onCancel = () =>
    cancelSignRequest(signId)
      .then(() => onAction())
      .catch(console.error);
  const onSign = (password: string) =>
    approveSignRequest(signId, password)
      .then(() => onAction());

  return (
    <Address address={address}>
      <Details
        genesisHash={genesisHash}
        method={method}
        nonce={nonce}
        url={url}
      />
      <ActionBar>
        <Link isDanger onClick={onCancel}>Cancel</Link>
      </ActionBar>
      {isFirst && <Unlock onSign={onSign} />}
    </Address>
  );
}

export default withOnAction(Request);
