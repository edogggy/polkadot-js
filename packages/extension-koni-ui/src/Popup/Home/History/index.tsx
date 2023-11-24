// Copyright 2019-2022 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ExtrinsicStatus, ExtrinsicType, TransactionDirection, TransactionHistoryItem } from '@subwallet/extension-base/background/KoniTypes';
import { _isChainEvmCompatible } from '@subwallet/extension-base/services/chain-service/utils';
import { quickFormatAddressToCompare } from '@subwallet/extension-base/utils/address';
import { AccountSelector, BasicInputEvent, ChainSelector, EmptyList, FilterModal, HistoryItem, Layout, PageWrapper } from '@subwallet/extension-koni-ui/components';
import { HISTORY_DETAIL_MODAL } from '@subwallet/extension-koni-ui/constants';
import { useChainInfoWithState, useFilterModal, useHistorySelection, useSelector, useSetCurrentPage } from '@subwallet/extension-koni-ui/hooks';
import { cancelSubscription, subscribeTransactionHistory } from '@subwallet/extension-koni-ui/messaging';
import { ChainItemType, ThemeProps, TransactionHistoryDisplayData, TransactionHistoryDisplayItem } from '@subwallet/extension-koni-ui/types';
import { customFormatDate, formatHistoryDate, isTypeStaking, isTypeTransfer } from '@subwallet/extension-koni-ui/utils';
import { ButtonProps, Icon, ModalContext, SwIconProps, SwList, SwSubHeader } from '@subwallet/react-ui';
import { Aperture, ArrowDownLeft, ArrowUpRight, Clock, ClockCounterClockwise, Database, FadersHorizontal, Rocket, Spinner } from 'phosphor-react';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { isEthereumAddress } from '@polkadot/util-crypto';

import { HistoryDetailModal } from './Detail';

type Props = ThemeProps

const IconMap: Record<string, SwIconProps['phosphorIcon']> = {
  send: ArrowUpRight,
  receive: ArrowDownLeft,
  claim_reward: ClockCounterClockwise,
  staking: Database,
  crowdloan: Rocket,
  nft: Aperture,
  processing: Spinner,
  default: ClockCounterClockwise
};

function getIcon (item: TransactionHistoryItem): SwIconProps['phosphorIcon'] {
  if (item.status === ExtrinsicStatus.PROCESSING || item.status === ExtrinsicStatus.SUBMITTING) {
    return IconMap.processing;
  }

  if (item.type === ExtrinsicType.SEND_NFT) {
    return IconMap.nft;
  }

  if (item.type === ExtrinsicType.CROWDLOAN) {
    return IconMap.crowdloan;
  }

  if (item.type === ExtrinsicType.STAKING_CLAIM_REWARD) {
    return IconMap.claim_reward;
  }

  if (isTypeStaking(item.type)) {
    return IconMap.staking;
  }

  return IconMap.default;
}

function getDisplayData (item: TransactionHistoryItem, nameMap: Record<string, string>, titleMap: Record<string, string>): TransactionHistoryDisplayData {
  let displayData: TransactionHistoryDisplayData;
  const time = customFormatDate(item.time, '#hhhh#:#mm#');

  const displayStatus = item.status === ExtrinsicStatus.FAIL ? 'fail' : '';

  if (item.type === ExtrinsicType.TRANSFER_BALANCE || item.type === ExtrinsicType.TRANSFER_TOKEN || item.type === ExtrinsicType.TRANSFER_XCM || item.type === ExtrinsicType.EVM_EXECUTE) {
    if (item.direction === TransactionDirection.RECEIVED) {
      displayData = {
        className: `-receive -${item.status}`,
        title: titleMap.received,
        name: nameMap.received,
        typeName: `${nameMap.received} ${displayStatus} - ${time}`,
        icon: IconMap.receive
      };
    } else {
      displayData = {
        className: `-send -${item.status}`,
        title: titleMap.send,
        name: nameMap.send,
        typeName: `${nameMap.send} ${displayStatus} - ${time}`,
        icon: IconMap.send
      };
    }
  } else {
    const typeName = nameMap[item.type] || nameMap.default;

    displayData = {
      className: `-${item.type} -${item.status}`,
      title: titleMap[item.type],
      typeName: `${typeName} ${displayStatus} - ${time}`,
      name: nameMap[item.type],
      icon: getIcon(item)
    };
  }

  if (item.status === ExtrinsicStatus.PROCESSING) {
    displayData.className = '-processing';
    displayData.typeName = nameMap.processing;
  }

  if (item.status === ExtrinsicStatus.SUBMITTING) {
    displayData.className = '-processing';
    displayData.typeName = nameMap.submitting;
  }

  return displayData;
}

