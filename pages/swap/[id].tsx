import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { PAGES } from '~constants'
import { getAvatar } from '~utils/avatar'
import {
  erc721ABI,
  useAccount,
  useContractRead,
  useContractReads,
  useContractWrite,
  useDisconnect,
  useEnsName,
  usePrepareContractWrite,
} from 'wagmi'
import { ConnectKitButton } from 'connectkit'
import { useRouter } from 'next/router'
import { address as escrowAddress, abi } from 'contract/escrow'
import { Address, Item, Offer } from './new'
import { useMemo } from 'react'
import { truncate } from '@dwarvesf/react-utils'
import { useClipboard } from '@dwarvesf/react-hooks'
import { SpinnerIcon } from '~components/icons/Spinner'
import {
  ArrowDownTrayIcon,
  ChatBubbleLeftRightIcon,
  CheckBadgeIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid'
import classNames from 'classnames'
import { GetServerSideProps } from 'next'
import { API } from '~constants/api'
import Stepper from '~components/Stepper'
import { BigNumber, constants } from 'ethers'
import { ReadContractsContract } from '@wagmi/core/dist/declarations/src/actions/contracts/readContracts'
import { SwapReceipt } from '~components/SwapReceipt'

type ButtonGroupProps = {
  canDeposit: boolean
  disconnect: () => void
  cancelDeal?: () => Promise<void>
  depositAll: () => Promise<void>
  // which button to show spinner
  loadingIndex: number
}

const commonBtnStyle =
  'items-center flex gap-x-1 justify-start whitespace-nowrap rounded-md px-2 py-1 hover:underline text-xs font-medium'

const ButtonGroup = ({
  canDeposit,
  depositAll,
  disconnect,
  cancelDeal,
  loadingIndex,
}: ButtonGroupProps) => {
  return (
    <div className="flex flex-col mt-3">
      <button
        onClick={depositAll}
        disabled={!canDeposit}
        className={classNames(commonBtnStyle, {
          'text-gray-800': canDeposit,
          'text-gray-400 hover:no-underline': !canDeposit,
        })}
      >
        {loadingIndex === 0 ? (
          <SpinnerIcon className="w-3 h-3" />
        ) : (
          <ArrowDownTrayIcon className="w-3 h-3" />
        )}
        <span>Deposit</span>
      </button>
      {cancelDeal ? (
        <button
          onClick={cancelDeal}
          className={classNames(commonBtnStyle, 'text-gray-800')}
        >
          {loadingIndex === 1 ? (
            <SpinnerIcon className="w-3 h-3" />
          ) : (
            <XMarkIcon className="w-3 h-3" />
          )}
          <span>Cancel</span>
        </button>
      ) : null}
      <button
        onClick={disconnect}
        className={classNames(commonBtnStyle, 'text-red-600')}
      >
        Disconnect
      </button>
    </div>
  )
}

const Avatar = (props: any) => {
  return (
    <div className="overflow-hidden mb-3 flex flex-col">
      <div
        className={classNames('p-1 rounded-full border-[3px]', {
          'border-red-500': props.isCancelled,
          'border-amber-500': !props.isCancelled && !props.isReady,
          'border-emerald-500':
            !props.isCancelled && (props.isReady || props.isClosed),
        })}
      >
        <img src={getAvatar(props?.src ?? '...', { size: 80 })} alt="" />
      </div>
      <p
        className={classNames(
          'text-[10px] px-2 rounded-md mx-auto text-white relative z-10 border-[3px] border-white -mt-4',
          {
            'bg-red-500': props.isCancelled,
            'bg-amber-500': !props.isCancelled && !props.isReady,
            'bg-emerald-500':
              !props.isCancelled && (props.isReady || props.isClosed),
          },
        )}
      >
        {props.isOtherCancelled
          ? 'Sad'
          : props.isCancelled
          ? 'Cancelled'
          : props.isClosed
          ? 'Done'
          : props.isReady
          ? 'Ready'
          : 'Depositing...'}
      </p>
    </div>
  )
}

const ApproveButton = (props: any) => {
  const { config } = usePrepareContractWrite({
    addressOrName: props.contract,
    functionName: 'approve',
    contractInterface: erc721ABI,
    args: [escrowAddress, props.tokenId],
  })

  const { writeAsync: _approve, isLoading } = useContractWrite(config)

  const approve = async () => {
    try {
      await _approve?.()
    } catch (e) {
      console.error(e)
    }
  }

  if (isLoading) {
    return <SpinnerIcon className="my-auto w-3 h-3 inline" />
  }

  return (
    <button onClick={approve} className="text-blue-500 hover:underline">
      Approve
    </button>
  )
}

const escrow = {
  addressOrName: escrowAddress,
  contractInterface: abi,
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query
  if (!id) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }
  const offer = await API.getTradeOffer(id as string)
  if (!offer) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }

  return {
    props: {
      offer,
    },
  }
}

