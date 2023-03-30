import { create } from 'zustand'
import { API, GET_PATHS } from '~constants/api'
import { Pagination } from '~types/api'
import {
  ViewActivityResponseData,
  ViewProfile,
} from '~types/mochi-profile-schema'
import { isSolAddress } from '~utils/sol'
import { utils } from 'ethers'

type State = {
  me: ViewProfile | null
  setMe: (me: ViewProfile) => void
  shouldTruncateAddress: boolean
  getActivites: (query: Pagination) => Promise<ViewActivityResponseData>
  updateActivityReadStatus: (ids: number[]) => void
}

export const useProfileStore = create<State>((set, get) => ({
  me: null,
  shouldTruncateAddress: true,
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
      me.profile_name ??
      evmAcc?.platform_identifier ??
      solAcc?.platform_identifier ??
      other?.platform_identifier ??
      ''

    set({
      me: {
        ...me,
        profile_name,
      },
      shouldTruncateAddress:
        isSolAddress(profile_name) || utils.isAddress(profile_name),
    })
  },

  getActivites: (query) => {
    return API.MOCHI_PROFILE.query(query)
      .get(GET_PATHS.PROFILE_ACTIVITES(get().me?.id || ''))
      .res((res) => res.json())
  },
  updateActivityReadStatus: (ids) => {
    API.MOCHI_PROFILE.put(
      { ids },
      GET_PATHS.PROFILE_ACTIVITES(get().me?.id || ''),
    )
  },
}))
