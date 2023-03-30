import {
  useSignMessage as useWagmiSignMessage,
  useAccount as useWagmiAccount,
} from 'wagmi'
import { useWallet } from '@solana/wallet-adapter-react'
import { utils } from 'ethers'
import { useCallback } from 'react'
import { useAppWalletContext } from '~context/wallet-context'
import { useDisclosure } from '@dwarvesf/react-hooks'

export const useSignMessage = () => {
  const { openInApp, disconnect } = useAppWalletContext()
  const { signMessageAsync } = useWagmiSignMessage()
  const { connector } = useWagmiAccount()
  const { connected: isSolanaConnected, signMessage } = useWallet()

  const {
    isOpen: isSigning,
    onOpen: setIsSigning,
    onClose: setIsNotSigning,
  } = useDisclosure()

  const signEVM = useCallback(
    async (message: string) => {
      setIsSigning()
      try {
        const provider = await connector?.getProvider()
        if (provider?.connector?.uri) {
          openInApp(provider.connector.uri)
        }
        const signature = await signMessageAsync({ message })
        return signature ?? ''
      } catch (e) {
        setIsNotSigning()
        disconnect()

        throw e
      }
    },
    [
      connector,
      disconnect,
      openInApp,
      setIsNotSigning,
      setIsSigning,
      signMessageAsync,
    ],
  )

  const signSOL = useCallback(
    async (message: string) => {
      setIsSigning()
      try {
        const messageEncoded = new TextEncoder().encode(message)

        const signature = await signMessage?.(messageEncoded)

        return utils.base58.encode(signature as any)
      } catch (e) {
        setIsNotSigning()
        disconnect()

        throw e
      }
    },
    [disconnect, setIsNotSigning, setIsSigning, signMessage],
  )

  return {
    isSigning,
    signMsg: isSolanaConnected ? signSOL : signEVM,
  }
}
