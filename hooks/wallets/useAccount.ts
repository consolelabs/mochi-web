import { useWallet } from '@solana/wallet-adapter-react'
import { BigNumber } from 'ethers'
import {
  useAccount as useWagmiAccount,
  // useBalance,
  useDisconnect,
} from 'wagmi'
// import { abbreviateETHBalance } from 'utils/abbreviateETHBalance'
// import { useSolanaBalance } from './useSolBalance'
import { useEffect, useState } from 'react'

export interface Account {
  address?: string
  symbol?: string
  displayBalance?: string
  decimals?: number
  value?: BigNumber
  isEVMConnected: boolean
  isSolanaConnected: boolean
  disconnect: () => void
}

export const useAccount = (): Account => {
  const { address: addressEVM, isConnected: isEVMConnected } = useWagmiAccount()
  const { disconnect: disconnectEVM } = useDisconnect()
  // const { data: evmBalanceData } = useBalance({ address })
  // const evmDisplayBalance = evmBalanceData
  //   ? `${abbreviateETHBalance(parseFloat(evmBalanceData.formatted))} ${
  //       evmBalanceData.symbol
  //     }`
  //   : undefined

  const {
    connected: isSolanaConnected,
    publicKey,
    disconnect: disconnectSOL,
  } = useWallet()
  const addressSOL = publicKey?.toBase58()
  // const solBalanceData = useSolanaBalance(publicKey)
  // const solDisplayBalance = solBalanceData
  //   ? `${abbreviateETHBalance(parseFloat(solBalanceData.formatted))} ${
  //       solBalanceData.symbol
  //     }`
  //   : undefined

  const [activeAddress, setActiveAddress] = useState(
    addressSOL ?? addressEVM ?? '',
  )

  useEffect(() => {
    if (addressEVM) {
      setActiveAddress(addressEVM)
      disconnectSOL()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressEVM])

  useEffect(() => {
    if (addressSOL) {
      setActiveAddress(addressSOL)
      disconnectEVM()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressSOL])

  return {
    isEVMConnected,
    isSolanaConnected,
    address: activeAddress,
    disconnect: () => {
      disconnectEVM()
      disconnectSOL()
    },
    // symbol: isSolanaConnected ? solBalanceData.symbol : evmBalanceData?.symbol,
    // displayBalance: isSolanaConnected ? solDisplayBalance : evmDisplayBalance,
    // decimals: isSolanaConnected
    //   ? solBalanceData.decimals
    //   : evmBalanceData?.decimals,
    // value: isSolanaConnected ? solBalanceData.value : evmBalanceData?.value,
  }
}
