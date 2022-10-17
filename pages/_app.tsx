import '@fontsource/dela-gothic-one'
import '@fontsource/dm-serif-display/400.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/900.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import 'nprogress/nprogress.css'
import { StrictMode } from 'react'
import '~styles/global.css'
import '~styles/nprogress.css'
import '../styles/tos.css'
import { WagmiConfig, createClient, Chain, chain } from 'wagmi'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'

const TopProgressBar = dynamic(() => import('~app/layout/nprogress'), {
  ssr: false,
})

const ftm: Chain = {
  id: 250,
  name: 'Fantom Opera',
  network: 'Fantom Opera',
  rpcUrls: {
    default: 'https://rpc.ankr.com/fantom/',
  },
  blockExplorers: {
    default: {
      name: 'FTMScan',
      url: 'https://ftmscan.com',
    },
  },
  nativeCurrency: {
    name: 'Fantom',
    symbol: 'FTM',
    decimals: 18,
  },
}

const client = createClient(
  getDefaultClient({
    appName: 'Mochi',
    chains: [ftm, chain.mainnet],
  }),
)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <WagmiConfig client={client}>
        <ConnectKitProvider
          theme="soft"
          customTheme={{
            '--ck-connectbutton-font-size': '14px',
            '--ck-font-family': '"Inter", sans',
          }}
        >
          <TopProgressBar />
          <Component {...pageProps} />
        </ConnectKitProvider>
      </WagmiConfig>
    </StrictMode>
  )
}
