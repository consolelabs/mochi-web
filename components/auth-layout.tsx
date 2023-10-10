import Image from 'next/image'
import { logo } from '~utils/image'
import clsx from 'clsx'
import { useHasMounted } from '@dwarvesf/react-hooks'
import { useAuthStore } from '~store'
import { useRouter } from 'next/router'
import Link from 'next/link'
import ProfileDropdown from './profile-dropdrown'
import Login from './login'

const authenticatedRoute = ['/profile', '/app', '/server']

export default function AuthenticatedLayout({
  children,
  /* showSidebar = false, */
  fullWidth = false,
  footer,
  childSEO,
}: {
  childSEO?: React.ReactNode
  children: React.ReactNode
  /* showSidebar?: boolean */
  fullWidth?: boolean
  footer?: React.ReactNode
}) {
  const { pathname } = useRouter()
  const mounted = useHasMounted()
  const { isLoggedIn, isLoadingSession } = useAuthStore()

  if (!mounted) return <>{childSEO}</>

  return (
    <div className="flex flex-col w-screen min-h-screen bg-dashboard-gray-1">
      <div
        className={clsx(
          'sticky top-0 flex px-3 py-5 md:px-7 flex-shrink-0 justify-between z-20',
          {
            'border-b border-b-dashboard-gray-6 bg-dashboard-gray-5':
              isLoggedIn || !authenticatedRoute.includes(pathname),
            'bg-dashboard-gray-1':
              !isLoggedIn && authenticatedRoute.includes(pathname),
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
          <span className="text-base text-gray-500">Dashboard</span>
        </Link>
        {isLoggedIn ? (
          <div className="flex gap-x-5 items-center">
            <span className="text-sm font-medium">See Docs</span>
            <ProfileDropdown />
          </div>
        ) : null}
      </div>
      <div className="flex relative z-10 flex-1">
        {isLoadingSession ? null : isLoggedIn ? (
          <div
            className={clsx(
              'flex items-start gap-x-24 mx-auto w-full max-w-full relative',
              {
                'max-w-5xl my-10 px-4': !fullWidth,
              },
            )}
          >
            {/* {showSidebar ? ( */}
            {/*   <div className="sticky flex-shrink-0 min-w-[200px] top-[108px]"> */}
            {/*     <Sidebar /> */}
            {/*   </div> */}
            {/* ) : null} */}
            <div className="flex-1 h-full">
              {childSEO}
              {children}
            </div>
          </div>
        ) : (
          <Login />
        )}
      </div>
      {footer}
    </div>
  )
}
