import { create } from 'zustand'
import { API, GET_PATHS } from '~constants/api'
import { Response } from '~types/api'
import { ViewUserDiscordGuilds } from '~types/mochi-profile-schema'
import {
  DiscordgoMember,
  ResponseGetGuildResponse,
  ResponseTopUser,
} from '~types/mochi-schema'

type State = {
  getServerList: () => Promise<Response<ViewUserDiscordGuilds>>
  // TODO: Use official interfaces from swagger schema of Mochi API
  server?: ResponseGetGuildResponse
  getServer: (id: string) => Promise<void>
  getServerMemberList: (query: any) => Promise<Response<ResponseTopUser>>
}

export const useDashboardStore = create<State>((set, get) => ({
  getServerList: () => {
    return API.MOCHI_PROFILE.get(GET_PATHS.GUILDS).res((res) => res.json())
  },

  server: undefined,
  getServer: (id: string) => {
    return API.MOCHI.get(GET_PATHS.GUILD(id))
      .res((res) => res.json())
      .then((res) => {
        set(() => ({
          server: res,
        }))
      })
  },

  getServerMemberList: (query: any) => {
    return API.MOCHI.query(query)
      .get(GET_PATHS.USERS_TOP)
      .res((res) => res.json())
  },
}))
