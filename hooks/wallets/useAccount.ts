import { useWallet } from '@solana/wallet-adapter-react'
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
  disconnect: () => Promise<any>
}

export const useAccount = (): Account => {
  const { address: addressEVM, isConnected: isEVMConnected } = useWagmiAccount()
  const { disconnectAsync: disconnectEVM } = useDisconnect()

  const {
    connected: isSolanaConnected,
    publicKey,
    disconnect: disconnectSOL,
    select,
  } = useWallet()
  const addressSOL = publicKey?.toBase58()

  const [activeAddress, setActiveAddress] = useState(
    addressSOL ?? addressEVM ?? '',
  )

  useEffect(() => {
    setActiveAddress(addressEVM ?? '')
    if (addressEVM) {
      disconnectSOL()
    }
  }, [addressEVM, disconnectSOL])

  useEffect(() => {
    setActiveAddress(addressSOL ?? '')
    if (addressSOL) {
      disconnectEVM()
    }
  }, [addressSOL, disconnectEVM])

  const disconnect = useCallback(async () => {
    select(null)
    setActiveAddress('')
    return await Promise.allSettled([disconnectEVM(), disconnectSOL()])
  }, [disconnectEVM, disconnectSOL, select])

  return {
    isEVMConnected,
    isSolanaConnected,
    address: activeAddress,
    disconnect,
  }
}
