import React from 'react'
import { useEns } from '~hooks/wallets/useEns'
import { useHasMounted } from '@dwarvesf/react-hooks'
import { Popover, Transition } from '@headlessui/react'
import { button } from './Dashboard/Button'
import { Icon } from '@iconify/react'
import { INVITE_LINK } from '~envs'
import { Menu } from './Dashboard/Menu'
import { useRouter } from 'next/router'
import Avatar from './Dashboard/Avatar'
import { useAuthStore } from '~store'
import { shallow } from 'zustand/shallow'
import { useProfileStore } from '~store'
import { useAppWalletContext } from '~context/wallet-context'
import { handleCancelRendering } from '~pages/_app'
import { useLoginAfterConnect } from '~hooks/useLoginAfterConnect'

export default function ConnectButton() {
  const mounted = useHasMounted()
  const { query, pathname, replace } = useRouter()
  const serverId = query.server_id
  const { showConnectModal, closeConnectModal } = useAppWalletContext()
  const { isLoggedIn, logout } = useAuthStore(
    (s) => ({ isLoggedIn: s.isLoggedIn, logout: s.logout }),
    shallow,
  )
  const profileUsername = useProfileStore((s) => s.me?.profile_name)
  const { ensName } = useEns(profileUsername ?? '')

  const disconnect = () => {
    closeConnectModal()
    logout()
    if (pathname.startsWith('/dashboard')) {
      replace('/dashboard', undefined, { shallow: true }).catch(
        handleCancelRendering,
      )
    } else {
      replace('/', undefined, { shallow: true }).catch(handleCancelRendering)
    }
  }

  const loginAfterConnect = useLoginAfterConnect()

  if (!mounted) return null

  if (!isLoggedIn)
    return (
      <button
        className={button({ size: 'sm' })}
        onClick={() => showConnectModal(loginAfterConnect)}
      >
        Connect
      </button>
    )

  return (
    <Popover className="relative">
      <Popover.Button className="flex gap-x-2 items-center p-1 pr-2 rounded-full border outline-none bg-mochi/10 border-dashboard-red-1">
        <Avatar className="w-6 rounded-full" />
        <span className="text-sm font-semibold text-foreground">
          {ensName ?? profileUsername}
        </span>
      </Popover.Button>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute right-0 z-40 mt-2">
          {({ close }) => {
            return (
              <div className="flex flex-col gap-y-1 py-2 rounded-md shadow-md bg-dashboard-gray-7">
                <a
                  href={INVITE_LINK}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    boxShadow: '0px 4px 16px rgba(249, 164, 180, 0.8)',
                  }}
                  className={button({
                    appearance: 'mochi',
                    size: 'sm',
                    className: 'whitespace-nowrap mx-3',
                  })}
                >
                  <Icon icon="mingcute:discord-fill" width={16} />
                  Add Bot
                </a>
                <Menu
                  onClick={() => close()}
                  items={[
                    [
                      '',
                      [
                        {
                          id: 'my-profile',
                          icon: (
                            <Icon
                              icon="mingcute:user-3-fill"
                              className="w-5 h-5"
                            />
                          ),
                          text: 'My Profile',
                          url: '/dashboard/profile',
                        },
                        {
                          id: 'quests',
                          icon: (
                            <Icon icon="mdi:bookmark-box" className="w-5 h-5" />
                          ),
                          text: 'Quests',
                          url: serverId
                            ? `/dashboard/${serverId}/quests`
                            : '/dashboard',
                        },
                        {
                          id: 'game-store',
                          icon: (
                            <Icon
                              icon="teenyicons:game-controller-solid"
                              className="w-5 h-5"
                            />
                          ),
                          text: 'Game Store',
                        },
                        {
                          id: 'server-management',
                          icon: (
                            <Icon
                              icon="heroicons:cog-6-tooth-solid"
                              className="w-5 h-5"
                            />
                          ),
                          text: 'Server Management',
                          url: '/dashboard',
                        },
                        {
                          id: 'settings',
                          icon: (
                            <Icon
                              icon="heroicons:cog-6-tooth-solid"
                              className="w-5 h-5"
                            />
                          ),
                          text: 'Settings',
                          url: '/dashboard/settings/account',
                        },
                      ],
                    ],
                    [
                      '',
                      [
                        {
                          id: 'invite-friends',
                          icon: (
                            <Icon
                              icon="mingcute:user-add-fill"
                              className="w-5 h-5"
                            />
                          ),
                          text: 'Invite Friends',
                        },
                        {
                          id: 'feedback',
                          icon: (
                            <Icon
                              icon="mingcute:star-fill"
                              className="w-5 h-5"
                            />
                          ),
                          text: 'Feedback',
                        },
                      ],
                    ],
                    [
                      '',
                      [
                        {
                          id: 'logout',
                          icon: (
                            <Icon
                              icon="majesticons:logout"
                              className="w-5 h-5"
                            />
                          ),
                          text: 'Logout',
                          onClick: () => disconnect(),
                        },
                      ],
                    ],
                  ]}
                />
              </div>
            )
          }}
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
