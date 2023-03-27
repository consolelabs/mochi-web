import React, { useMemo } from 'react'
import { useEns } from '~hooks/wallets/useEns'
import { useProfileStore } from '~store'

interface Props extends React.HTMLProps<HTMLImageElement> {}

export default function Avatar(props: Props) {
  const profileUsername = useProfileStore((s) => s.me?.profile_name)
  const { ensAvatar, ensName } = useEns(profileUsername ?? '')

  const src = useMemo(() => {
    return (
      ensAvatar ??
      `https://source.boringavatars.com/beam/120/${
        ensName ?? profileUsername
      }?colors=665c52,74b3a7,a3ccaf,E6E1CF,CC5B14`
    )
  }, [ensAvatar, ensName, profileUsername])

  return <img {...props} alt="user's avatar" src={src} />
}
