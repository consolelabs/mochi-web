import React, { useMemo } from 'react'
import { truncate } from '@dwarvesf/react-utils'
import { useAppWalletContext } from '~context/wallet-context'
import { useAccount } from '~hooks/wallets/useAccount'
import { useEns } from '~hooks/wallets/useEns'
import ConnectWalletModal from './Wallet/ConnectWalletModal'
import { useDisclosure, useHasMounted } from '@dwarvesf/react-hooks'
import { Popover, Transition } from '@headlessui/react'
import { button } from './Dashboard/Button'
import { Icon } from '@iconify/react'
import { INVITE_LINK } from '~envs'
import { Menu } from './Dashboard/Menu'

export default function ConnectButton() {
  const mounted = useHasMounted()
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

  if (!mounted) return null

  if (!connected)
    return (
      <div>
        <button className={button({ size: 'sm' })} onClick={onOpen}>
          Connect
        </button>
        <ConnectWalletModal isOpen={isOpen} onClose={onClose} />
      </div>
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
              items={[
                /* [ */
                /*   { */
                /*     icon: <Icon icon="mingcute:user-3-fill" />, */
                /*     text: 'My Profile', */
                /*     onClick: () => {}, */
                /*   }, */
                /*   { */
                /*     icon: <Icon icon="majesticons:settings-cog" />, */
                /*     text: 'Server Management', */
                /*     onClick: () => {}, */
                /*   }, */
                /*   { */
                /*     icon: <Icon icon="majesticons:settings-cog" />, */
                /*     text: 'Settings', */
                /*     onClick: () => {}, */
                /*   }, */
                /* ], */
                /* [ */
                /*   { */
                /*     icon: <Icon icon="mingcute:user-add-fill" />, */
                /*     text: 'Invite Friends', */
                /*     onClick: () => {}, */
                /*   }, */
                /*   { */
                /*     icon: <Icon icon="ph:star-fill" />, */
                /*     text: 'Feedback', */
                /*     onClick: () => {}, */
                /*   }, */
                /* ], */
                [
                  {
                    icon: <Icon icon="majesticons:logout" />,
                    text: 'Logout',
                    onClick: () => disconnect(),
                  },
                ],
              ]}
            />
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
