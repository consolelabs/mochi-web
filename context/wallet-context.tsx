import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { SolanaWalletProvider } from 'context/wallets/solana/SolanaWalletProvider'
import { EVMWalletProvider } from 'context/wallets/ethereum/EVMWalletProvider'
import { useNetwork } from 'wagmi'
import { createContext } from '@dwarvesf/react-utils'
import { Chain } from './wallets/Wallet'
import { decorateChains } from './wallets/ethereum/chains'
import { solanaChain } from './wallets/solana/chains'
import { useAccount } from '~hooks/wallets/useAccount'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { useAuthStore } from '~store'

export type WalletProviderProps = {
  children: ReactNode
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  return (
    <EVMWalletProvider>
      <SolanaWalletProvider>
        <AppWalletContextProvider>{children}</AppWalletContextProvider>
      </SolanaWalletProvider>
    </EVMWalletProvider>
  )
}

export type Blockchain = 'EVM' | 'SOL'

type ConnectCallback = (data: {
  signature: string
  code: string
  address: string
  msg: string
  isEVM: boolean
}) => Promise<void>

export interface AppWalletContextValues {
  blockchain: Blockchain | null
  connected: boolean
  disconnect: () => Promise<any>
  chains: Chain[]
  initialChainId?: number
  getChainById: (id: number) => Chain | undefined
  openInApp: (wcUrl: string) => void
  isShowConnectModal: boolean
  showConnectModal: (cb?: ConnectCallback) => void
  closeConnectModal: () => void
  /** Do not use this outside of <ConnectWalletModal /> */
  connectModalCallback?: ConnectCallback
}

const [Provider, useAppWalletContext] = createContext<AppWalletContextValues>()

export type AppWalletContextProviderProps = {
  children: ReactNode
}

export const AppWalletContextProvider = ({
  children,
}: AppWalletContextProviderProps) => {
  // EVM
  const { chains } = useNetwork()
  const decoratedChains = decorateChains(chains)

  const { isEVMConnected, isSolanaConnected, disconnect } = useAccount()

  const connected = isEVMConnected || isSolanaConnected

  const blockchain = useMemo(() => {
    if (isEVMConnected) return 'EVM'
    if (isSolanaConnected) return 'SOL'
    return null
  }, [isEVMConnected, isSolanaConnected])

  const getChainById = useCallback(
    (id: number) => {
      return decoratedChains.find((chain) => chain.id === id)
    },
    [decoratedChains],
  )

  const openInApp = useCallback((wcUrl: string) => {
    const a = document.createElement('a')
    a.href = wcUrl
    a.rel = 'noreferrer noopener'
    a.click()
  }, [])

  const {
    isOpen: isShowConnectModal,
    onOpen: _showConnectModal,
    onClose: closeConnectModal,
  } = useDisclosure()

  const [connectModalCallback, setConnectModalCallback] =
    useState<ConnectCallback>()

  const showConnectModal = useCallback(
    (cb?: ConnectCallback) => {
      setConnectModalCallback(() => cb)
      _showConnectModal()
    },
    [_showConnectModal],
  )

  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)

  useEffect(() => {
    if (isLoggedIn) {
      closeConnectModal()
    }
  }, [closeConnectModal, isLoggedIn])

  return (
    <Provider
      value={{
        isShowConnectModal,
        showConnectModal,
        closeConnectModal,
        connectModalCallback,
        blockchain,
        connected,
        disconnect,
        chains: [...decoratedChains, solanaChain],
        initialChainId: chains.length > 0 ? chains[0].id : undefined,
        getChainById,
        openInApp,
      }}
    >
      {children}
    </Provider>
  )
}

export { useAppWalletContext }
