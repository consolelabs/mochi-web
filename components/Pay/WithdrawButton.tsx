import { useDisclosure } from '@dwarvesf/react-hooks'
import { Icon } from '@iconify/react'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { button } from '~components/Dashboard/Button'
import Modal from '~components/Modal'
import { toast } from 'sonner'
import ConnectSocialButton from './ConnectSocialButton'
import WalletAddressForm from './WalletAddressForm'
import ToastSuccess from '~components/Toast/ToastSuccess'
import { noop, truncate } from '@dwarvesf/react-utils'
import { Popover } from '@headlessui/react'
import SocialButtons from './components/SocialButtons'
import { Float } from '@headlessui-float/react'
import ToastLoading from '~components/Toast/ToastLoading'
import { API } from '~constants/api'
import { PayRequest } from '~pages/pay/[pay_code]'
import ToastError from '~components/Toast/ToastError'
import clsx from 'clsx'

const DropdownButton = ({
  icon,
  title,
  description,
  onClick = noop,
  wip = false,
}: {
  icon: React.ReactElement
  title: string
  description: string
  onClick?: () => void
  wip?: boolean
}) => {
  return (
    <button
      type="button"
      className={button({
        appearance: 'text',
        className: clsx('!p-0 gap-x-2', {
          'opacity-30 outline-none': wip,
        }),
      })}
      onClick={onClick}
    >
      <div className="flex relative">
        {React.cloneElement(icon, {
          ...icon.props,
          className: 'w-5 h-5 md:w-6 md:h-6 flex-shrink-0',
        })}
      </div>
      <div className="flex-1 text-start">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs font-medium text-dashboard-gray-8">
          {description}
        </div>
      </div>
    </button>
  )
}

type WithdrawOption = {
  id: 'none' | 'mochi-wallet' | 'wallet' | 'public-key'
  handler?: () => void
}

type Props = {
  payRequest?: PayRequest
  isDone: boolean
  setDone: () => void
  refresh: () => void
}

