import { useConnection } from '@solana/wallet-adapter-react'
import { utils, BigNumber } from 'ethers'
import useSWR from 'swr'
import { PublicKey } from '@solana/web3.js'
import { solanaChain } from 'context/wallets/solana/chains'

const FETCH_SOL_BALANCE_KEY = 'sol-balance'

export const useSolanaBalance = (publicKey?: PublicKey | null) => {
  const { connection } = useConnection()

  const { data } = useSWR(
    publicKey ? [FETCH_SOL_BALANCE_KEY, publicKey.toBase58()] : null,
    (_, base58: string) => connection.getBalance(new PublicKey(base58)),
  )

  return {
    value: BigNumber.from(data ?? 0),
    formatted: utils.formatUnits(
      BigNumber.from(data ?? 0),
      solanaChain.nativeCurrency?.decimals,
    ),
    symbol: solanaChain.nativeCurrency!.symbol,
    decimals: solanaChain.nativeCurrency!.decimals,
  }
}
