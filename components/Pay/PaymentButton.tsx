import { useDisclosure } from '@dwarvesf/react-hooks'
import { Icon } from '@iconify/react'
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { button } from '~components/Dashboard/Button'
import Modal from '~components/Modal'
import { toast } from 'sonner'
import ConnectSocialButton from './ConnectSocialButton'
import WalletAddressForm from './WalletAddressForm'
import ToastSuccess from '~components/Toast/ToastSuccess'
import { truncate } from '@dwarvesf/react-utils'
import { Popover } from '@headlessui/react'
import SocialButtons from './components/SocialButtons'
import { Float } from '@headlessui-float/react'
import ToastLoading from '~components/Toast/ToastLoading'
import { API, GET_PATHS } from '~constants/api'
import ToastError from '~components/Toast/ToastError'
import { useAppWalletContext } from '~context/wallet-context'
import { useAuthStore, useProfileStore } from '~store'
import { mainnet, useSwitchNetwork } from 'wagmi'
import useSWR from 'swr'
import { ViewProfile } from '~types/mochi-profile-schema'
import { DropdownButton } from './DropdownButton'
import { WalletButton } from './WalletButton'
import { shallow } from 'zustand/shallow'
import { usePayRequest } from '~store/pay-request'
import { utils } from 'ethers'
import { useSendEVMToken } from '~hooks/wallets/useSendEVMToken'

type PayOption = {
  id: 'none' | 'mochi-wallet' | 'public-key' | `${string}-${string}`
  handler?: (args?: any) => void
  args?: any
}

type Props = {
  isDone: boolean
  setDone: () => void
  refresh: () => void
  isPayMe?: boolean
}

const chains: Record<string, { image: string; symbol: string }> = {
  evm: {
    image: '/assets/eth-icon.png',
    symbol: mainnet.nativeCurrency.symbol,
  },
  solana: {
    image: '/assets/sol-icon.png',
    symbol: 'SOL',
  },
}

function convertWallets(profile?: ViewProfile | null) {
  const walletAccounts = profile?.associated_accounts?.filter((aa) =>
    aa.platform?.endsWith('chain'),
  )

  return walletAccounts
    ?.map((wa) => {
      const type = (wa.platform?.split('-')[0] ?? '').toLowerCase()

      return {
        type,
        address: (wa.platform_identifier ?? '') as `0x${string}`,
        ...chains[type],
      }
    })
    .filter((w) => w.address)
}

