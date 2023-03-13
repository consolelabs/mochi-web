import { useEnsAvatar, useEnsName } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { useAppWalletContext } from 'context/wallet-context'

export const useEns = (address?: string) => {
  const { chains } = useAppWalletContext()
  const hasMainnet = chains.some((c) => c.id === mainnet.id)

  const { data: ensName } = useEnsName({
    address: address as `0x${string}`,
    chainId: mainnet.id,
    enabled: hasMainnet,
  })

  const { data: ensAvatar } = useEnsAvatar({
    address: address as `0x${string}`,
    chainId: mainnet.id,
    enabled: hasMainnet,
  })

  return {
    ensName,
    ensAvatar,
  }
}
