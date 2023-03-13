import Image from 'next/image'
import { logo } from '~utils/image'
import cln from 'classnames'
import { SEO } from '~app/layout/seo'
import { useAccount } from '~hooks/wallets/useAccount'
import { Icon } from '@iconify/react'
import { useAppWalletContext } from '~context/wallet-context'
import { useEns } from '~hooks/wallets/useEns'
import { truncate } from '@dwarvesf/react-utils'
import { Popover, Transition } from '@headlessui/react'
import button from './button'
import { Fragment } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { connected, disconnect } = useAppWalletContext()
  const { address } = useAccount()
  const { ensName, ensAvatar } = useEns(address)

  return (
    <>
      <SEO title="Dashboard" description="" />
      <div className="flex flex-col min-h-screen min-w-screen bg-dashboard-gray-1">
        <div
          className={cln('flex py-4 px-7 flex-shrink-0 justify-between', {
            'border-b border-b-dashboard-gray-6 bg-dashboard-gray-5': connected,
            'bg-dashboard-gray-1': !connected,
          })}
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
              <Popover className="relative">
                <Popover.Button className="flex gap-x-2 items-center p-1 pr-2 rounded-full border outline-none bg-mochi/10 border-dashboard-red-1">
                  <img
                    className="w-6 rounded-full"
                    src={ensAvatar ?? ''}
                    alt=""
                  />
                  <span className="text-sm font-semibold text-foreground">
                    {ensName ?? truncate(address ?? '', 5, true, '.')}
                  </span>
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute right-0 z-40 mt-2">
                    <div className="flex flex-col gap-y-1 p-2 rounded-md shadow-md bg-dashboard-gray-7">
                      <button
                        style={{
                          boxShadow: '0px 4px 16px rgba(249, 164, 180, 0.8)',
                        }}
                        className={button({ appearance: 'mochi', size: 'sm' })}
                      >
                        <Icon icon="mingcute:discord-fill" width={16} />
                        Add Bot
                      </button>
                      {[
                        [
                          {
                            icon: <Icon icon="mingcute:user-3-fill" />,
                            text: 'My Profile',
                            onClick: () => {},
                          },
                          {
                            icon: <Icon icon="majesticons:settings-cog" />,
                            text: 'Server Management',
                            onClick: () => {},
                          },
                          {
                            icon: <Icon icon="majesticons:settings-cog" />,
                            text: 'Settings',
                            onClick: () => {},
                          },
                        ],
                        [
                          {
                            icon: <Icon icon="mingcute:user-add-fill" />,
                            text: 'Invite Friends',
                            onClick: () => {},
                          },
                          {
                            icon: <Icon icon="ph:star-fill" />,
                            text: 'Feedback',
                            onClick: () => {},
                          },
                        ],
                        [
                          {
                            icon: <Icon icon="majesticons:logout" />,
                            text: 'Logout',
                            onClick: disconnect,
                          },
                        ],
                      ].map((group, groupIdx) => {
                        return (
                          <Fragment key={`user-popover-${groupIdx}`}>
                            {groupIdx !== 0 ? (
                              <hr className="w-[90%] mx-auto h-[2px] bg-black/10" />
                            ) : null}
                            <div className="flex flex-col">
                              {group.map((item, itemIdx) => {
                                return (
                                  <button
                                    onClick={() => item.onClick()}
                                    key={`user-popover-item-${itemIdx}`}
                                    className="flex gap-x-2 items-center py-2 px-3 whitespace-nowrap text-dashboard-gray-4"
                                  >
                                    {item.icon}
                                    <span className="text-sm font-medium text-foreground">
                                      {item.text}
                                    </span>
                                  </button>
                                )
                              })}
                            </div>
                          </Fragment>
                        )
                      })}
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            </div>
          ) : null}
        </div>
        <div className="flex flex-1">{children}</div>
        <div className="fixed right-5 bottom-5 text-sm text-dashboard-gray-4">
          &#169; 2022 MochiBot
        </div>
      </div>
    </>
  )
}
