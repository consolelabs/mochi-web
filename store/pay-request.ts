import { create } from 'zustand'

export type PayRequest = {
  code: string
  claim_tx?: string
  amount: string
  status: 'submitted' | 'claimed' | 'expired' | 'failed'
  note?: string
  profile_id: string
  profile?: {
    name: string
    avatar: string
  }
  token: {
    address: string
    icon: string
    chain: {
      chain_id: string
      symbol: string
      icon: string
      explorer: string
    }
    decimal: number
    symbol: string
  }
  type: 'paylink' | 'payme'
}

type State = {
  payRequest: PayRequest
  set: (pr: PayRequest) => void
}

export const usePayRequest = create<State>((set) => ({
  payRequest: {
    code: '',
    amount: '',
    status: 'submitted',
    profile_id: '-1',
    token: {
      address: '',
      icon: '',
      chain: {
        chain_id: '',
        symbol: '',
        icon: '',
        explorer: '',
      },
      decimal: 0,
      symbol: '',
    },
    type: 'paylink',
  },
  set: (payRequest) => set({ payRequest }),
}))
