// Copyright 2019-2020 @polkadot/extension-ui authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ThemeProps } from '../types';

import React from 'react';
import styled from 'styled-components';

import ArrowLeftImage from '../assets/arrowLeft.svg';
import useTranslation from '../hooks/useTranslation';
import { Link, Svg } from '../components';

interface Props extends ThemeProps {
  className?: string;
  to?: string;
}

function Back ({ className, to = '/' }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  return (
    <div className={className}>
      <BackLink to={to}>
        <ArrowLeft />
        {t('Back')}
      </BackLink>
    </div>
  );
}

const ArrowLeft = styled(Svg).attrs(() => ({ src: ArrowLeftImage }))`
  width: 12px;
  height: 12px;
  margin-right: 13px;
  background: ${({ theme }: ThemeProps) => theme.labelColor};
`;

const BackLink = styled(Link)`
  width: min-content;
  text-decoration: underline;
  color: ${({ theme }: ThemeProps) => theme.labelColor};

  &:visited {
    color: ${({ theme }: ThemeProps) => theme.labelColor};
  }
`;

export default React.memo(styled(Back)(({ theme }: Props) => `
  margin: 0;
  line-height: 52px;
  border-bottom: 1px solid ${theme.inputBorderColor};
  font-size: ${theme.labelFontSize};
`));
