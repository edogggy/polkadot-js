// Copyright 2019-2024 @polkadot/extension-mocks authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable @typescript-eslint/no-explicit-any */
import chrome from 'sinon-chrome';

class MessagingFake {
  private listeners: ((...params: unknown[]) => unknown)[] = [];

  get onMessage (): any {
    return {
      addListener: (cb: (...params: unknown[]) => unknown) => this.listeners.push(cb)
    };
  }

  get onDisconnect (): any {
    return {
      addListener: (): any => undefined
    };
  }

  postMessage (data: unknown): void {
    this.listeners.forEach((cb) => cb.call(this, data));
  }
}

const messagingFake = new MessagingFake();

chrome.runtime.connect.returns(messagingFake);

chrome.storage.local.get.returns({
  authUrls: JSON.stringify({
    'localhost:3000': {
      authorizedAccounts: ['5FbSap4BsWfjyRhCchoVdZHkDnmDm3NEgLZ25mesq4aw2WvX'],
      count: 0,
      id: '11',
      origin: 'example.com',
      url: 'http://localhost:3000'
    }
  })
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access
(window as any).chrome = (globalThis as any).chrome = chrome;

export default chrome;
