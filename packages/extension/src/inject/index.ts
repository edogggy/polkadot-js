// Copyright 2019 @polkadot/extension authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { MessageTypes } from '../background/types';
import { WindowInjected } from './types';

import events from '../events';
import Injected from './Injected';

type Callbacks = {
  [index: number]: {
    resolve: (data: any) => void,
    reject: (error: Error) => void
  }
};

const callbacks: Callbacks = {};
let idCounter = 0;

// a generic message sender that creates an event, returning a promise that will resolve once
// the event is resolved (by the response listener just below this)
function sendMessage (message: MessageTypes, request: any = null): Promise<any> {
  return new Promise((resolve, reject) => {
    const id = ++idCounter;

    callbacks[id] = { resolve, reject };

    document.dispatchEvent(
      new CustomEvent(events.request, { detail: { id, message, request } })
    );
  });
}

// setup a response listener (events created by the loader for extension responses)
document.addEventListener(events.response, (event) => {
  const response = (event as CustomEvent).detail;
  const promise = callbacks[response.id];

  if (!promise) {
    console.error(`Uknown response: ${JSON.stringify(response)}`);
    return;
  }

  delete callbacks[response.id];

  if (response.error) {
    promise.reject(new Error(response.error));
  } else {
    promise.resolve(response.response);
  }
});

(window as WindowInjected).injectedWeb3 = (window as WindowInjected).injectedWeb3 || {};
(window as WindowInjected).injectedWeb3[process.env.PKG_NAME as string] = {
  name: process.env.PKG_NAME as string,
  version: process.env.PKG_VERSION as string,
  enable: (origin: string): Promise<Injected> =>
    sendMessage('authorize', { origin }).then(() => new Injected(sendMessage))
};
