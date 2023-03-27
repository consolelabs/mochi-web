import { create } from 'zustand'
import { ViewProfile } from '~types/mochi-profile-schema'

type State = {
  me: ViewProfile | null
  setMe: (me: ViewProfile) => void
}

export const useProfileStore = create<State>((set) => ({
  me: null,
  setMe: (me: ViewProfile) => {
    const evmAcc = me.associated_accounts?.find(
      (aa: any) => aa.platform === 'evm-chain',
    )
    // do the same with solana
    const solAcc = me.associated_accounts?.find(
      (aa: any) => aa.platform === 'solana-chain',
    )
    // probably social accounts
    const other = me.associated_accounts?.[0]

    // priority evm > sol > socials
    const profile_name =
      evmAcc?.platform_identifier ??
      solAcc?.platform_identifier ??
      other?.platform_identifier ??
      ''

    set({
      me: {
        ...me,
        profile_name,
      },
    })
  },
}))
