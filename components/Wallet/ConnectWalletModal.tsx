import { Dialog, Transition } from '@headlessui/react'
import { useWallet } from '@solana/wallet-adapter-react'
import { Fragment, useCallback, useEffect, useMemo, useReducer } from 'react'
import { ConnectorAlreadyConnectedError } from 'wagmi'
import { heading } from '~components/Dashboard/Heading'
import {
  useWalletConnectors,
  WalletConnector,
} from '~context/wallets/useWalletConnectors'
import { ConnectDetail } from './ConnectDetail'
import { ConnectWalletIntro } from './ConnectWalletIntro'

type Props = {
  isOpen: boolean
  onOpen?: () => void
  onClose: () => void
}

enum WalletStep {
  None = 'NONE',
  Get = 'GET',
  Connect = 'CONNECT',
  Download = 'DOWNLOAD',
  Instructions = 'INSTRUCTIONS',
}

type State = {
  selectedWallet?: WalletConnector
  qrCodeUri?: string
  isConnectionError: boolean
  selectedOptionId?: string
  walletStep: WalletStep
  initialWalletStep: WalletStep
}

export default function ConnectWalletModal({ isOpen, onClose }: Props) {
  const [state, setState] = useReducer(
    (prevState: State, action: Partial<State>) => {
      return {
        ...prevState,
        ...action,
      }
    },
    {
      initialWalletStep: WalletStep.None,
      walletStep: WalletStep.None,
      isConnectionError: false,
    },
  )
  const { wallets, groupedWallets } = useWalletConnectors()
  const { wallet: solWallet } = useWallet()

  const filteredWallets = wallets.filter(
    (wallet) => wallet.ready || wallet.downloadUrls?.browserExtension,
  )

  const connectToWallet = useCallback(
    async (wallet: WalletConnector) => {
      setState({
        isConnectionError: false,
      })
      if (wallet.ready) {
        if (wallet.isSolana) {
          wallet?.connect?.()
        } else {
          ; (wallet?.connect?.() as Promise<any>).catch((e) => {
            if (e instanceof ConnectorAlreadyConnectedError) {
              onClose()
            } else {
              setState({
                isConnectionError: true,
              })
            }
          })
        }

        const getDesktopDeepLink = wallet.desktop?.getUri
        if (getDesktopDeepLink) {
          // if desktop deep link, wait for uri
          setTimeout(async () => {
            const uri = await getDesktopDeepLink()
            window.open(uri, false ? '_blank' : '_self')
          }, 0)
        }
      }
    },
    [setState, onClose],
  )

  const changeWalletStep = (
    newWalletStep: WalletStep,
    isBack: boolean = false,
  ) => {
    if (
      isBack &&
      newWalletStep === WalletStep.Get &&
      state.initialWalletStep === WalletStep.Get
    ) {
      setState({
        selectedOptionId: undefined,
        selectedWallet: undefined,
        qrCodeUri: undefined,
      })
    } else if (!isBack && newWalletStep === WalletStep.Get) {
      setState({
        initialWalletStep: WalletStep.Get,
      })
    } else if (!isBack && newWalletStep === WalletStep.Connect) {
      setState({
        initialWalletStep: WalletStep.Connect,
      })
    }
    setState({
      walletStep: newWalletStep,
    })
  }

  const onSelectWallet = async (wallet: WalletConnector) => {
    setState({
      selectedOptionId: wallet.id,
    })
    connectToWallet(wallet)

    if (wallet.ready) {
      const sWallet = filteredWallets.find((w) => wallet.id === w.id)

      if (wallet.isSolana) {
        setState({
          selectedWallet: sWallet,
        })
        changeWalletStep(WalletStep.Connect)
      }
      if (!wallet.isSolana) {
        // We need to guard against "onConnecting" callbacks being fired
        // multiple times since connector instances can be shared between
        // wallets. Ideally wagmi would let us scope the callback to the
        // specific "connect" call, but this will work in the meantime.
        let callbackFired = false
        wallet.onConnecting(async () => {
          if (callbackFired) return
          callbackFired = true
          const uri = await sWallet?.qrCode?.getUri()
          setState({
            qrCodeUri: uri,
            selectedWallet: sWallet,
          })
          changeWalletStep(WalletStep.Connect)
        })
      }
    } else {
      setState({
        selectedWallet: wallet,
      })
      changeWalletStep(WalletStep.Connect)
    }
  }

  const walletContent = useMemo(() => {
    switch (state.walletStep) {
      case WalletStep.None:
        return <ConnectWalletIntro />
      case WalletStep.Connect:
        return state.selectedWallet ? (
          <ConnectDetail
            connectionError={state.isConnectionError}
            qrCodeUri={state.qrCodeUri}
            reconnect={connectToWallet}
            wallet={state.selectedWallet}
          />
        ) : null
      default:
        return null
    }
  }, [
    connectToWallet,
    state.isConnectionError,
    state.qrCodeUri,
    state.selectedWallet,
    state.walletStep,
  ])

  useEffect(() => {
    setState({
      isConnectionError: false,
    })
  }, [state.walletStep, state.selectedWallet])

  useEffect(() => {
    const handleError = () => {
      setState({
        isConnectionError: true,
      })
    }

    if (solWallet && solWallet.adapter) {
      solWallet.adapter.on('error', handleError)
      return () => {
        solWallet.adapter.off('error', handleError)
      }
    }
  }, [solWallet])

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        open={isOpen}
        onClose={onClose}
        className="relative z-10"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>
        <div className="fixed inset-0">
          <div className="flex justify-center items-center w-full min-h-full">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex mx-auto bg-white rounded-lg shadow-lg">
                <div className="flex flex-col flex-shrink-0 p-5 border-r border-dashboard-gray-3">
                  <h1
                    className={heading({
                      size: 'sm',
                      className: 'whitespace-nowrap',
                    })}
                  >
                    Choose your wallet
                  </h1>
                  <div className="flex flex-col gap-y-5 mt-5">
                    {Object.entries(groupedWallets).map(
                      ([groupName, connectors]) => {
                        return (
                          <div
                            key={`connect-wallet-group-${groupName}`}
                            className="flex flex-col gap-y-2"
                          >
                            <span className="text-xs font-semibold text-dashboard-gray-4">
                              {groupName}
                            </span>
                            <div className="flex flex-col gap-y-1">
                              {connectors.map((c) => {
                                return (
                                  <button
                                    onClick={() => onSelectWallet(c)}
                                    type="button"
                                    className="flex gap-x-2 items-center p-2 rounded-md hover:bg-dashboard-gray-3"
                                    key={`connect-wallet-connector-${c.id}`}
                                  >
                                    <img
                                      className="w-6"
                                      src={c.iconUrl}
                                      alt=""
                                    />
                                    <span className="text-sm font-medium text-foreground">
                                      {c.name}
                                    </span>
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        )
                      },
                    )}
                  </div>
                </div>
                <div className="flex-1 p-5 min-w-[500px]">{walletContent}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
