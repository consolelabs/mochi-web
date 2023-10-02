import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/900.css'
import '@fontsource/poppins/500.css'
import dynamic from 'next/dynamic'
import { StrictMode, useEffect } from 'react'
import type { ReactNode, ReactElement } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import 'nprogress/nprogress.css'
import '~styles/global.css'
import '~styles/nprogress.css'
import '../styles/tos.css'
import { useAppWalletContext, WalletProvider } from '~context/wallet-context'
import { Toaster } from 'sonner'
import { useRouter } from 'next/router'
import { useAuthStore } from '~store'
import { shallow } from 'zustand/shallow'
import ConnectWalletModal from '~components/Wallet/ConnectWalletModal'
import Modal from '~components/Modal'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { isBeta } from '~constants'
import { button } from '~components/Dashboard/Button'

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

function InnerApp({ Component, pageProps }: AppPropsWithLayout) {
  const { isShowingConnectModal, closeConnectModal } = useAppWalletContext()
  const { query, asPath, pathname, replace, push, isReady } = useRouter()
  const { isLoggedIn, login } = useAuthStore(
    (s) => ({ isLoggedIn: s.isLoggedIn, login: s.login }),
    shallow,
  )
  const getLayout = Component.getLayout ?? ((page) => page)

  useEffect(() => {
    if (!isReady || pathname === '/404' || isLoggedIn) return

    login({
      token: query.token as string,
      showLoading: true,
    }).then(() => {
      if (!query.token) return
      replace({ pathname: asPath.split('?')[0] }, undefined, {
        shallow: true,
      })
        .catch(handleCancelRendering)
        .then(() => {
          if (query.url_location && typeof query.url_location === 'string') {
            push(query.url_location, undefined, { shallow: true }).catch(
              handleCancelRendering,
            )
          }
        })
    })
  }, [
    asPath,
    isLoggedIn,
    isReady,
    login,
    pathname,
    push,
    query.token,
    query.url_location,
    replace,
  ])

  return (
    <>
      {getLayout(<Component {...pageProps} />)}
      <ConnectWalletModal
        isOpen={isShowingConnectModal}
        onClose={closeConnectModal}
      />
    </>
  )
}

export default function App(props: AppPropsWithLayout) {
  const {
    isOpen,
    onClose: _onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false })

  const onClose = () => {
    localStorage.setItem('beta-consented', 'true')
    _onClose()
  }

  useEffect(() => {
    const consented = localStorage.getItem('beta-consented')
    if (!consented && isBeta) {
      onOpen()
    }
  }, [onOpen])

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
      <WalletProvider>
        <InnerApp {...props} />
      </WalletProvider>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex relative z-50 flex-col items-center py-4 px-5 max-w-sm bg-white rounded-xl">
          <span className="text-lg font-semibold">Warning</span>
          <span className="mt-2 font-light text-center text-dashboard-gray-8">
            You&apos;re visiting the <span className="font-semibold">beta</span>{' '}
            page of Mochi, this site is meant for internal team testing, the
            Mochi team won&apos;t be responsible for any loss of your assets on
            beta site, proceed with caution.
          </span>
          <div className="flex gap-x-2 self-stretch mt-5">
            <button
              type="button"
              className={button({
                appearance: 'secondary',
                className: 'flex-1',
              })}
              onClick={onClose}
            >
              I understand the risk
            </button>
          </div>
        </div>
      </Modal>
    </StrictMode>
  )
}