const FILTER_MODAL_ID = 'history-filter-id';

enum FilterValue {
  SEND = 'send',
  RECEIVED = 'received',
  NFT = 'nft',
  STAKE = 'stake',
  CLAIM = 'claim',
  CROWDLOAN = 'crowdloan',
  SUCCESSFUL = 'successful',
  FAILED = 'failed',
}

function getHistoryItemKey (item: Pick<TransactionHistoryItem, 'chain' | 'address' | 'extrinsicHash' | 'transactionId'>) {
  return `${item.chain}-${item.address}-${item.transactionId || item.extrinsicHash}`;
}

const modalId = HISTORY_DETAIL_MODAL;
const DEFAULT_ITEMS_COUNT = 20;
const NEXT_ITEMS_COUNT = 10;

function Component ({ className = '' }: Props): React.ReactElement<Props> {
  useSetCurrentPage('/home/history');
  const { t } = useTranslation();
  const { activeModal, checkActive, inactiveModal } = useContext(ModalContext);
  const { accounts, currentAccount, isAllAccount } = useSelector((root) => root.accountState);
  const { chainInfoMap } = useSelector((root) => root.chainStore);
  const chainInfoList = useChainInfoWithState();
  const { language } = useSelector((root) => root.settings);
  const [rawHistoryList, setRawHistoryList] = useState<TransactionHistoryItem[]>([]);

  const isActive = checkActive(modalId);

  const { filterSelectionMap, onApplyFilter, onChangeFilterOption, onCloseFilterModal, selectedFilters } = useFilterModal(FILTER_MODAL_ID);

  const filterFunction = useMemo<(item: TransactionHistoryDisplayItem) => boolean>(() => {
    return (item) => {
      if (!selectedFilters.length) {
        return true;
      }

      for (const filter of selectedFilters) {
        if (filter === FilterValue.SEND) {
          if (isTypeTransfer(item.type) && item.direction === TransactionDirection.SEND) {
            return true;
          }
        } else if (filter === FilterValue.RECEIVED) {
          if (isTypeTransfer(item.type) && item.direction === TransactionDirection.RECEIVED) {
            return true;
          }
        } else if (filter === FilterValue.NFT) {
          if (item.type === ExtrinsicType.SEND_NFT) {
            return true;
          }
        } else if (filter === FilterValue.STAKE) {
          if (isTypeStaking(item.type)) {
            return true;
          }
        } else if (filter === FilterValue.CLAIM) {
          if (item.type === ExtrinsicType.STAKING_CLAIM_REWARD) {
            return true;
          }
        } else if (filter === FilterValue.CROWDLOAN) {
          if (item.type === ExtrinsicType.CROWDLOAN) {
            return true;
          }
        } else if (filter === FilterValue.SUCCESSFUL) {
          if (item.status === ExtrinsicStatus.SUCCESS) {
            return true;
          }
        } else if (filter === FilterValue.FAILED) {
          if (item.status === ExtrinsicStatus.FAIL) {
            return true;
          }
        }
      }

      return false;
    };
  }, [selectedFilters]);

  const filterOptions = useMemo(() => {
    return [
      { label: t('Send token'), value: FilterValue.SEND },
      { label: t('Receive token'), value: FilterValue.RECEIVED },
      { label: t('NFT transaction'), value: FilterValue.NFT },
      { label: t('Stake transaction'), value: FilterValue.STAKE },
      { label: t('Claim staking reward'), value: FilterValue.CLAIM },
      // { label: t('Crowdloan transaction'), value: FilterValue.CROWDLOAN }, // support crowdloan later
      { label: t('Successful'), value: FilterValue.SUCCESSFUL },
      { label: t('Failed'), value: FilterValue.FAILED }
    ];
  }, [t]);

  const accountMap = useMemo(() => {
    return accounts.reduce((accMap, cur) => {
      accMap[cur.address.toLowerCase()] = cur.name || '';

      return accMap;
    }, {} as Record<string, string>);
  }, [accounts]);

  const typeNameMap: Record<string, string> = useMemo(() => ({
    default: t('Transaction'),
    submitting: t('Submitting...'),
    processing: t('Processing...'),
    send: t('Send'),
    received: t('Receive'),
    [ExtrinsicType.SEND_NFT]: t('NFT'),
    [ExtrinsicType.CROWDLOAN]: t('Crowdloan'),
    [ExtrinsicType.STAKING_JOIN_POOL]: t('Stake'),
    [ExtrinsicType.STAKING_LEAVE_POOL]: t('Unstake'),
    [ExtrinsicType.STAKING_BOND]: t('Bond'),
    [ExtrinsicType.STAKING_UNBOND]: t('Unbond'),
    [ExtrinsicType.STAKING_CLAIM_REWARD]: t('Claim Reward'),
    [ExtrinsicType.STAKING_WITHDRAW]: t('Withdraw'),
    [ExtrinsicType.STAKING_CANCEL_UNSTAKE]: t('Cancel unstake'),
    [ExtrinsicType.EVM_EXECUTE]: t('EVM Transaction')
  }), [t]);

  const typeTitleMap: Record<string, string> = useMemo(() => ({
    default: t('Transaction'),
    send: t('Send token'),
    received: t('Receive token'),
    [ExtrinsicType.SEND_NFT]: t('NFT transaction'),
    [ExtrinsicType.CROWDLOAN]: t('Crowdloan transaction'),
    [ExtrinsicType.STAKING_JOIN_POOL]: t('Stake transaction'),
    [ExtrinsicType.STAKING_LEAVE_POOL]: t('Unstake transaction'),
    [ExtrinsicType.STAKING_BOND]: t('Bond transaction'),
    [ExtrinsicType.STAKING_UNBOND]: t('Unbond transaction'),
    [ExtrinsicType.STAKING_CLAIM_REWARD]: t('Claim Reward transaction'),
    [ExtrinsicType.STAKING_WITHDRAW]: t('Withdraw transaction'),
    [ExtrinsicType.STAKING_CANCEL_UNSTAKE]: t('Cancel unstake transaction'),
    [ExtrinsicType.EVM_EXECUTE]: t('EVM Transaction')
  }), [t]);

  // Fill display data to history list
  const historyMap = useMemo(() => {
    const finalHistoryMap: Record<string, TransactionHistoryDisplayItem> = {};

    rawHistoryList.forEach((item: TransactionHistoryItem) => {
      // Format display name for account by address
      const fromName = accountMap[quickFormatAddressToCompare(item.from) || ''];
      const toName = accountMap[quickFormatAddressToCompare(item.to) || ''];
      const key = getHistoryItemKey(item);

      finalHistoryMap[key] = { ...item, fromName, toName, displayData: getDisplayData(item, typeNameMap, typeTitleMap) };
    });

    return finalHistoryMap;
  }, [accountMap, rawHistoryList, typeNameMap, typeTitleMap]);

  const [currentItemDisplayCount, setCurrentItemDisplayCount] = useState<number>(DEFAULT_ITEMS_COUNT);

  const getHistoryItems = useCallback((count: number) => {
    return Object.values(historyMap).sort((a, b) => (b.time - a.time)).slice(0, count);
  }, [historyMap]);

  const [historyItems, setHistoryItems] = useState<TransactionHistoryDisplayItem[]>(getHistoryItems(DEFAULT_ITEMS_COUNT));

  const [curAdr] = useState(currentAccount?.address);

  // Handle detail modal
  const { chain, extrinsicHashOrId } = useParams();
  const [selectedItem, setSelectedItem] = useState<TransactionHistoryDisplayItem | null>(null);
  const [openDetailLink, setOpenDetailLink] = useState<boolean>(!!chain && !!extrinsicHashOrId);

  const onOpenDetail = useCallback((item: TransactionHistoryDisplayItem) => {
    return () => {
      setSelectedItem(item);
      activeModal(modalId);
    };
  }, [activeModal]);

  const onCloseDetail = useCallback(() => {
    inactiveModal(modalId);
    setSelectedItem(null);
    setOpenDetailLink(false);
  }, [inactiveModal]);

  const onClickFilter = useCallback(() => {
    activeModal(FILTER_MODAL_ID);
  }, [activeModal]);

  useEffect(() => {
    if (extrinsicHashOrId && chain && openDetailLink) {
      const existed = Object.values(historyMap).find((item) => item.chain === chain && (item.transactionId === extrinsicHashOrId || item.extrinsicHash === extrinsicHashOrId));

      if (existed) {
        setSelectedItem(existed);
        activeModal(modalId);
      }
    }
  }, [activeModal, chain, extrinsicHashOrId, openDetailLink, historyMap]);

  useEffect(() => {
    if (isActive) {
      setSelectedItem((selected) => {
        if (selected) {
          const key = getHistoryItemKey(selected);

          return historyMap[key] || null;
        } else {
          return selected;
        }
      });
    }
  }, [isActive, historyMap]);

  useEffect(() => {
    if (currentAccount?.address !== curAdr) {
      inactiveModal(modalId);
      setSelectedItem(null);
    }
  }, [curAdr, currentAccount?.address, inactiveModal]);

  const { selectedAddress, selectedChain, setSelectedAddress, setSelectedChain } = useHistorySelection();

  const emptyList = useCallback(() => {
    return (
      <EmptyList
        emptyMessage={t('Your transactions will show up here')}
        emptyTitle={t('No transactions found')}
        phosphorIcon={Clock}
      />
    );
  }, [t]);

  const renderItem = useCallback(
    (item: TransactionHistoryDisplayItem) => {
      return (
        <HistoryItem
          item={item}
          key={`${item.extrinsicHash}-${item.address}-${item.direction}`}
          onClick={onOpenDetail(item)}
        />
      );
    },
    [onOpenDetail]
  );

  const groupBy = useCallback((item: TransactionHistoryItem) => {
    return formatHistoryDate(item.time, language, 'list');
  }, [language]);

  const groupSeparator = useCallback((group: TransactionHistoryItem[], idx: number, groupLabel: string) => {
    return (
      <div className='__group-separator'>{groupLabel}</div>
    );
  }, []);

  const chainItems = useMemo<ChainItemType[]>(() => {
    if (!selectedAddress) {
      return [];
    }

    const result: ChainItemType[] = [];

    chainInfoList.forEach((c) => {
      if (_isChainEvmCompatible(c) === isEthereumAddress(selectedAddress)) {
        result.push({
          name: c.name,
          slug: c.slug
        });
      }
    });

    return result;
  }, [chainInfoList, selectedAddress]);

  const onSelectAccount = useCallback((event: BasicInputEvent) => {
    setSelectedAddress(event.target.value);
  }, [setSelectedAddress]);

  const onSelectChain = useCallback((event: BasicInputEvent) => {
    setSelectedChain(event.target.value);
  }, [setSelectedChain]);

  const historySelectorsNode = (
    <>
      {
        isAllAccount && (
          <AccountSelector
            className={'__history-address-selector'}
            onChange={onSelectAccount}
            value={selectedAddress}
          />
        )
      }

      <ChainSelector
        className={'__history-chain-selector'}
        items={chainItems}
        onChange={onSelectChain}
        title={t('Select chain')}
        value={selectedChain}
      />
    </>
  );

  const _onApplyFilter = useCallback(() => {
    onApplyFilter();
    setCurrentItemDisplayCount(DEFAULT_ITEMS_COUNT);
  }, [onApplyFilter]);

  const onLoadMoreItems = useCallback(() => {
    setCurrentItemDisplayCount((prev) => {
      if (prev + NEXT_ITEMS_COUNT > rawHistoryList.length) {
        return rawHistoryList.length;
      } else {
        return prev + NEXT_ITEMS_COUNT;
      }
    });
  }, [rawHistoryList.length]);

  const listSection = (
    <>
      <div className={'__page-tool-area'}>
        {historySelectorsNode}
      </div>

      <div className={'__page-list-area'}>
        <SwList
          filterBy={filterFunction}
          groupBy={groupBy}
          groupSeparator={groupSeparator}
          hasMoreItems={rawHistoryList.length > historyItems.length}
          list={historyItems}
          loadMoreItems={onLoadMoreItems}
          renderItem={renderItem}
          renderOnScroll={false}
          renderWhenEmpty={emptyList}
        />
      </div>
    </>
  );

  const headerIcons = useMemo<ButtonProps[]>(() => {
    return [
      {
        icon: (
          <Icon
            customSize={'24px'}
            phosphorIcon={FadersHorizontal}
            type='phosphor'
          />
        ),
        onClick: onClickFilter
      }
    ];
  }, [onClickFilter]);

  useEffect(() => {
    let id: string;
    let isSubscribed = true;

    setCurrentItemDisplayCount(DEFAULT_ITEMS_COUNT);

    subscribeTransactionHistory(
      selectedChain,
      selectedAddress,
      (items: TransactionHistoryItem[]) => {
        if (isSubscribed) {
          setRawHistoryList(items);
        }
      }
    ).then((res) => {
      id = res.id;

      if (isSubscribed) {
        setRawHistoryList(res.items);
      } else {
        cancelSubscription(id).catch(console.log);
      }
    }).catch((e) => {
      console.log('subscribeTransactionHistory error:', e);
    });

    return () => {
      isSubscribed = false;

      if (id) {
        cancelSubscription(id).catch(console.log);
      }
    };
  }, [selectedAddress, selectedChain]);

  useEffect(() => {
    if (chainItems.length) {
      setSelectedChain((prevChain) => {
        if (prevChain && chainInfoMap[prevChain]) {
          if (_isChainEvmCompatible(chainInfoMap[prevChain]) === isEthereumAddress(selectedAddress)) {
            return prevChain;
          }
        }

        return chainItems[0].slug;
      });
    }
  }, [chainInfoMap, chainItems, selectedAddress, setSelectedChain]);

  useEffect(() => {
    setHistoryItems(getHistoryItems(currentItemDisplayCount));
  }, [currentItemDisplayCount, getHistoryItems]);

  return (
    <>
      <PageWrapper
        className={`history ${className}`}
      >
        <Layout.Base>
          <SwSubHeader
            background={'transparent'}
            center={false}
            className={'history-header'}
            paddingVertical
            rightButtons={headerIcons}
            showBackButton={false}
            title={t('History')}
          />

          <div className={'__page-background'}></div>

          {listSection}
        </Layout.Base>
      </PageWrapper>

      <HistoryDetailModal
        data={selectedItem}
        onCancel={onCloseDetail}
      />

      <FilterModal
        id={FILTER_MODAL_ID}
        onApplyFilter={_onApplyFilter}
        onCancel={onCloseFilterModal}
        onChangeOption={onChangeFilterOption}
        optionSelectionMap={filterSelectionMap}
        options={filterOptions}
      />
    </>
  );
}

