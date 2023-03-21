import React, { ReactNode, useMemo } from 'react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import {
  ConnectionProvider,
  WalletProvider as SolWalletProvider,
} from '@solana/wallet-adapter-react'
import { clusterApiUrl } from '@solana/web3.js'
import { getDefaultSolanaWallets } from './getDefaultWallets'

export type SolanaWalletProviderProps = {
  children: ReactNode
}

export const SolanaWalletProvider = ({
  children,
}: SolanaWalletProviderProps) => {
  const network = WalletAdapterNetwork.Devnet
  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  const wallets = useMemo(
    () => getDefaultSolanaWallets(network).adapters,
    [network],
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolWalletProvider autoConnect={false} wallets={wallets}>
        {children}
      </SolWalletProvider>
    </ConnectionProvider>
  )
}
