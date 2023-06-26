import { useWallet as useSolWallet } from '@solana/wallet-adapter-react'
import { useWallet as useSuiWallet } from '@suiet/wallet-kit'
import { BigNumber } from 'ethers'
import { useAccount as useWagmiAccount, useDisconnect } from 'wagmi'
import { useCallback, useEffect, useState } from 'react'

export interface Account {
  address?: string
  symbol?: string
  displayBalance?: string
  decimals?: number
  value?: BigNumber
  isEVMConnected: boolean
  isSolanaConnected: boolean
  isSuiConnected: boolean
  disconnect: () => Promise<any>
}

export const useAccount = (): Account => {
  const {
    address: addressSui,
    disconnect: disconnectSui,
    connected: isSuiConnected,
  } = useSuiWallet()

  const { address: addressEVM, isConnected: isEVMConnected } = useWagmiAccount()
  const { disconnectAsync: disconnectEVM } = useDisconnect()

  const {
    connected: isSolanaConnected,
    publicKey,
    disconnect: disconnectSOL,
    select,
  } = useSolWallet()
  const addressSOL = publicKey?.toBase58()

  const [activeAddress, setActiveAddress] = useState(
    addressSOL ?? addressEVM ?? '',
  )

  useEffect(() => {
    setActiveAddress(addressEVM ?? '')
    if (addressEVM) {
      disconnectSOL()
      disconnectSui()
    }
  }, [addressEVM, disconnectSOL, disconnectSui])

  useEffect(() => {
    setActiveAddress(addressSOL ?? '')
    if (addressSOL) {
      disconnectEVM()
      disconnectSui()
    }
  }, [addressSOL, disconnectEVM, disconnectSui])

  useEffect(() => {
    setActiveAddress(addressSui ?? '')
    if (addressSui) {
      disconnectEVM()
      disconnectSOL()
    }
  }, [addressSOL, addressSui, disconnectEVM, disconnectSOL])

  const disconnect = useCallback(async () => {
    select(null)
    setActiveAddress('')
    return await Promise.allSettled([
      disconnectEVM(),
      disconnectSOL(),
      disconnectSui(),
    ])
  }, [disconnectEVM, disconnectSOL, disconnectSui, select])

  return {
    isEVMConnected,
    isSolanaConnected,
    isSuiConnected,
    address: activeAddress,
    disconnect,
  }
}
