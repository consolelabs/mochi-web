import React, { ReactNode, useCallback, useMemo } from 'react'
import { SolanaWalletProvider } from 'context/wallets/solana/SolanaWalletProvider'
import { EVMWalletProvider } from 'context/wallets/ethereum/EVMWalletProvider'
// Solana
import { useWallet } from '@solana/wallet-adapter-react'
// EVM
import { useAccount, useDisconnect, useNetwork } from 'wagmi'
import { createContext } from '@dwarvesf/react-utils'
import { Chain } from './wallets/Wallet'
import { decorateChains } from './wallets/ethereum/chains'
import { solanaChain } from './wallets/solana/chains'

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

export interface AppWalletContextValues {
  blockchain: Blockchain | null
  connected: boolean
  disconnect: VoidFunction
  chains: Chain[]
  initialChainId?: number
  getChainById: (id: number) => Chain | undefined
}

const [Provider, useAppWalletContext] = createContext<AppWalletContextValues>()

export type AppWalletContextProviderProps = {
  children: ReactNode
}

export const AppWalletContextProvider = ({
  children,
}: AppWalletContextProviderProps) => {
  // EVM
  const { isConnected: evmConnected } = useAccount()
  const { disconnect: evmDisconnect } = useDisconnect()
  const { chains } = useNetwork()
  const decoratedChains = decorateChains(chains)
  // Solana
  const { connected: solConnected, disconnect: solDisconnect } = useWallet()

  const connected = evmConnected || solConnected

  const blockchain = useMemo(() => {
    if (evmConnected) return 'EVM'
    if (solConnected) return 'SOL'
    return null
  }, [evmConnected, solConnected])

  const disconnect = useCallback(() => {
    if (!connected) return

    if (blockchain === 'EVM') {
      evmDisconnect()
    }
    if (blockchain === 'SOL') {
      solDisconnect()
    }
  }, [connected, blockchain, evmDisconnect, solDisconnect])

  const getChainById = useCallback(
    (id: number) => {
      return decoratedChains.find((chain) => chain.id === id)
    },
    [decoratedChains],
  )

  return (
    <Provider
      value={{
        blockchain,
        connected,
        disconnect,
        chains: [...decoratedChains, solanaChain],
        initialChainId: chains.length > 0 ? chains[0].id : undefined,
        getChainById,
      }}
    >
      {children}
    </Provider>
  )
}

export { useAppWalletContext }
