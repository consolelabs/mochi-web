import React, { ReactNode } from 'react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { getDefaultWallets } from './getDefaultWallets'

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [publicProvider()],
)

const { connectors } = getDefaultWallets({
  appName: 'Mochi',
  chains,
})

const client = createClient({
  autoConnect: true,
  provider,
  connectors,
})

export type EVMWalletProviderProps = {
  children: ReactNode
}

export const EVMWalletProvider = ({ children }: EVMWalletProviderProps) => {
  return <WagmiConfig client={client}>{children}</WagmiConfig>
}
