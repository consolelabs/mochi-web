import { create } from 'zustand'
import { API, GET_PATHS } from '~constants/api'
import { Response } from '~types/api'
import { ViewUserDiscordGuilds } from '~types/schema'

type State = {
  getServerList: () => Promise<Response<ViewUserDiscordGuilds>>
}

export const useDashboardStore = create<State>((set, get) => ({
  getServerList: async () => {
    return API.MOCHI_PROFILE.get(GET_PATHS.DISCORD_SERVERS).res((res) =>
      res.json(),
    )
  },
}))
