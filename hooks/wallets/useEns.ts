import { useEnsAvatar, useEnsName } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { useAppWalletContext } from 'context/wallet-context'
import { isSSR } from '@dwarvesf/react-utils'

export const useEns = (address?: string) => {
  const { chains } = useAppWalletContext()
  const hasMainnet = chains.some((c) => c.id === mainnet.id)

  const { data: ensName } = useEnsName({
    address: address as `0x${string}`,
    chainId: mainnet.id,
    enabled: hasMainnet && !isSSR(),
  })

  const { data: ensAvatar } = useEnsAvatar({
    address: address as `0x${string}`,
    chainId: mainnet.id,
    enabled: hasMainnet && !isSSR(),
  })

  return {
    ensName,
    ensAvatar,
  }
}
