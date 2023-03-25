import { create } from 'zustand'

type AccountPlatform = 'discord' | 'evm-chain'

type Account = {
  id: string
  platform: AccountPlatform
  platformId: string
}

type State = {
  profile_id: string | null
  profile_username: string | null
  accounts: Array<Account> | null
}

export const useProfileStore = create<State>(() => ({
  profile_id: null,
  profile_username: null,
  accounts: null,
}))
