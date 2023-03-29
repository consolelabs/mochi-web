import { create } from 'zustand'
import { API, GET_PATHS } from '~constants/api'
import { Response } from '~types/api'
import { ViewUserDiscordGuilds } from '~types/mochi-profile-schema'
import {
  ResponseDiscordGuildRole,
  ResponseGetGuildResponse,
  ResponseTopUser,
} from '~types/mochi-schema'

type Pagination = {
  page?: number
  limit?: number
}

type Query = {
  sort?: string
  query?: string
}

type State = {
  getServerList: () => Promise<Response<ViewUserDiscordGuilds>>
  server?: ResponseGetGuildResponse
  roles?: ResponseDiscordGuildRole[]
  getServer: (id: string) => void
  getServerMemberList: (
    query: Query &
      Pagination & { guild_id?: string; user_id?: string; platform?: string },
  ) => Promise<Response<ResponseTopUser>>
}

export const useDashboardStore = create<State>((set) => ({
  getServerList: () => {
    return API.MOCHI_PROFILE.get(GET_PATHS.GUILDS).res((res) => res.json())
  },

  server: undefined,
  roles: undefined,
  getServer: (id: string) => {
    API.MOCHI.get(GET_PATHS.GUILD(id))
      .res((res) => res.json())
      .then((res) => {
        set(() => ({
          server: res,
        }))
      })

    API.MOCHI.get(GET_PATHS.GUILD_ROLES(id))
      .res((res) => res.json())
      .then((res) => {
        set(() => ({
          roles: res.data,
        }))
      })
  },

  getServerMemberList: (query) => {
    return API.MOCHI.query(query)
      .get(GET_PATHS.USERS_TOP)
      .res((res) => res.json())
  },
}))
