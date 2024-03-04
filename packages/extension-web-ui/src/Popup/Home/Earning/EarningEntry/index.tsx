// Copyright 2019-2022 @subwallet/extension-web-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { NotificationType } from '@subwallet/extension-base/background/KoniTypes';
import { AlertModal, LoadingScreen, PageWrapper } from '@subwallet/extension-web-ui/components';
import { SUBSTRATE_ACCOUNT_TYPE } from '@subwallet/extension-web-ui/constants';
import { DataContext } from '@subwallet/extension-web-ui/contexts/DataContext';
import { useAlert, useGroupYieldPosition, useSelector, useTranslation } from '@subwallet/extension-web-ui/hooks';
import EarningOptions from '@subwallet/extension-web-ui/Popup/Home/Earning/EarningEntry/EarningOptions';
import EarningPositions from '@subwallet/extension-web-ui/Popup/Home/Earning/EarningEntry/EarningPositions';
import { EarningEntryParam, EarningEntryView, ThemeProps } from '@subwallet/extension-web-ui/types';
import CN from 'classnames';
import { PlusCircle, XCircle } from 'phosphor-react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { KeypairType } from '@polkadot/util-crypto/types';

type Props = ThemeProps;
const alertModalId = 'earning-entry-alert-modal';

function Component () {
  const locationState = useLocation().state as EarningEntryParam;
  const { currentAccount } = useSelector((state) => state.accountState);
  const currentAccountRef = useRef(currentAccount?.address);
  const [entryView, setEntryView] = useState<EarningEntryView>(locationState?.view || EarningEntryView.POSITIONS);
  const [loading, setLoading] = useState<boolean>(false);
  const redirectFromPreviewRef = useRef<boolean>(locationState?.redirectFromPreview || false);
  const accountTypeRef = useRef<KeypairType | undefined>(locationState?.accountType);
  const chainNameRef = useRef<string>(locationState?.chainName || '');
  const { t } = useTranslation();
  const { alertProps, closeAlert, openAlert } = useAlert(alertModalId);
  const earningPositions = useGroupYieldPosition();
  const navigate = useNavigate();

  useEffect(() => {
    if (redirectFromPreviewRef.current && accountTypeRef.current) {
      const accountTypeLabel = accountTypeRef.current === SUBSTRATE_ACCOUNT_TYPE ? 'Polkadot' : 'Ethereum';

      openAlert({
        title: t('Invalid account type'),
        type: NotificationType.ERROR,
        content: t('You don’t have a {{accountType}} account to stake on {{chainName}} network yet. Create a new account and try again.', { replace: { accountType: accountTypeLabel, chainName: chainNameRef.current } }),
        cancelButton: {
          text: 'Dismiss',
          onClick: closeAlert,
          icon: XCircle
        },
        okButton: {
          text: t('Create new'),
          onClick: () => {
            closeAlert();
            navigate('/accounts/new-seed-phrase');
          },
          icon: PlusCircle
        }
      });
    }
  }, [closeAlert, navigate, openAlert, t]);

  useEffect(() => {
    if (currentAccountRef.current !== currentAccount?.address) {
      currentAccountRef.current = currentAccount?.address;

      setEntryView(EarningEntryView.POSITIONS);
    }
  }, [currentAccount?.address]);

  if (loading) {
    return (<LoadingScreen />);
  }

  return (
    <>
      {earningPositions.length && entryView === EarningEntryView.POSITIONS
        ? (
          <EarningPositions
            earningPositions={earningPositions}
            setEntryView={setEntryView}
            setLoading={setLoading}
          />
        )
        : (
          <EarningOptions
            earningPositions={earningPositions}
            setEntryView={setEntryView}
          />
        )}

      {
        !!alertProps && (
          <AlertModal
            modalId={alertModalId}
            {...alertProps}
          />
        )
      }
    </>
  );
}

const Wrapper = ({ className }: Props) => {
  const dataContext = useContext(DataContext);

  return (
    <PageWrapper
      className={CN(className)}
      resolve={dataContext.awaitStores(['earning', 'price', 'balance'])}
    >
      <Component />
    </PageWrapper>
  );
};

const EarningEntry = styled(Wrapper)<Props>(({ theme: { token } }: Props) => ({

}));

export default EarningEntry;
