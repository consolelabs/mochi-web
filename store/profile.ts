import { create } from 'zustand'
import { API, GET_PATHS } from '~constants/api'
import { Pagination } from '~types/api'
import {
  ViewActivityResponseData,
  ViewProfile,
} from '~types/mochi-profile-schema'
import { api, UI } from '~constants/mochi'
import { Platform } from '@consolelabs/mochi-ui'
import { boringAvatar } from '~utils/string'

type State = {
  me: ViewProfile | null
  setMe: (me: ViewProfile) => Promise<void>
  wallets: any
  getActivites: (query: Pagination) => Promise<ViewActivityResponseData>
  updateActivityReadStatus: (ids: number[]) => void
}

export const useProfileStore = create<State>((set, get) => ({
  me: null,
  setMe: async (me: ViewProfile) => {
    const [p] = await UI.resolve(Platform.Web, me.id ?? '')
    const { ok, data } = await api.pay.mochiWallet.getWallets(me.id ?? '')
    let wallets: any[] = []
    if (ok) {
      wallets = data
    }

    const avatar = me.avatar || boringAvatar(p?.plain)

    set({
      me: {
        ...me,
        profile_name: p?.plain ?? '',
        avatar,
      },
      wallets,
    })
  },
  wallets: null,

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
