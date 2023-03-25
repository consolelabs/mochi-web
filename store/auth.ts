import { create } from 'zustand'
import { API, apiLogin, apiLogout } from '~constants/api'
import { ViewProfile } from '~types/mochi-profile-schema'
import { useProfileStore } from './profile'

const STORAGE_KEY = 'mochi.token'

type State = {
  me?: ViewProfile
  token: string | null
  isLoggedIn: boolean
  isLoadingSession: boolean
  getSession: (token?: string) => Promise<void>
  login: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<State>((set, get) => ({
  me: undefined,
  token: null,
  isLoggedIn: false,
  isLoadingSession: true,
  getSession: async (tokenParam?: string) => {
    const { login, logout } = get()
    // on load, try to get token first from storage
    const token = tokenParam ?? localStorage.getItem(STORAGE_KEY)

    // if not found, this user has properly logged out
    if (!token) {
      set({ token: null, isLoggedIn: false, isLoadingSession: false })
    } else {
      // if found, this token could still be outdated or malformed -> try to call the /me api with this token

      set({ isLoadingSession: true })
      await API.MOCHI_PROFILE.auth(`Bearer ${token}`)
        .get('/profiles/me')
        .badRequest(() => {
          set({ isLoadingSession: false })
          logout()
        })
        .unauthorized(() => {
          set({ isLoadingSession: false })
          logout()
        })
        .res((res) => {
          set({ isLoadingSession: false })
          // if the code makes it here means the token is valid
          login(token)

          return res.json()
        })
        .then((me) => {
          set({ me })
          useProfileStore.setState({
            profile_id: me.id,
            profile_username: me.associated_accounts[0].platform_identifier,
            accounts: me.associated_accounts.map((aa: any) => ({
              id: aa.id,
              platform: aa.platform,
              platformId: aa.platform_identifier,
            })),
          })
        })
    }
  },
  login: (token: string) => {
    localStorage.setItem(STORAGE_KEY, token)
    set({ token, isLoggedIn: true })
    apiLogin(token)
  },
  logout: () => {
    localStorage.removeItem(STORAGE_KEY)
    set({ token: null, isLoggedIn: false })
    apiLogout()
  },
}))
