import { useCallback, useEffect, useState } from 'react'
import { useAccount, useSigner } from 'wagmi'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import Button from '~components/button'
import { PAGES } from '~constants'
import { API } from '~constants/api'
import { ConnectKitButton } from 'connectkit'

interface Props {
  code: string
}

export const VerifyPage = ({ code }: Props) => {
  const [loading, setLoading] = useState(false)
  const [verified, setVerify] = useState(false)
  const [error, setError] = useState('')

  const { isConnected: active, address } = useAccount()
  const { data: signer } = useSigner()

  const sign = useCallback(async () => {
    if (!address || !signer) return
    try {
      setLoading(true)
      const signature = await signer.signMessage(
        `This will help us connect your discord account to the wallet address.\n\nMochiBotCode=${code}`,
      )
      const response = await API.verify(address, code, signature)
      if (response) {
        if (response.status === 'ok') {
          setVerify(true)
        } else {
          setError(response.error || '')
        }
      }
    } catch (e) {
      console.error('sign method error', e)
    } finally {
      setLoading(false)
    }
  }, [address, code, signer])

  const handleVerify = useCallback(async () => {
    try {
      if (active) await sign()
    } catch (e) {
      console.error('handleVerify method error', e)
    }
  }, [active, sign])

  useEffect(() => {
    if (!verified && active && !loading) sign()
  }, [active, verified])

  return (
    <Layout>
      <SEO title={PAGES.VERIFY.title} tailTitle />
      <div className="relative flex flex-col items-center">
        <div className="max-w-7xl px-12 py-16 mx-auto">
          <div className="py-24 md:py-48">
            {code && !error ? (
              verified ? (
                <div className="px-8 py-8 mx-auto md:px-16 md:max-w-2xl">
                  <div className="text-2xl font-black text-center md:text-3xl">
                    <span className="uppercase text-mochi-gradient">
                      Your wallet is verified! You can close this window
                    </span>{' '}
                    ✨
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-xs px-6 py-8 mx-auto sm:max-w-7xl">
                  <h3 className="mb-4 text-3xl font-black text-center uppercase md:text-4xl lg:text-5xl text-mochi-gradient">
                    Verify your wallet
                  </h3>
                  <p className="max-w-sm mx-auto mb-6 font-medium text-center">
                    Connect your wallet to verify and get full access to Mochi
                    with more exclusive privileges.
                  </p>
                  {!active ? (
                    <ConnectKitButton />
                  ) : (
                    <Button
                      className="flex items-center justify-center gap-2 mx-auto"
                      onClick={handleVerify}
                      color="white"
                    >
                      {loading ? (
                        'Verifying...'
                      ) : (
                        <>
                          <img
                            src="/assets/metamask.svg"
                            className="h-8 mr-2"
                            alt="Metamask"
                          />
                          Verify
                        </>
                      )}
                    </Button>
                  )}
                </div>
              )
            ) : (
              <div className="px-8 py-8 mx-auto md:px-16 md:max-w-2xl">
                <div className="mb-2 font-medium md:text-xl">
                  Something went wrong with error:
                </div>
                <div className="w-full px-4 py-2 font-mono rounded bg-stone-200">
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
