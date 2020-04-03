// Copyright 2019 @polkadot/extension-base authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

const extension = typeof chrome !== 'undefined'
  ? chrome
  : typeof browser !== 'undefined'
    ? browser
    : null;

export default extension as typeof chrome;
