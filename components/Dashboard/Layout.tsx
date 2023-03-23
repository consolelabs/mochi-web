import Image from 'next/image'
import { logo } from '~utils/image'
import clsx from 'clsx'
import { Icon } from '@iconify/react'
import ConnectButton from '~components/ConnectButton'
import { useHasMounted } from '@dwarvesf/react-hooks'
import Login from './Login'
import Sidebar from './Sidebar'
import { SEO } from '~app/layout/seo'
import { HOME_URL } from '~envs'
import { useAuthStore } from '~store'

export default function DashboardLayout({
  children,
  showSidebar = false,
  fullWidth = false,
  header,
  headerExtraRight,
  footer,
  childSEO,
  skipAuth = false,
}: {
  childSEO?: React.ReactNode
  children: React.ReactNode
  showSidebar?: boolean
  fullWidth?: boolean
  header?: React.ReactNode
  headerExtraRight?: React.ReactNode
  footer?: React.ReactNode
  skipAuth?: boolean
}) {
  const mounted = useHasMounted()
  const { isLoggedIn, isLoadingSession } = useAuthStore()

  if (!mounted) return <>{childSEO}</>

  return (
    <>
      <div className="flex flex-col min-h-screen bg-dashboard-gray-1">
        <div
          className={clsx(
            'sticky top-0 flex py-4 px-7 flex-shrink-0 justify-between z-20',
            {
              'border-b border-b-dashboard-gray-6 bg-dashboard-gray-5':
                isLoggedIn,
              'bg-dashboard-gray-1': !isLoggedIn,
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
          {isLoggedIn || skipAuth ? (
            <div className="flex gap-x-3 items-center">
              {isLoggedIn && <Icon icon="mdi:bell" width={20} />}
              <ConnectButton />
            </div>
          ) : null}
        </div>
        <div className="flex relative z-10 flex-1">
          {isLoadingSession ? null : (
            <>
              {isLoggedIn || skipAuth ? (
                <div
                  className={clsx(
                    'flex items-start gap-x-24 mx-auto w-full relative',
                    {
                      'max-w-5xl my-10 px-5': !fullWidth,
                    },
                  )}
                >
                  {showSidebar ? (
                    <div className="sticky flex-shrink-0 min-w-[200px] top-[108px]">
                      <Sidebar />
                    </div>
                  ) : null}
                  <div className="overflow-x-hidden flex-1 h-full">
                    {(header || headerExtraRight) && (
                      <div className="flex justify-between mb-6">
                        <h2 className="font-bold text-[22px]">
                          {header && header}
                        </h2>
                        {headerExtraRight && headerExtraRight}
                      </div>
                    )}
                    {childSEO}
                    {children}
                  </div>
                </div>
              ) : (
                <>
                  <SEO
                    title="Dashboard"
                    tailTitle
                    url={`${HOME_URL}/dashboard`}
                  />
                  <Login />
                </>
              )}
            </>
          )}
        </div>
        {footer}
      </div>
    </>
  )
}
