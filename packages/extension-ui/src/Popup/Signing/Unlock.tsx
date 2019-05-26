// Copyright 2019 @polkadot/extension-ui authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React, { useState, useEffect } from 'react';

import { Button, Input } from '../../components';

type Props = {
  className?: string,
  onSign: (password: string) => Promise<void>
};

export default function Unlock ({ className, onSign }: Props) {
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');

  const onClick = () =>
    onSign(password)
      .catch((error) => setError(error.message));

  useEffect(() => {
    if (error) {
      setError('');
    }
  }, [password]);

  return (
    <div className={className}>
      <Input
        isError={!password || !!error}
        isFocussed
        label='password for this account'
        onChange={setPassword}
        type='password'
      />
      <Button
        label='Sign the transaction'
        onClick={onClick}
      />
    </div>
  );
}
