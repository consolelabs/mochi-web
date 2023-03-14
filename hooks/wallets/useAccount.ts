import { useWallet } from '@solana/wallet-adapter-react'
import { BigNumber } from 'ethers'
import { useAccount as useWagmiAccount, useBalance } from 'wagmi'
import { abbreviateETHBalance } from 'utils/abbreviateETHBalance'
import { useSolanaBalance } from './useSolBalance'

export interface Account {
  address?: string
  symbol?: string
  displayBalance?: string
  decimals?: number
  value?: BigNumber
  isEVMConnected: boolean
  isSolanaConnected: boolean
}

export const useAccount = (): Account => {
  const { address, isConnected } = useWagmiAccount()
  const { data: evmBalanceData } = useBalance({ address })
  const evmDisplayBalance = evmBalanceData
    ? `${abbreviateETHBalance(parseFloat(evmBalanceData.formatted))} ${
        evmBalanceData.symbol
      }`
    : undefined

  const { connected: isSolanaConnected, publicKey, wallet } = useWallet()
  const solBalanceData = useSolanaBalance(publicKey)
  const solDisplayBalance = solBalanceData
    ? `${abbreviateETHBalance(parseFloat(solBalanceData.formatted))} ${
        solBalanceData.symbol
      }`
    : undefined

  return {
    isEVMConnected: !isSolanaConnected && isConnected,
    isSolanaConnected,
    address: isSolanaConnected ? publicKey?.toBase58() : address,
    symbol: isSolanaConnected ? solBalanceData.symbol : evmBalanceData?.symbol,
    displayBalance: isSolanaConnected ? solDisplayBalance : evmDisplayBalance,
    decimals: isSolanaConnected
      ? solBalanceData.decimals
      : evmBalanceData?.decimals,
    value: isSolanaConnected ? solBalanceData.value : evmBalanceData?.value,
  }
}
