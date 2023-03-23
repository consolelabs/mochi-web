import {
  useSignMessage as useWagmiSignMessage,
  useAccount as useWagmiAccount,
} from 'wagmi'
import { useWallet } from '@solana/wallet-adapter-react'
import { utils } from 'ethers'
import { useCallback } from 'react'
import { useAppWalletContext } from '~context/wallet-context'

export const useSignMessage = (messageToSign: string) => {
  const { openInApp } = useAppWalletContext()
  const { signMessageAsync } = useWagmiSignMessage({ message: messageToSign })
  const { connector } = useWagmiAccount()
  const { connected: isSolanaConnected, signMessage } = useWallet()

  const signEVM = useCallback(async () => {
    const provider = await connector?.getProvider()
    if (provider?.connector?.uri) {
      openInApp(provider.connector.uri)
    }
    const signature = await signMessageAsync()
    return signature ?? ''
  }, [connector, openInApp, signMessageAsync])

  const signSOL = useCallback(async () => {
    const messageEncoded = new TextEncoder().encode(messageToSign)

    const signature = await signMessage?.(messageEncoded)

    return utils.base58.encode(signature as any)
  }, [messageToSign, signMessage])

  return isSolanaConnected ? signSOL : signEVM
}
