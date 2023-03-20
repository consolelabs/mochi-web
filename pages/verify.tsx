import { isSSR } from '@dwarvesf/react-utils'
import { GetServerSideProps } from 'next'
import { useCallback, useEffect, useState } from 'react'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { button } from '~components/Dashboard/Button'
import { PAGES } from '~constants'
import { API } from '~constants/api'
import { useAppWalletContext } from '~context/wallet-context'
import { useAccount } from '~hooks/wallets/useAccount'
import { useSignMessage } from '~hooks/wallets/useSignMessage'
import ConnectButton from '~components/ConnectButton'
import { useHasMounted } from '@dwarvesf/react-hooks'
import { WretchError } from 'wretch'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const code = ctx.query.code ?? null
  const discordId = ctx.query.did

  let profile
  try {
    profile = (await API.MOCHI_PROFILE.get(
      `/profiles/get-by-discord/${discordId}`,
    ).json()) as { id?: number }
  } catch {}

  return {
    props: { code, profileId: discordId ? profile?.id ?? null : null },
  }
}

export default function Verify({
  code,
  profileId,
}: {
  code: string
  profileId: string
}) {
  const mounted = useHasMounted()
  const [loading, setLoading] = useState(false)
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(
    !code || !profileId ? 'Missing code/profile id' : '',
  )
  const { connected } = useAppWalletContext()
  const { address, isSolanaConnected, isEVMConnected } = useAccount()
  const signMsg = useSignMessage(
    `This will help us connect your discord account to the wallet address.\n\nMochiBotCode=${code}`,
  )

  const sign = useCallback(async () => {
    if (!code || !profileId || loading || !connected || !address) return
    try {
      setLoading(true)
      const signature = await signMsg()
      if (signature) {
        API.MOCHI_PROFILE.post(
          {
            wallet_address: address,
            code,
            signature,
          },
          `/profiles/${profileId}/accounts/${
            isEVMConnected ? 'evm' : 'solana'
          }`,
        )
          .json(() => setVerified(true))
          .catch((e: WretchError) => {
            setError(e.json.msg ?? 'Something went wrong')
          })
      }
    } catch (e) {
      console.error('sign method error', e)
    } finally {
      setLoading(false)
    }
  }, [address, code, connected, isEVMConnected, loading, profileId, signMsg])

  useEffect(() => {
    if (
      !verified &&
      connected &&
      !loading &&
      !isSSR() &&
      (isEVMConnected || isSolanaConnected)
    )
      sign()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, verified, isEVMConnected, isSolanaConnected, signMsg])

  if (!mounted) return null

  return (
    <Layout>
      <SEO title={PAGES.VERIFY.title} tailTitle />
      <div className="flex relative flex-col items-center">
        <div className="py-16 px-12 mx-auto max-w-7xl">
          <div className="py-24 md:py-48">
            {code && profileId && !error ? (
              verified ? (
                <div className="py-8 px-8 mx-auto md:px-16 md:max-w-2xl">
                  <div className="text-2xl font-black text-center md:text-3xl">
                    <span className="uppercase text-mochi-gradient">
                      Your wallet is verified! You can close this window
                    </span>{' '}
                    ✨
                  </div>
                </div>
              ) : (
                <div className="py-8 px-6 mx-auto w-full max-w-xs sm:max-w-7xl">
                  <h3 className="mb-4 text-3xl font-black text-center uppercase md:text-4xl lg:text-5xl text-mochi-gradient">
                    Verify your wallet
                  </h3>
                  <p className="mx-auto mb-3 max-w-sm font-medium text-center">
                    Connect your wallet to verify and get full access to Mochi
                    with more exclusive privileges.
                  </p>
                  <div className="flex gap-x-2 justify-center">
                    {connected ? (
                      <>
                        <button
                          onClick={sign}
                          className={button({ size: 'sm' })}
                        >
                          {loading ? 'Verifying...' : 'Verify'}
                        </button>
                        <button
                          onClick={() => setLoading(false)}
                          className={button({ size: 'sm' })}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <ConnectButton />
                    )}
                  </div>
                </div>
              )
            ) : (
              <div className="py-8 px-8 mx-auto md:px-16 md:max-w-2xl">
                <div className="mb-2 font-medium text-center md:text-xl">
                  Something went wrong with error
                </div>
                <div className="py-2 px-4 w-full font-mono rounded bg-stone-200">
                  &ldquo;{error}&rdquo;
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
