import { useSigner } from 'wagmi'
import { useWallet } from '@solana/wallet-adapter-react'
import { utils } from 'ethers'
import { useCallback } from 'react'

function noop() {
  return ''
}

export const useSignMessage = (messageToSign: string) => {
  const { data: signer } = useSigner()
  const { connected: isSolanaConnected, signMessage } = useWallet()

  const signEVM = useCallback(async () => {
    const signature = await signer?.signMessage(messageToSign)
    return signature
  }, [messageToSign, signer])

  const signSOL = useCallback(async () => {
    const messageEncoded = new TextEncoder().encode(messageToSign)

    const signature = await signMessage?.(messageEncoded)

    return utils.base58.encode(signature as any)
  }, [messageToSign, signMessage])

  if ((isSolanaConnected && !signMessage) || (!isSolanaConnected && !signer))
    return noop

  return isSolanaConnected ? signSOL : signEVM
}