export default function PaymentButton({
  isDone,
  setDone,
  refresh,
  isPayMe = false,
}: Props) {
  const {
    payAmountFormatted,
    payProfileId,
    payCode,
    status,
    claimTx,
    chainSymbol,
    chainExplorer,
    chainId,
    isNative,
  } = usePayRequest(
    (s) => ({
      payAmountFormatted: `${utils.formatUnits(
        s.payRequest.amount,
        s.payRequest.token.decimal,
      )} ${s.payRequest.token.symbol}`,
      payProfileId: s.payRequest.profile_id,
      payCode: s.payRequest.code,
      claimTx: s.payRequest.claim_tx,
      status: s.payRequest.status,
      chainSymbol: s.payRequest.token.chain.symbol,
      chainExplorer: s.payRequest.token.chain.explorer,
      chainId: Number(s.payRequest.token.chain.chain_id),
      isNative: s.payRequest.token.native,
    }),
    shallow,
  )
  const debounceRef = useRef<number>()
  const { setConfig, sendNative, sendNonNative, wrongChain } = useSendEVMToken()
  const {
    showConnectModal,
    closeConnectModal,
    isShowConnectModal,
    disconnect,
  } = useAppWalletContext()

  const { switchNetworkAsync } = useSwitchNetwork({
    chainId,
  })

  const { data: recipientWallets } = useSWR(
    GET_PATHS.PROFILE_ID(payProfileId),
    async (url) => {
      const profile = await API.MOCHI_PROFILE.get(url)
        .notFound(() => null)
        .internalError(() => null)
        .json((r) => r)

      return convertWallets(profile)
    },
  )

  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)
  const wallets = useProfileStore((s) => convertWallets(s.me), shallow)

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

  const [option, setOption] = useState<PayOption>({
    id: 'none',
  })

  const { isOpen: isShowSubmittedToast, onOpen: showSubmittedToast } =
    useDisclosure()

  const [toastId, setToastId] = useState<number>()

  const handleWithdraw = useCallback(
    async (values: { walletAddress: string }) => {
      if (payCode) {
        toast.custom(
          (t) => {
            setToastId(t)
            API.MOCHI_PAY.json({
              public_key: values.walletAddress,
            })
              .url(`/pay-requests/${payCode}/claim/onchain`)
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
    [hidePublicKeyWithdraw, payCode, refresh],
  )

  const handlePreparePay = useCallback(
    async (config: any) => {
      setConfig(config)
    },
    [setConfig],
  )

  const keepPopover =
    isShowingReminder || isShowingPulicKeyWithdraw || isShowConnectModal

  const onSelectPayOption = useCallback(
    (payOtps: PayOption) => (args: any) => {
      setOption({
        ...payOtps,
        handler: payOtps.handler?.bind(payOtps.handler, args),
        args,
      })
      showReminder()
    },
    [showReminder],
  )

  useEffect(() => {
    window.clearTimeout(debounceRef.current)
    debounceRef.current = window.setTimeout(async () => {
      const pay = isNative ? sendNative : sendNonNative
      if (!pay || !switchNetworkAsync) return

      toast.custom(
        (t) => {
          setToastId(t)
          closeConnectModal()
          pay()
            .then((sendTx) => {
              toast.custom(() => {
                toast.dismiss(toastId)
                sendTx.wait().then((tx) => {
                  toast.custom(() => (
                    <ToastSuccess
                      message="Payment Successful!"
                      description={
                        <>
                          You&#39;ve successfully paid to wallet{' '}
                          <span className="font-bold text-dashboard-green-1">
                            {truncate(tx.to, 8, true, '.')}.
                          </span>
                        </>
                      }
                    />
                  ))
                })

                return (
                  <ToastSuccess
                    message="Request submitted"
                    description={
                      <>
                        Track the transaction{' '}
                        <a
                          className="underline"
                          href={`${new URL(chainExplorer).origin}/tx/${
                            sendTx.hash
                          }`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          here
                        </a>
                      </>
                    }
                  />
                )
              })
            })
            .catch(() => {
              toast.dismiss(toastId)

              toast.custom(() => (
                <ToastError
                  key="pay-error"
                  message="Pay Error"
                  description="User rejected request"
                />
              ))
            })
            .finally(() => {
              disconnect()
              setConfig({})
            })
          return <ToastLoading text="Processing your pay request..." />
        },
        { duration: Infinity },
      )
    }, 400)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendNative, sendNonNative, isNative])

  useEffect(() => {
    if (wrongChain) {
      switchNetworkAsync?.().catch(disconnect)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wrongChain])

  useEffect(() => {
    if (!onChainWallet || isPayMe) return
    if (claimTx && !isShowSubmittedToast) {
      toast.custom(
        () => {
          toast.dismiss(toastId)
          setTimeout(showSubmittedToast, 3000)
          return (
            <ToastSuccess
              message="Request submitted"
              description={
                <>
                  Track the transaction{' '}
                  <a
                    className="underline"
                    href={`${new URL(chainExplorer).origin}/tx/${claimTx}`}
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
    if (status === 'claimed') {
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
    } else if (status === 'failed') {
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
  }, [status, claimTx, isShowSubmittedToast, onChainWallet])

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
              {isPayMe ? (
                <>
                  <Icon icon="jam:arrow-square-up-f" />
                  <div>Pay</div>
                </>
              ) : (
                <>
                  <Icon icon="jam:arrow-square-down-f" />
                  <div>Withdraw</div>
                </>
              )}
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

                  {isLoggedIn &&
                  ((!isPayMe && wallets?.length) ||
                    (isPayMe && recipientWallets?.length)) ? (
                    (isPayMe ? recipientWallets : wallets)?.map((w) => {
                      return (
                        <WalletButton
                          key={`wallet-dropdown-option-${w.address}-${w.type}`}
                          {...w}
                          onClick={onSelectPayOption({
                            id: `${w.type}-${w.address}`,
                            handler: isPayMe
                              ? handlePreparePay
                              : handleWithdraw,
                          })}
                        />
                      )
                    })
                  ) : (
                    <DropdownButton
                      title="Connect Wallet"
                      description="Connect to an existing crypto wallet"
                      icon={
                        <Icon icon="material-symbols:account-balance-wallet" />
                      }
                      onClick={showConnectModal}
                    />
                  )}

                  {!isPayMe ? (
                    <>
                      <hr className="w-full bg-black" />
                      <DropdownButton
                        title="Claim to a crypto wallet"
                        description="Claim to a wallet address you specify"
                        icon={<Icon icon="tabler:circle-key-filled" />}
                        onClick={onSelectPayOption({
                          id: 'public-key',
                          handler: showPublicKeyWithdraw,
                        })}
                      />
                    </>
                  ) : null}
                </div>
              </Popover.Panel>
            </div>
          </Float>
        </Popover>
      )}

      <Modal isOpen={isShowingPulicKeyWithdraw} onClose={hidePublicKeyWithdraw}>
        <WalletAddressForm
          onSubmit={handleWithdraw}
          onCancel={hidePublicKeyWithdraw}
        />
      </Modal>
      <Modal isOpen={isShowingReminder} onClose={hideReminder}>
        <div className="flex flex-col items-center py-4 px-5 max-w-sm bg-white rounded-xl">
          <span className="text-lg font-semibold">Reminder</span>
          {!isPayMe ? (
            <>
              <span className="mt-2 font-light text-center text-dashboard-gray-8">
                For the safety of your funds, the network you selected is{' '}
                <span className="font-semibold">
                  {chainSymbol.toUpperCase() || '???'}
                </span>
                , please confirm that your{' '}
                <span className="font-semibold">withdrawal address</span>{' '}
                supports the{' '}
                <span className="font-semibold">
                  {chainSymbol.toUpperCase() || '???'}
                </span>{' '}
                chain network.
              </span>
            </>
          ) : (
            <>
              <span className="mt-2 font-light text-center text-dashboard-gray-8">
                You&apos;re sending{' '}
                <span className="font-semibold">{payAmountFormatted}</span> to{' '}
                <span className="font-semibold break-all">
                  {truncate(
                    isNative
                      ? option.args?.request?.to ?? ''
                      : option.args?.args[0] ?? '',
                    8,
                    true,
                    '.',
                  )}
                </span>
                , please confirm that you and the recipient are on the{' '}
                <span className="font-semibold">
                  {chainSymbol.toUpperCase() || '???'}
                </span>{' '}
                chain network before proceeding.
              </span>
            </>
          )}
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
    </>
  )
}
