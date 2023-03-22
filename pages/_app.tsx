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

const TopProgressBar = dynamic(() => import('~app/layout/nprogress'), {
  ssr: false,
})

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const { pathname, query, replace } = useRouter()
  const { getSession, isLoadingSession, token, isLoggedIn } = useAuthStore()
  const getLayout = Component.getLayout ?? ((page) => page)

  useEffect(() => {
    if (pathname.startsWith('/dashboard') && !isLoadingSession && !isLoggedIn) {
      getSession(query.token as string)
      replace(pathname, undefined, { shallow: true })
      if (query.url_location && typeof query.url_location === 'string') {
        replace(query.url_location, undefined)
      }
    }
  }, [pathname, query.token]) // eslint-disable-line

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