export default function WithdrawButton({
  payRequest,
  isDone,
  setDone,
  refresh,
}: Props) {
  const {
    isOpen: isShowingReminder,
    onOpen: showReminder,
    onClose: hideReminder,
  } = useDisclosure()

  const {
    isOpen: isShowingPulicKeyWithdraw,
    onOpen: showPublicKeyWithdraw,
    onClose: hidePublicKeyWithdraw,
  } = useDisclosure()

  const [onChainWallet, setOnChainWallet] = useState<string>()

  const [option, setOption] = useState<WithdrawOption>({
    id: 'none',
  })

  const { isOpen: isShowSubmittedToast, onOpen: showSubmittedToast } =
    useDisclosure()

  const [processingToastId, setProcessingToastId] = useState<number>()

  const handleWithdrawOnChain = useCallback(
    async (values: { walletAddress: string }) => {
      if (payRequest?.code) {
        toast.custom(
          (t) => {
            setProcessingToastId(t)
            API.MOCHI_PAY.json({
              public_key: values.walletAddress,
            })
              .url(`/pay-requests/${payRequest.code}/claim/onchain`)
              .put()
              .notFound(() =>
                toast.custom(() => (
                  <ToastError
                    key="withdraw-error-not-found"
                    message="Withdrawal Error"
                    description="The Pay Link couldn't be found"
                  />
                )),
              )
              .res(() => {
                setOnChainWallet(values.walletAddress)
                setTimeout(refresh, 3000)
              })

            return <ToastLoading text="Processing your withdrawal request..." />
          },
          { duration: Infinity },
        )
        hidePublicKeyWithdraw()
      }
    },
    [hidePublicKeyWithdraw, payRequest?.code, refresh],
  )

  useEffect(() => {
    if (!onChainWallet) return
    if (payRequest?.claim_tx && !isShowSubmittedToast) {
      toast.custom(
        () => {
          toast.dismiss(processingToastId)
          setTimeout(showSubmittedToast, 3000)
          return (
            <ToastSuccess
              message="Request submitted"
              description={
                <>
                  Track the transaction{' '}
                  <a
                    className="underline"
                    href={`${
                      new URL(payRequest.token.chain.explorer).origin
                    }/tx/${payRequest.claim_tx}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    here
                  </a>
                </>
              }
            />
          )
        },
        { duration: 10000 },
      )
      return
    }
    if (!isShowSubmittedToast) return
    if (payRequest?.status === 'claimed') {
      toast.custom(() => (
        <ToastSuccess
          message="Withdraw Successful!"
          description={
            <>
              You&#39;ve successfully withdrawn all to wallet{' '}
              <span className="font-bold text-dashboard-green-1">
                {truncate(onChainWallet, 8, true, '.')}.
              </span>
            </>
          }
        />
      ))
    } else if (payRequest?.status === 'failed') {
      toast.custom(() => (
        <ToastError
          key="withdraw-error"
          message="Withdrawal Error"
          description="Something went wrong"
        />
      ))
    }
    setDone()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    payRequest?.status,
    payRequest?.claim_tx,
    isShowSubmittedToast,
    onChainWallet,
  ])

  const wallets = [
    {
      icon: <Icon icon="cryptocurrency-color:sol" />,
      address: '0xE4eb4BbcB01247638F7D7d664F7b771F406A411a',
      amount: '$12,673 (23BTC)',
    },
    {
      icon: <Icon icon="cryptocurrency-color:sol" />,
      address: 'baddeed.eth',
      amount: '$12,673 (23BTC)',
    },
  ]

  const keepPopover = isShowingReminder || isShowingPulicKeyWithdraw

  const onSelectWithdrawOption = useCallback(
    (id: WithdrawOption['id'], handler: WithdrawOption['handler']) => () => {
      setOption({
        id,
        handler,
      })
      showReminder()
    },
    [showReminder],
  )

  return (
    <>
      {isDone && (
        <div className="flex flex-col gap-y-2">
          <button
            className={button({
              appearance: 'secondary',
            })}
          >
            <div>Back to Home page</div>
          </button>
          <ConnectSocialButton />
        </div>
      )}

      {!isDone && (
        <Popover className="relative">
          <Float
            as="div"
            floatingAs={Fragment}
            className="relative"
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
            placement="bottom"
            offset={8}
            show={keepPopover ? true : undefined}
          >
            <Popover.Button
              type="button"
              className={button({
                appearance: 'secondary',
                className: 'w-full',
              })}
            >
              <Icon icon="jam:arrow-square-down-f" />
              <div>Withdraw</div>
            </Popover.Button>
            <div className="w-full">
              <Popover.Panel className="z-40 rounded-lg bg-white-pure shadow-full">
                <div className="flex flex-col gap-y-2 p-3 md:gap-y-4">
                  <div className="hidden text-left">
                    <div className="text-sm font-semibold">Login & Claim</div>
                    <div className="text-xs font-medium text-dashboard-gray-8">
                      You need to connect your existing account to claim
                    </div>
                  </div>
                  <div className="hidden">
                    <SocialButtons />
                  </div>

                  <hr className="hidden w-full bg-black" />

                  {/* list wallet */}
                  {/* {wallets.map(({ address, icon, amount }, idx) => ( */}
                  {/*   <DropdownButton */}
                  {/*     key={idx} */}
                  {/*     title={truncate(address, 12, true, '.')} */}
                  {/*     description={amount} */}
                  {/*     icon={icon} */}
                  {/*   /> */}
                  {/* ))} */}
                  <DropdownButton
                    title="Connect Wallet (coming soon)"
                    description="Connect to an existing crypto wallet"
                    icon={
                      <Icon icon="material-symbols:account-balance-wallet" />
                    }
                    wip
                  />

                  <hr className="w-full bg-black" />

                  <DropdownButton
                    title="Claim to public key"
                    description="Claim to a wallet address you specify"
                    icon={<Icon icon="tabler:circle-key-filled" />}
                    onClick={onSelectWithdrawOption(
                      'public-key',
                      showPublicKeyWithdraw,
                    )}
                  />
                </div>
              </Popover.Panel>
            </div>
          </Float>
        </Popover>
      )}

      <Modal isOpen={isShowingReminder} onClose={hideReminder}>
        <div className="flex flex-col items-center py-4 px-5 max-w-sm bg-white rounded-xl">
          <span className="text-lg font-semibold">Reminder</span>
          <span className="mt-2 font-light text-center text-dashboard-gray-8">
            For the safety of your funds, the network you selected is{' '}
            <span className="font-semibold">
              {payRequest?.token.chain.symbol.toUpperCase() || '???'}
            </span>
            , please confirm that your withdrawal address supports the{' '}
            <span className="font-semibold">
              {payRequest?.token.chain.symbol.toUpperCase() || '???'}
            </span>{' '}
            chain network.
          </span>
          <div className="flex gap-x-2 self-stretch mt-5">
            <button
              type="button"
              className={button({
                appearance: 'secondary',
                className: 'flex-1',
              })}
              onClick={() => {
                hideReminder()
                option.handler?.()
              }}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={hideReminder}
              className={button({
                appearance: 'primary',
                className: 'flex-1',
              })}
            >
              No
            </button>
          </div>
        </div>
      </Modal>
      <Modal isOpen={isShowingPulicKeyWithdraw} onClose={hidePublicKeyWithdraw}>
        <WalletAddressForm
          onSubmit={handleWithdrawOnChain}
          onCancel={hidePublicKeyWithdraw}
        />
      </Modal>
    </>
  )
}
