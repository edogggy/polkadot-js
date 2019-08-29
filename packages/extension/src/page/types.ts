// Copyright 2019 @polkadot/extension authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { MessageTypes, PayloadTypes, ResponseTypes } from '../background/types';

export interface SendRequest {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <TMessageType extends MessageTypes>(message: TMessageType, request?: PayloadTypes[TMessageType], subscriber?: (data: any) => void): Promise<ResponseTypes[TMessageType]>;
}
