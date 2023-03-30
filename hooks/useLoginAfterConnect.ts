import { useCallback } from 'react'
import { API } from '~constants/api'
import { ConnectCallback, useAppWalletContext } from '~context/wallet-context'
import { useAuthStore } from '~store'

export const useLoginAfterConnect = () => {
  const login = useAuthStore((s) => s.login)
  const { disconnect } = useAppWalletContext()

  const loginAfterConnect = useCallback<ConnectCallback>(
    async ({ signature, address, code, isEVM }) => {
      API.MOCHI_PROFILE.post(
        {
          wallet_address: address,
          code,
          signature,
        },
        `/profiles/auth/${isEVM ? 'evm' : 'solana'}`,
      )
        .json((r) =>
          login({
            token: r.data.access_token,
          }),
        )
        .finally(disconnect)
    },
    [disconnect, login],
  )

  return loginAfterConnect
}
