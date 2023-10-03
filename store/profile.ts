import { create } from 'zustand'
import { API, GET_PATHS } from '~constants/api'
import { Pagination } from '~types/api'
import {
  ViewActivityResponseData,
  ViewProfile,
} from '~types/mochi-profile-schema'
import { UI } from '~constants/mochi'
import { Platform } from '@consolelabs/mochi-ui'

type State = {
  me: ViewProfile | null
  setMe: (me: ViewProfile) => Promise<void>
  getActivites: (query: Pagination) => Promise<ViewActivityResponseData>
  updateActivityReadStatus: (ids: number[]) => void
}

export const useProfileStore = create<State>((set, get) => ({
  me: null,
  setMe: async (me: ViewProfile) => {
    const [p] = await UI.resolve(Platform.Web, me.id ?? '')

    set({
      me: {
        ...me,
        profile_name: p?.plain,
      },
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
