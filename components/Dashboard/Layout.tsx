import Image from 'next/image'
import { logo } from '~utils/image'
import clsx from 'clsx'
import { useHasMounted } from '@dwarvesf/react-hooks'
import Login from './Login'
import Sidebar from './Sidebar'
import { SEO } from '~app/layout/seo'
import { HOME_URL } from '~envs'
import { useAuthStore } from '~store'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDashboardStore } from '~store'
import Link from 'next/link'
import ProfileDropdown from './ProfileDropdrown'

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
  const {
    pathname,
    query: { server_id },
  } = useRouter()
  const mounted = useHasMounted()
  const { isLoggedIn, isLoadingSession } = useAuthStore()
  const { getServer } = useDashboardStore()

  useEffect(() => {
    if (server_id && isLoggedIn) {
      getServer(server_id as string)
    }
  }, [isLoggedIn, server_id]) // eslint-disable-line

  if (!mounted) return <>{childSEO}</>

  return (
    <>
      <div className="flex flex-col w-screen min-h-screen bg-dashboard-gray-1">
        <div
          className={clsx(
            'sticky top-0 flex px-3 py-5 md:px-7 flex-shrink-0 justify-between z-20',
            {
              'border-b border-b-dashboard-gray-6 bg-dashboard-gray-5':
                isLoggedIn || pathname !== '/dashboard',
              'bg-dashboard-gray-1': !isLoggedIn && pathname === '/dashboard',
            },
          )}
        >
          <Link href="/" className="flex gap-x-2 items-center">
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
            <span className="text-base text-gray-500">Developer</span>
          </Link>
          {isLoggedIn || skipAuth ? (
            <div className="flex gap-x-5 items-center">
              <span className="text-sm font-medium">See Docs</span>
              <ProfileDropdown />
            </div>
          ) : null}
        </div>
        <div className="flex relative z-10 flex-1">
          {isLoadingSession ? null : (
            <>
              {isLoggedIn || skipAuth ? (
                <div
                  className={clsx(
                    'flex items-start gap-x-24 mx-auto w-full max-w-full relative',
                    {
                      'max-w-5xl my-10 px-4': !fullWidth,
                    },
                  )}
                >
                  {showSidebar ? (
                    <div className="sticky flex-shrink-0 min-w-[200px] top-[108px]">
                      <Sidebar />
                    </div>
                  ) : null}
                  <div className="flex-1 h-full">
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
