import { useDisclosure } from '@dwarvesf/react-hooks'
import { Icon } from '@iconify/react'
import { Fragment, useState } from 'react'
import { button } from '~components/Dashboard/Button'
import Modal from '~components/Modal'
import toast from 'react-hot-toast'
import ConnectSocialButton from './ConnectSocialButton'
import WalletAddressForm from './WalletAddressForm'
import ToastSuccess from '~components/Toast/ToastSuccess'
import { noop, truncate } from '@dwarvesf/react-utils'
import { Popover, Transition } from '@headlessui/react'
import SocialButton from './components/SocialButton'
import Image from 'next/image'

export default function WithdrawButton() {
  const [isDone, setIsDone] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const DropdownButton = ({
    icon,
    title,
    description,
    onClick = noop,
  }: {
    icon: string
    title: string
    description: string
    onClick?: () => void
  }) => {
    return (
      <button
        className={button({
          appearance: 'text',
          className: '!p-0 gap-x-2',
        })}
        onClick={onClick}
      >
        <div className="relative h-4 w-4 md:h-6 md:w-6">
          <Image fill src={icon} alt="Symbol" />
        </div>
        <div className="flex-1 text-start">
          <div className="text-sm font-semibold">{title}</div>
          <div className="mt-1 text-xs text-dashboard-gray-8 font-medium">
            {description}
          </div>
        </div>
      </button>
    )
  }

  const handleAfterSubmit = (walletAddress: string) => {
    // bla bla
    toast.custom(
      () => (
        <ToastSuccess
          message="Withdraw Successful!"
          description={
            <>
              You&#39;re successfully withdraw all to wallet{' '}
              <span className="text-green-400 font-bold">
                {truncate(walletAddress, 12, true, '.')}
              </span>
            </>
          }
        />
      ),
      {
        position: 'top-right',
      },
    )
    // for mocking purpose
    setIsDone(true)
  }

  const wallets = [
    {
      icon: '/integrated-chains/sol.png',
      address: '0xE4eb4BbcB01247638F7D7d664F7b771F406A411a',
      amount: '$12,673 (23BTC)',
    },
    {
      icon: '/integrated-chains/sol.png',
      address: 'baddeed.eth',
      amount: '$12,673 (23BTC)',
    },
  ]

  return (
    <>
      {isDone && (
        <div className="flex flex-col gap-y-2">
          <button
            className={button({
              appearance: 'secondary',
            })}
          >
            <div>Back to Home page</div>
          </button>
          <ConnectSocialButton />
        </div>
      )}

      {!isDone && (
        <>
          <Popover className="relative">
            <Popover.Button
              className={button({
                appearance: 'secondary',
                className: 'w-full',
              })}
            >
              <Icon icon="jam:arrow-square-down-f" />
              <div>Withdraw</div>
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
              <Popover.Panel className="w-full bg-[#FFFFFF] absolute right-0 z-40 mt-2 rounded-lg shadow-full mb-16">
                <div className="flex flex-col md:gap-y-4 gap-y-2 p-3">
                  <div className="text-left">
                    <div className="text-sm font-semibold">Login & Claim</div>
                    <div className="text-dashboard-gray-8 text-xs font-medium">
                      You need to connect your existing account to claim
                    </div>
                  </div>
                  <div>
                    <SocialButton
                      discordLink=""
                      telegramLink=""
                      twitterLink=""
                      googleLink=""
                    />
                  </div>

                  <hr className=" w-full bg-black" />

                  {/* list wallet */}
                  {wallets.map(({ address, icon, amount }, idx) => (
                    <DropdownButton
                      key={idx}
                      title={truncate(address, 12, true, '.')}
                      description={amount}
                      icon={icon}
                    />
                  ))}

                  <hr className=" w-full bg-black" />

                  <DropdownButton
                    title="Claim to public key"
                    description="Claim to a wallet address you specify"
                    icon="/public-key.png"
                    onClick={onOpen}
                  />
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <WalletAddressForm
          onCancel={onClose}
          onAfterSubmit={handleAfterSubmit}
        />
      </Modal>
    </>
  )
}
