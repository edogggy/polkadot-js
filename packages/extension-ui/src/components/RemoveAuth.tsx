// Copyright 2019-2022 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ThemeProps } from '../types';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

function RemoveAuth (): React.ReactElement {
  return (
    <FontAwesomeIcon
      className='trashIcon'
      icon={faTrash}
      size='lg'
    />
  );
}

export default styled(RemoveAuth)(({ theme }: ThemeProps) => `
  label {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 24px;
    margin: 8px;
  }

  .trashIcon {
    color: ${theme.iconNeutralColor};
    margin-left: 8px;

    &.selected {
      color: ${theme.primaryColor};
    }
  }

`);
