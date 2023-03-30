import React, { useMemo } from 'react'
import { shallow } from 'zustand/shallow'
import { useEns } from '~hooks/wallets/useEns'
import { useProfileStore } from '~store'

interface Props extends React.HTMLProps<HTMLImageElement> {}

export default function Avatar(props: Props) {
  const { name, avatar } = useProfileStore(
    (s) => ({ name: s.me?.profile_name, avatar: s.me?.avatar }),
    shallow,
  )
  const { ensAvatar, ensName } = useEns(name ?? '')

  const src = useMemo(() => {
    return (
      (avatar || ensAvatar) ??
      `https://source.boringavatars.com/beam/120/${
        ensName ?? name
      }?colors=665c52,74b3a7,a3ccaf,E6E1CF,CC5B14`
    )
  }, [avatar, ensAvatar, ensName, name])

  return <img {...props} alt="user's avatar" src={src} />
}