type Props = {
  offer: Offer
}

export default function TradeDetail({ offer }: Props) {
  const { query } = useRouter()
  const { onCopy: copyRoomLink, hasCopied: roomLinkCopied } = useClipboard(
    typeof window !== 'undefined' ? window.location.href : '',
    1000,
  )
  const { disconnect } = useDisconnect()
  const { isConnected, address } = useAccount()
  const { id } = query
  const { data: trade } = useContractRead({
    ...escrow,
    functionName: 'trades',
    args: [id],
    enabled: Boolean(id),
    watch: true,
  })

  const isA = isConnected && address === offer.owner_address
  const isB = !isA

  const { data: depositedItems = [] } = useContractReads({
    contracts: [
      {
        ...escrow,
        functionName: 'depositedItemsOf',
        args: [id, offer.owner_address],
      },
      {
        ...escrow,
        functionName: 'depositedItemsOf',
        args: [id, isConnected && isB ? address : null],
      },
    ],
    enabled: Boolean(id),
    watch: true,
  })

  const { config: _cancelConfig, refetch: refetchCancelbility } =
    usePrepareContractWrite({
      ...escrow,
      functionName: 'cancelTradeOffer',
      args: [id],
    })

  const { writeAsync: _cancelDeal, isLoading: isCancelling } =
    useContractWrite(_cancelConfig)

  const cancelDeal =
    _cancelDeal &&
    (async () => {
      try {
        const tx = await _cancelDeal?.()
        await tx?.wait()
      } catch (e) {
        console.error(e)
      }
    })

  const { getIsDepositedA, getIsDepositedB } = useMemo(() => {
    const [_depositedA, _depositedB] = depositedItems

    const getDeposited = (deposited: any) => {
      return (deposited ?? []).reduce((acc: any, c: any) => {
        const list = acc[c.tokenAddress]
        if (list) {
          return {
            ...acc,
            [c.tokenAddress.toLowerCase()]: [...list, c.tokenId],
          }
        } else {
          return {
            ...acc,
            [c.tokenAddress.toLowerCase()]: [c.tokenId],
          }
        }
      }, {})
    }

    const depositedA = getDeposited(_depositedA)
    const depositedB = getDeposited(_depositedB)

    const getIsDeposited =
      (deposited: any) => (address: string, id: string) => {
        const depositedAddress = deposited[address.toLowerCase()]

        return (
          depositedAddress &&
          depositedAddress.findIndex((t: BigNumber) => t.eq(id)) !== -1
        )
      }

    return {
      getIsDepositedA: getIsDeposited(depositedA),
      getIsDepositedB: getIsDeposited(depositedB),
    }
  }, [depositedItems])

  const { isCompleted, isCancelled, isOngoing } = useMemo(() => {
    const isCancelled = trade?.isOwnerCancelled || trade?.isRecipientCancelled
    const isCompleted = !isCancelled && trade?.isClosed
    const isOngoing = !isCancelled && !isCompleted

    return {
      isCancelled,
      isCompleted,
      isOngoing,
    }
  }, [trade])

  const { data: fromEns } = useEnsName({
    address: offer.owner_address,
    chainId: 1,
  })

  const { data: approvedOpA = [] } = useContractReads({
    contracts: offer.have_items
      .map((item) => {
        return item.token_ids
          .map<ReadContractsContract>((ti) => {
            return {
              addressOrName: item.token_address,
              functionName: 'getApproved',
              args: [ti],
              contractInterface: erc721ABI,
            }
          })
          .flat()
      })
      .flat(),
    watch: true,
  })

  const { data: approvedOpB = [] } = useContractReads({
    contracts: offer.want_items
      .map((item) => {
        return item.token_ids
          .map<ReadContractsContract>((ti) => {
            return {
              addressOrName: item.token_address,
              functionName: 'getApproved',
              args: [ti],
              contractInterface: erc721ABI,
            }
          })
          .flat()
      })
      .flat(),
    watch: true,
  })

  const { canAdeposit, canBdeposit } = useMemo(() => {
    return {
      canAdeposit:
        !trade?.isOwnerDeposited &&
        approvedOpA.map((a) => a?.toString()).every((a) => a === escrowAddress),
      canBdeposit:
        !trade?.isRecipientDeposited &&
        approvedOpB.map((a) => a?.toString()).every((a) => a === escrowAddress),
    }
  }, [
    approvedOpA,
    approvedOpB,
    trade?.isOwnerDeposited,
    trade?.isRecipientDeposited,
  ])

  const { config } = usePrepareContractWrite({
    ...escrow,
    functionName: 'depositAll',
    args: [
      id,
      offer.owner_address,
      offer.have_items.flatMap((i) =>
        i.token_ids.map((ti) => [i.token_address, ti]),
      ),
      offer.want_items.flatMap((i) =>
        i.token_ids.map((ti) => [i.token_address, ti]),
      ),
    ],
    enabled: Boolean(
      id && isConnected && address && (canAdeposit || canBdeposit),
    ),
  })

  const { writeAsync, isLoading: isDepositing } = useContractWrite(config)

  const depositAll = async () => {
    try {
      const tx = await writeAsync?.()
      await tx?.wait()
    } catch (e) {
      console.error(e)
    } finally {
      await refetchCancelbility()
    }
  }

  if (typeof window === 'undefined') {
    return <SEO title={PAGES.TRADE_DETAIL.title} tailTitle />
  }

  return (
    <Layout>
      <div className="mx-auto flex flex-col items-center text-sm text-gray-800 mt-36">
        <Stepper
          steps={[
            { text: 'Create Offer' },
            { text: 'Negotiate' },
            { text: 'Finish' },
          ]}
          activeIndex={isCompleted || isCancelled ? 2 : 1}
        />
        <img src="/assets/handshake.png" alt="" className="w-16" />
        <div className="mx-auto flex self-stretch gap-x-10">
          <div className="flex flex-col items-center max-w-[100px] flex-shrink-0">
            <Avatar
              src={offer.owner_address}
              isReady={trade?.isOwnerDeposited}
              isCancelled={trade?.isOwnerCancelled}
              isClosed={trade?.isClosed}
              isOtherCancelled={trade?.isRecipientCancelled}
            />
            <Address
              copyValue={offer.owner_address}
              eth={Boolean(fromEns)}
              you={isConnected && isA}
            >
              {fromEns ? fromEns : offer.owner_address ?? '...'}
            </Address>
            <div className="mb-2" />
            {!isConnected ? (
              <ConnectKitButton />
            ) : address === offer.owner_address && isOngoing ? (
              <ButtonGroup
                depositAll={depositAll}
                canDeposit={canAdeposit}
                disconnect={() => disconnect()}
                cancelDeal={cancelDeal}
                loadingIndex={isDepositing ? 0 : isCancelling ? 1 : -1}
              />
            ) : null}
          </div>

          <div className="w-[300px] flex flex-col mt-2 gap-y-5">
            <p className="flex gap-x-2 mx-auto font-medium -mb-2">
              Status:{' '}
              {isCancelled ? (
                <span className="flex items-center gap-x-0.5">
                  <XCircleIcon className="w-4 h-4 text-red-600" /> Cancelled
                </span>
              ) : isCompleted ? (
                <span className="flex items-center gap-x-0.5">
                  <CheckBadgeIcon className="w-4 h-4 text-green-600" />{' '}
                  Completed
                </span>
              ) : isOngoing ? (
                <span className="flex items-center gap-x-0.5">
                  <ChatBubbleLeftRightIcon className="w-4 h-4 animate-pulse" />{' '}
                  Ongoing
                </span>
              ) : (
                ''
              )}
            </p>
            <button
              type="button"
              onClick={copyRoomLink}
              className="bg-gray-200 px-2 py-0.5 rounded mx-auto text-xs"
            >
              {roomLinkCopied ? 'Copied' : 'Copy URL'}
            </button>
            <div className="w-4/5 shadow bg-white flex flex-col items-start gap-x-1 py-1 px-2 font-medium text-gray-600 rounded-md border border-mochi-300 self-start">
              <p>
                {isA ? 'Your items' : isConnected ? 'Their items' : 'Items'}
                {isCompleted ? ' (swapped)' : ''}
              </p>
              <div className="flex flex-col">
                {offer.have_items.map((item) => {
                  return (
                    <div key={`A-${item.id}`} className="flex flex-col">
                      <p>{truncate(item.token_address, 10, true, '.')}</p>
                      <div className="flex flex-col">
                        {item.token_ids.map((ti, i) => {
                          return (
                            <p className="ml-3 flex gap-x-2" key={`${ti}`}>
                              <span>Token ID {ti}</span>
                              {isCancelled ? (
                                ' (sent back)'
                              ) : getIsDepositedA(item.token_address, ti) ? (
                                ' (deposited)'
                              ) : isA &&
                                approvedOpA[i]?.toString() === escrowAddress ? (
                                ' Approved'
                              ) : isA ? (
                                <ApproveButton
                                  contract={item.token_address}
                                  tokenId={ti}
                                />
                              ) : null}
                            </p>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="ml-auto w-4/5 shadow bg-white flex flex-col items-end gap-x-1 py-1 px-2 font-medium text-gray-600 rounded-md border border-mochi-300 self-start">
              <p>
                {isConnected && isB
                  ? 'Your items'
                  : isConnected
                  ? 'Their items'
                  : 'Items'}
                {isCompleted ? ' (swapped)' : ''}
              </p>
              <div className="text-right flex flex-col">
                {offer.want_items.map((item) => {
                  return (
                    <div key={`B-${item.id}`} className="flex flex-col">
                      <p>{truncate(item.token_address, 10, true, '.')}</p>
                      <div className="flex flex-col">
                        {item.token_ids.map((ti, i) => {
                          return (
                            <p className="mr-3 flex gap-x-2" key={`${ti}`}>
                              {isCancelled ? (
                                ' (sent back)'
                              ) : getIsDepositedB(item.token_address, ti) ? (
                                '(deposited) '
                              ) : isConnected &&
                                isB &&
                                approvedOpB[i]?.toString() === escrowAddress ? (
                                'Approved '
                              ) : isConnected && isB ? (
                                <ApproveButton
                                  contract={item.token_address}
                                  tokenId={ti}
                                />
                              ) : null}
                              {}
                              <span>Token ID {ti}</span>
                            </p>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="h-px bg-gray-300 w-full" />
            {isCompleted ? (
              <SwapReceipt
                swapId={id as string}
                blockNo={trade?.swapBlockNumber.toNumber()}
              />
            ) : null}
            {!isCompleted ? (
              <div className="flex flex-col">
                <p className="self-start rounded-md ml-1.5 bg-gray-200 px-2 py-1 pb-3 -mb-2 text-xs text-gray-600 font-medium">
                  Note
                </p>
                <div className="italic text-xs text-gray-600/90 flex flex-col gap-y-4 rounded-md shadow-lg bg-gray-200 border-t-2 border-white p-3">
                  <p>
                    Be sure to check the contract address to avoid
                    scamming/fraud deals.
                  </p>
                  <p>
                    All items will be returned to their owner if either side
                    cancels.
                  </p>
                  <p>
                    Each of your items need to be approved before depositing.
                  </p>
                  <p>
                    When you&apos;re ready, click <strong>Deposit</strong> to
                    send your items to the escrow contract.
                  </p>
                  <p>
                    Once the required items are deposited from both parties, the
                    swap will happen automatically.
                  </p>
                  <p>Be kind and friendly :)</p>
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex flex-col items-center max-w-[100px] flex-shrink-0">
            <Avatar
              src={isConnected && isB ? address : constants.AddressZero}
              isReady={trade?.isRecipientDeposited}
              isCancelled={trade?.isRecipientCancelled}
              isClosed={trade?.isClosed}
              isOtherCancelled={trade?.isOwnerCancelled}
            />
            <Address
              copyValue={isConnected && isB ? address : constants.AddressZero}
              you={isConnected && isB}
            >
              {isConnected && isB ? address : constants.AddressZero}
            </Address>
            <div className="mb-2" />
            {!isConnected ? (
              <ConnectKitButton />
            ) : isB && isOngoing ? (
              <ButtonGroup
                depositAll={depositAll}
                canDeposit={canBdeposit}
                disconnect={() => disconnect()}
                cancelDeal={cancelDeal}
                loadingIndex={isDepositing ? 0 : isCancelling ? 1 : -1}
              />
            ) : null}
          </div>
        </div>
      </div>
    </Layout>
  )
}
