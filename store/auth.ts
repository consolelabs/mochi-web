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
  login: (token?: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<State>((set, get) => ({
  me: undefined,
  token: null,
  isLoggedIn: false,
  isLoadingSession: true,
  login: async (tokenParam?: string) => {
    const { logout } = get()
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
          localStorage.setItem(STORAGE_KEY, token)
          set({ token, isLoggedIn: true })
          apiLogin(token)

          return res.json()
        })
        .then((me) => {
          set({ me })
          // try to find evm account
          const evmAcc = me.associated_accounts.find(
            (aa: any) => aa.platform === 'evm-chain',
          )
          // do the same with solana
          const solAcc = me.associated_accounts.find(
            (aa: any) => aa.platform === 'solana-chain',
          )
          // probably social accounts
          const other = me.associated_accounts[0]

          // priority evm > sol > socials
          const profile_username =
            evmAcc?.platform_identifier ??
            solAcc?.platform_identifier ??
            other?.platform_identifier

          useProfileStore.setState({
            profile_id: me.id,
            profile_username,
            accounts: me.associated_accounts.map((aa: any) => ({
              id: aa.id,
              platform: aa.platform,
              platformId: aa.platform_identifier,
            })),
          })
        })
    }
  },
  logout: () => {
    localStorage.removeItem(STORAGE_KEY)
    set({ token: null, isLoggedIn: false })
    apiLogout()
  },
}))
