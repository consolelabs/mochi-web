import React, { useMemo } from 'react'
import { isSSR, truncate } from '@dwarvesf/react-utils'
import { useAppWalletContext } from '~context/wallet-context'
import { useAccount } from '~hooks/wallets/useAccount'
import { useEns } from '~hooks/wallets/useEns'
import ConnectWalletModal from './Wallet/ConnectWalletModal'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { Popover, Transition } from '@headlessui/react'
import { button } from './Dashboard/Button'
import { Icon } from '@iconify/react'
import { INVITE_LINK } from '~envs'

export default function ConnectButton() {
  const { connected, disconnect: _disconnect } = useAppWalletContext()
  const { address } = useAccount()
  const { ensAvatar, ensName } = useEns(address)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const avatar = useMemo(() => {
    return (
      ensAvatar ??
      `https://source.boringavatars.com/beam/120/${
        ensName ?? address
      }?colors=665c52,74b3a7,a3ccaf,E6E1CF,CC5B14`
    )
  }, [address, ensAvatar, ensName])

  const disconnect = () => {
    onClose()
    _disconnect()
  }

  if (isSSR()) return null

  if (!connected && !isSSR())
    return (
      <>
        <button className={button({ size: 'sm' })} onClick={onOpen}>
          Connect
        </button>
        <ConnectWalletModal isOpen={isOpen} onClose={onClose} />
      </>
    )

  return (
    <Popover className="relative">
      <Popover.Button className="flex gap-x-2 items-center p-1 pr-2 rounded-full border outline-none bg-mochi/10 border-dashboard-red-1">
        <img className="w-6 rounded-full" src={avatar} alt="" />
        <span className="text-sm font-semibold text-foreground">
          {ensName ?? truncate(address ?? '', 5, true, '.')}
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
          <div className="flex flex-col gap-y-1 p-2 rounded-md shadow-md bg-dashboard-gray-7">
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
                className: 'whitespace-nowrap',
              })}
            >
              <Icon icon="mingcute:discord-fill" width={16} />
              Add Bot
            </a>
            {[
              /* [ */
              /*   { */
              /*     icon: <Icon icon="mingcute:user-3-fill" />, */
              /*     text: 'My Profile', */
              /*     onClick: () => { }, */
              /*   }, */
              /*   { */
              /*     icon: <Icon icon="majesticons:settings-cog" />, */
              /*     text: 'Server Management', */
              /*     onClick: () => { }, */
              /*   }, */
              /*   { */
              /*     icon: <Icon icon="majesticons:settings-cog" />, */
              /*     text: 'Settings', */
              /*     onClick: () => { }, */
              /*   }, */
              /* ], */
              /* [ */
              /*   { */
              /*     icon: <Icon icon="mingcute:user-add-fill" />, */
              /*     text: 'Invite Friends', */
              /*     onClick: () => { }, */
              /*   }, */
              /*   { */
              /*     icon: <Icon icon="ph:star-fill" />, */
              /*     text: 'Feedback', */
              /*     onClick: () => { }, */
              /*   }, */
              /* ], */
              [
                {
                  icon: <Icon icon="majesticons:logout" />,
                  text: 'Logout',
                  onClick: disconnect,
                },
              ],
            ].map((group, groupIdx) => {
              return (
                <React.Fragment key={`user-popover-${groupIdx}`}>
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
                </React.Fragment>
              )
            })}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