const History = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return ({
    display: 'flex',
    flexDirection: 'column',

    '.__page-background': {
      position: 'relative',
      zIndex: 1,

      '&:before': {
        content: '""',
        display: 'block',
        height: 190,
        top: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        background: 'linear-gradient(180deg, rgba(76, 234, 172, 0.10) 0%, rgba(76, 234, 172, 0.00) 94.17%)'
      }
    },

    '.__page-tool-area': {
      display: 'flex',
      padding: token.padding,
      paddingTop: 0,
      borderBottomLeftRadius: token.size,
      borderBottomRightRadius: token.size,
      backgroundColor: token.colorBgDefault,
      gap: token.sizeSM,
      position: 'relative',
      zIndex: 2,

      '.__history-address-selector, .__history-chain-selector': {
        height: 40,
        flex: 1,
        borderRadius: 32,
        overflow: 'hidden',

        '&:before': {
          display: 'none'
        },

        '.ant-select-modal-input-wrapper': {
          paddingLeft: token.padding,
          paddingRight: token.padding
        }
      }
    },

    '.__loading-area': { display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%' },

    '.__page-list-area': {
      flex: 1,
      overflow: 'auto',
      position: 'relative',
      zIndex: 2
    },

    '.ant-sw-list': {
      height: '100%',
      overflow: 'auto',
      paddingBottom: token.padding,
      paddingLeft: token.padding,
      paddingRight: token.padding,

      '.__infinite-loader': {
        opacity: 0
      }
    },

    '.ant-sw-screen-layout-body': {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    },

    '.history-header.ant-sw-sub-header-container': {
      marginBottom: 0
    },

    '.ant-sw-list-section': {
      flex: 1
    },
    '.ant-sw-sub-header-container': {
      marginBottom: token.marginXS
    },
    '.history-item + .history-item, .history-item + .___list-separator': {
      marginTop: token.marginXS
    },
    '.___list-separator': {
      fontSize: token.fontSizeSM,
      lineHeight: token.lineHeightSM,
      color: token.colorTextLight3,
      fontWeight: token.headingFontWeight,
      marginBottom: token.marginXS
    }
  });
});

export default History;
