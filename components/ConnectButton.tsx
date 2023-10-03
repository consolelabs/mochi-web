import React, { Fragment } from 'react'
import { useEns } from '~hooks/wallets/useEns'
import { useHasMounted } from '@dwarvesf/react-hooks'
import { button } from './Dashboard/Button'
import { Icon } from '@iconify/react'
import { AUTH_DISCORD_URL, INVITE_LINK } from '~envs'
import { Menu } from './Dashboard/Menu'
import { useRouter } from 'next/router'
import Avatar from './Dashboard/Avatar'
import { useAuthStore } from '~store'
import { shallow } from 'zustand/shallow'
import { useProfileStore } from '~store'
import { useAppWalletContext } from '~context/wallet-context'
import { handleCancelRendering } from '~pages/_app'
import { useLoginAfterConnect } from '~hooks/useLoginAfterConnect'
import { Popover } from './Popover'
import { isSSR } from '@dwarvesf/react-utils'
import QRCodeButton from '~components/Pay/QRCodeButton'
import useSWR from 'swr'
import { API } from '~constants/api'
import clsx from 'clsx'

const ConnectButtonTrigger = () => (
  <Fragment>
    Connect
    <Icon icon="iconamoon:arrow-down-2-light" className="w-4 h-4" />
  </Fragment>
)

export default function ConnectButton() {
  const mounted = useHasMounted()
  const { query, pathname, replace } = useRouter()
  const serverId = query.server_id
  const {
    showConnectModal,
    closeConnectModal,
    disconnect: disconnectWallet,
  } = useAppWalletContext()
  const { isLoggedIn, logout } = useAuthStore(
    (s) => ({ isLoggedIn: s.isLoggedIn, logout: s.logout }),
    shallow,
  )
  const { name, id, avatar } = useProfileStore(
    (s) => ({
      id: s.me?.id,
      name: s.me?.profile_name,
      avatar: s.me?.avatar,
    }),
    shallow,
  )
  const { ensName } = useEns(name ?? '')

  const { data: payRequests = { pay_requests: [], nr_of_unclaimed: 0 } } =
    useSWR([`/unclaimed`, id], async ([_, id]) => {
      if (!id)
        return {
          pay_requests: [],
          nr_of_unclaimed: 0,
        }
      return await API.MOCHI_PAY.get(`/pay-requests/${id}/unclaimed`).json(
        (r) => r.data,
      )
    })

  const disconnect = () => {
    try {
      disconnectWallet()
      closeConnectModal()
      logout()
      if (pathname.startsWith('/dashboard')) {
        replace('/dashboard', undefined, { shallow: true }).catch(
          handleCancelRendering,
        )
      } else {
        replace('/', undefined, { shallow: true }).catch(handleCancelRendering)
      }
    } catch {}
  }

  const loginAfterConnect = useLoginAfterConnect()

  const finalName = ensName ?? name ?? ''

  if (!mounted || pathname.startsWith('/verify')) return null

  if (!isLoggedIn)
    return (
      <Popover
        trigger={<ConnectButtonTrigger />}
        triggerClassname={clsx(
          button({ size: 'sm', appearance: 'pill' }),
          'inline-flex items-center',
        )}
      >
        <div className="pt-3">
          <div className="flex flex-col gap-y-2 p-2 bg-white rounded-lg">
            <a
              href={`${AUTH_DISCORD_URL}?url_location=${window.location.href}`}
              className={button({})}
            >
              <Icon
                icon="mingcute:discord-fill"
                className="flex-shrink-0 text-foreground"
              />
              <div>Discord</div>
            </a>
            <button
              type="button"
              onClick={() => showConnectModal(loginAfterConnect)}
              className={button({})}
            >
              <Icon
                icon="basil:wallet-solid"
                className="flex-shrink-0 text-foreground"
              />
              <div>Wallet</div>
            </button>
          </div>
        </div>
      </Popover>
    )

  return (
    <Popover
      trigger={
        <div className="flex gap-x-2 items-center p-1 pr-2 rounded-full border outline-none bg-mochi/10 border-dashboard-red-1">
          <Avatar className="w-6 rounded-full" />
          <span className="text-xs font-semibold sm:text-sm text-foreground">
            {finalName}
          </span>
        </div>
      }
      showChevron={false}
    >
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

            {payRequests.pay_requests.length && payRequests.nr_of_unclaimed ? (
              <div className="flex mx-3 mt-2">
                <QRCodeButton
                  image={avatar}
                  links={
                    isSSR()
                      ? []
                      : payRequests.pay_requests.map(
                          (pr: any) =>
                            `${window.location.protocol}://${window.location.host}/pay/${pr.code}`,
                        )
                  }
                  user={finalName}
                >
                  {payRequests.nr_of_unclaimed} code(s) left
                </QRCodeButton>
              </div>
            ) : null}
            <Menu
              onClick={() => close()}
              items={[
                [
                  '',
                  [
                    {
                      id: 'my-profile',
                      icon: (
                        <Icon icon="mingcute:user-3-fill" className="w-5 h-5" />
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
                        <Icon icon="mingcute:star-fill" className="w-5 h-5" />
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
                        <Icon icon="majesticons:logout" className="w-5 h-5" />
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
    </Popover>
  )
}
