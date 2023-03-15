import Image from 'next/image'
import { logo } from '~utils/image'
import clsx from 'clsx'
import { SEO } from '~app/layout/seo'
import { useAccount } from '~hooks/wallets/useAccount'
import { Icon } from '@iconify/react'
import { useAppWalletContext } from '~context/wallet-context'
import ConnectButton from '~components/ConnectButton'
import { useHasMounted } from '@dwarvesf/react-hooks'
import Login from './Login'
import Sidebar from './Sidebar'

export default function DashboardLayout({
  children,
  showSidebar = false,
  fullWidth = false,
  header,
  headerExtraRight,
  footer,
}: {
  children: React.ReactNode
  showSidebar?: boolean
  fullWidth?: boolean
  header?: React.ReactNode
  headerExtraRight?: React.ReactNode
  footer?: React.ReactNode
}) {
  const mounted = useHasMounted()
  const { connected } = useAppWalletContext()
  const { address } = useAccount()

  if (!mounted) return null

  return (
    <>
      <SEO title="Dashboard" description="" />
      <div className="flex flex-col min-h-screen bg-dashboard-gray-1">
        <div
          className={clsx(
            'sticky top-0 flex py-4 px-7 flex-shrink-0 justify-between',
            {
              'border-b border-b-dashboard-gray-6 bg-dashboard-gray-5':
                connected,
              'bg-dashboard-gray-1': !connected,
            },
          )}
        >
          <div className="flex gap-x-3 items-center">
            <Image
              src={logo}
              alt="Logo"
              width={32}
              height={32}
              className="block rounded-full"
            />
            <span className="text-xl font-black uppercase text-foreground">
              Mochi<span className="text-mochi">.</span>
            </span>
          </div>
          {connected && address ? (
            <div className="flex gap-x-3 items-center">
              <Icon icon="mdi:bell" width={20} />
              <ConnectButton />
            </div>
          ) : null}
        </div>
        <div className="flex flex-1">
          {connected ? (
            <div
              className={clsx('flex gap-x-24 mx-auto w-full', {
                'max-w-5xl my-10': !fullWidth,
              })}
            >
              {showSidebar ? (
                <div className="flex-shrink-0 min-w-[200px]">
                  <Sidebar />
                </div>
              ) : null}
              <div className="flex-1">
                {(header || headerExtraRight) && (
                  <div className="flex justify-between mb-4">
                    <h2 className="text-[22px] font-bold">
                      {header && header}
                    </h2>
                    {headerExtraRight && headerExtraRight}
                  </div>
                )}
                {children}
              </div>
            </div>
          ) : (
            <Login />
          )}
        </div>
        {!connected ? (
          <div className="fixed right-5 bottom-5 text-sm text-dashboard-gray-4">
            &#169; 2022 MochiBot
          </div>
        ) : null}
        {footer && (
          <div className="fixed bottom-0 left-0 border-t border-dashboard-gray-6 w-full">
            {footer}
          </div>
        )}
      </div>
    </>
  )
}