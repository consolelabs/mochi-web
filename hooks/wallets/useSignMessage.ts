import { useSigner, useAccount as useWagmiAccount } from 'wagmi'
import { useWallet } from '@solana/wallet-adapter-react'
import { utils } from 'ethers'
import { useCallback } from 'react'
import { useAppWalletContext } from '~context/wallet-context'

function noop() {
  return ''
}

export const useSignMessage = (messageToSign: string) => {
  const { openInApp } = useAppWalletContext()
  const { data: signer } = useSigner()
  const { connector } = useWagmiAccount()
  const { connected: isSolanaConnected, signMessage } = useWallet()

  const signEVM = useCallback(async () => {
    const provider = await connector?.getProvider()
    if (provider?.connector?.uri) {
      openInApp(provider.connector.uri)
    }
    const signature = await signer?.signMessage(messageToSign)
    return signature
  }, [connector, messageToSign, openInApp, signer])

  const signSOL = useCallback(async () => {
    const messageEncoded = new TextEncoder().encode(messageToSign)

    const signature = await signMessage?.(messageEncoded)

    return utils.base58.encode(signature as any)
  }, [messageToSign, signMessage])

  if ((isSolanaConnected && !signMessage) || (!isSolanaConnected && !signer))
    return noop

  return isSolanaConnected ? signSOL : signEVM
}
