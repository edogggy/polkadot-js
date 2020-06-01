// Copyright 2019-2020 @polkadot/extension-ui authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ThemeProps } from '../../types';

import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';

import { Address, Svg } from '../../components';
import arrow from '../../assets/arrow-down.svg';
import useOutsideClick from '../../hooks/useOutsideClick';

interface Props {
  allAddresses: string[];
  className?: string;
  onSelect: (address: string) => void;
  selectedAddress: string;
}

function AddressDropdown ({ allAddresses, className, onSelect, selectedAddress }: Props): React.ReactElement<Props> {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const hideDropdown = useCallback(() => setDropdownVisible(false), []);
  const toggleDropdown = useCallback(() => setDropdownVisible(!isDropdownVisible), [isDropdownVisible]);
  const selectParent = (newParent: string) => (): void => onSelect(newParent);

  useOutsideClick(ref, hideDropdown);

  return (
    <div className={className}>
      <div
        onClick={toggleDropdown}
        ref={ref}
      >
        <Address address={selectedAddress} />
      </div>
      <HiddenOptions visible={isDropdownVisible}>
        {allAddresses.map((address) => (
          <div
            data-parent-option
            key={address}
            onClick={selectParent(address)}
          >
            <Address address={address} />
          </div>
        ))}
      </HiddenOptions>
    </div>
  );
}

const HiddenOptions = styled.div<{ visible: boolean }>`
  position: absolute;
  visibility: ${({ visible }): string => (visible ? 'visible' : 'hidden')};
  width: 430px;
  z-index: 100;
  background: ${({ theme }: ThemeProps): string => theme.bodyColor};
  max-height: ${({ visible }): string => (visible ? '200px' : '0')};
  overflow: scroll;
  padding: 5px;
  border: 1px solid ${({ theme }: ThemeProps): string => theme.boxBorderColor};
  box-sizing: border-box;
  border-radius: 4px;
  margin-top: -8px;

  & > div {
    cursor: pointer;
  }
`;

export default styled(AddressDropdown)(({ theme }: ThemeProps) => `
  margin-bottom: 16px;
  cursor: pointer;

  & > div:first-child > ${Address}::after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 11px;
    width: 30px;
    height: 30px;
    background: url(${arrow}) center no-repeat;
    background-color: ${theme.inputBackground};
    pointer-events: none;
    border-radius: 4px;
    border: 1px solid ${theme.boxBorderColor};
  }

  ${Address} ${Svg} {
    visibility: hidden;
  }
`);
