// Copyright 2019-2020 @polkadot/extension-ui authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ThemeProps } from '../types';

import styled from 'styled-components';
import React, { MouseEventHandler } from 'react';
import TextAreaWithLabel from './TextAreaWithLabel';
import ActionText from '@polkadot/extension-ui/components/ActionText';
import copy from '../assets/copy.svg';

interface Props {
  seed: string;
  onCopy: MouseEventHandler<HTMLDivElement>;
  className?: string;
}

function MnemonicSeed ({ className, onCopy, seed }: Props): React.ReactElement<Props> {
  return (
    <div className={className}>
      <MnemonicText value={seed} />
      <div className='buttonsRow'>
        <ActionText
          data-seed-action='copy'
          icon={copy}
          onClick={onCopy}
          text='Copy to clipboard'
        />
      </div>
    </div>
  );
}

const MnemonicText = styled(TextAreaWithLabel).attrs(() => ({
  isReadOnly: true,
  label: 'Generated 12-word mnemonic seed:'
}))`
  textarea {
    font-size: ${({ theme }: ThemeProps): string => theme.fontSize};
    line-height: ${({ theme }: ThemeProps): string => theme.lineHeight};
    height: unset;
    letter-spacing: -0.01em;
    padding: 14px;
    margin-bottom: 10px;
    color: ${({ theme }: ThemeProps): string => theme.primaryColor};
  }
`;

export default styled(MnemonicSeed)`
  margin-top: 21px;

  .buttonsRow {
    display: flex;
    flex-direction: row;

    ${ActionText} {
      margin-right: 32px;
    }
  }
`;
