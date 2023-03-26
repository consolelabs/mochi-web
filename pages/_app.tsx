import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/900.css'
import '@fontsource/sora/500.css'
import '@fontsource/sora/700.css'
import dynamic from 'next/dynamic'
import { StrictMode, useEffect } from 'react'
import type { ReactNode, ReactElement } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import 'nprogress/nprogress.css'
import '~styles/global.css'
import '~styles/nprogress.css'
import '../styles/tos.css'
import { WalletProvider } from '~context/wallet-context'
import { Toaster } from 'sonner'
import { useRouter } from 'next/router'
import { useAuthStore } from '~store'
import { shallow } from 'zustand/shallow'

const TopProgressBar = dynamic(() => import('~app/layout/nprogress'), {
  ssr: false,
})

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export function handleCancelRendering(e: any) {
  if (!e.cancelled) throw e
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const { asPath, query, pathname, replace, push, isReady } = useRouter()
  const login = useAuthStore((s) => s.login, shallow)
  const getLayout = Component.getLayout ?? ((page) => page)

  useEffect(() => {
    if (!isReady) return
    if (pathname === '/404') return

    login(query.token as string).then(() => {
      replace(asPath, undefined, { shallow: true })
        .catch(handleCancelRendering)
        .then(() => {
          if (query.url_location && typeof query.url_location === 'string') {
            push(query.url_location, undefined, { shallow: true }).catch(
              handleCancelRendering,
            )
          }
        })
    })
  }, [asPath, query.token]) // eslint-disable-line

  return (
    <StrictMode>
      <Toaster
        position="top-right"
        closeButton
        toastOptions={{
          className: 'w-full',
        }}
      />
      <TopProgressBar />
      <WalletProvider>{getLayout(<Component {...pageProps} />)}</WalletProvider>
    </StrictMode>
  )
}
