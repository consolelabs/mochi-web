import React, { useMemo } from 'react'
import { useAccount } from '~hooks/wallets/useAccount'
import { useEns } from '~hooks/wallets/useEns'

interface Props extends React.HTMLProps<HTMLImageElement> {}

export default function Avatar(props: Props) {
  const { address } = useAccount()
  const { ensAvatar, ensName } = useEns(address)

  const src = useMemo(() => {
    return (
      ensAvatar ??
      `https://source.boringavatars.com/beam/120/${
        ensName ?? address
      }?colors=665c52,74b3a7,a3ccaf,E6E1CF,CC5B14`
    )
  }, [address, ensAvatar, ensName])

  return <img {...props} alt="user's avatar" src={src} />
}
