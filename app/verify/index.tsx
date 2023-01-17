import { InjectedConnector } from '@web3-react/injected-connector'
import { useCallback, useEffect, useState } from 'react'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { PAGES } from '~constants'
import { API } from '~constants/api'
import { useWeb3React } from '~hooks/useWeb3React'
import { VerifyAction } from './action'

interface Props {
  code: string
}

export const randomInjected = new InjectedConnector({})

export const VerifyPage = ({ code }: Props) => {
  const [loading, setLoading] = useState(false)
  const [verified, setVerify] = useState(false)
  const [error, setError] = useState('')

  const { activate, active, account, library } = useWeb3React()

  const sign = useCallback(async () => {
    if (!activate || !account || !library || !code) return
    try {
      setLoading(true)
      const signer = library.getSigner()
      const signature = await signer.signMessage(
        `This will help us connect your discord account to the wallet address.\n\nMochiBotCode=${code}`,
      )
      const response = await API.verify(account, code, signature)
      if (response?.data?.status === 'ok') {
        setVerify(true)
      } else {
        setError(response?.error ?? 'Something went wrong')
      }
    } catch (e) {
      console.error('sign method error', e)
    } finally {
      setLoading(false)
    }
  }, [account, activate, code, library])

  const handleVerify = useCallback(async () => {
    try {
      if (active) await sign()
      else await activate(randomInjected)
    } catch (e) {
      console.error('handleVerify method error', e)
    }
  }, [activate, active, sign])

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
                      Your wallet verified! You can close this window
                    </span>{' '}
                    ✨
                  </div>
                </div>
              ) : (
                <VerifyAction handleVerify={handleVerify} loading={loading} />
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
