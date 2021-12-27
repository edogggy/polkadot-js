// Copyright 2017-2021 @polkadot/extension-chains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { packageInfo as injectInfo } from '@polkadot/extension-inject/packageInfo';
import { detectPackage } from '@polkadot/util';

import { packageInfo } from './packageInfo';

detectPackage(packageInfo, typeof __dirname !== 'undefined' && __dirname, [injectInfo]);
