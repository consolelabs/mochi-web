import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/900.css'
import '@fontsource/sora/700.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { StrictMode } from 'react'
import 'nprogress/nprogress.css'
import '~styles/global.css'
import '~styles/nprogress.css'
import '../styles/tos.css'
import { WalletProvider } from '~context/wallet-context'

const TopProgressBar = dynamic(() => import('~app/layout/nprogress'), {
  ssr: false,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <TopProgressBar />
      <WalletProvider>
        <Component {...pageProps} />
      </WalletProvider>
    </StrictMode>
  )
}
