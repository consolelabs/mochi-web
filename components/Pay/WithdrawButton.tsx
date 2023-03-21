import { useDisclosure } from '@dwarvesf/react-hooks'
import { Icon } from '@iconify/react'
import React, { Fragment, useState, useCallback } from 'react'
import { button } from '~components/Dashboard/Button'
import Modal from '~components/Modal'
import { toast } from 'sonner'
import ConnectSocialButton from './ConnectSocialButton'
import WalletAddressForm from './WalletAddressForm'
import ToastSuccess from '~components/Toast/ToastSuccess'
import { noop, truncate } from '@dwarvesf/react-utils'
import { Popover } from '@headlessui/react'
import SocialButton from './components/SocialButton'
import { Float } from '@headlessui-float/react'

export default function WithdrawButton() {
  const [isDone, setIsDone] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const DropdownButton = ({
    icon,
    title,
    description,
    onClick = noop,
  }: {
    icon: React.ReactElement
    title: string
    description: string
    onClick?: () => void
  }) => {
    return (
      <button
        type="button"
        className={button({
          appearance: 'text',
          className: '!p-0 gap-x-2',
        })}
        onClick={onClick}
      >
        <div className="relative">
          {React.cloneElement(icon, {
            ...icon.props,
            className: 'w-4 h-4 md:w-6 md:h-6',
          })}
        </div>
        <div className="flex-1 text-start">
          <div className="text-sm font-semibold">{title}</div>
          <div className="mt-1 text-xs font-medium text-dashboard-gray-8">
            {description}
          </div>
        </div>
      </button>
    )
  }

  const handleSubmit = useCallback(
    async (values: { walletAddress: string }) => {
      toast.custom(() => (
        <ToastSuccess
          message="Withdraw Successful!"
          description={
            <>
              You&#39;ve successfully withdrawn all to wallet{' '}
              <span className="font-bold text-dashboard-green-1">
                {truncate(values.walletAddress, 8, true, '.')}.
              </span>
            </>
          }
        />
      ))
      onClose()
      // for mocking purpose
      setIsDone(true)
    },
    [onClose],
  )

  const wallets = [
    {
      icon: <Icon icon="cryptocurrency-color:sol" />,
      address: '0xE4eb4BbcB01247638F7D7d664F7b771F406A411a',
      amount: '$12,673 (23BTC)',
    },
    {
      icon: <Icon icon="cryptocurrency-color:sol" />,
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
            <Float
              as="div"
              floatingAs={Fragment}
              className="relative"
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
              placement="bottom"
              offset={8}
              flip
              show={isOpen ? true : undefined}
            >
              <Popover.Button
                className={button({
                  appearance: 'secondary',
                  className: 'w-full',
                })}
              >
                <Icon icon="jam:arrow-square-down-f" />
                <div>Withdraw</div>
              </Popover.Button>
              <div className="w-full">
                <Popover.Panel className="bg-[#FFFFFF] z-40 rounded-lg shadow-full">
                  <div className="flex flex-col gap-y-2 p-3 md:gap-y-4">
                    <div className="text-left">
                      <div className="text-sm font-semibold">Login & Claim</div>
                      <div className="text-xs font-medium text-dashboard-gray-8">
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

                    <hr className="w-full bg-black" />

                    {/* list wallet */}
                    {/* {wallets.map(({ address, icon, amount }, idx) => ( */}
                    {/*   <DropdownButton */}
                    {/*     key={idx} */}
                    {/*     title={truncate(address, 12, true, '.')} */}
                    {/*     description={amount} */}
                    {/*     icon={icon} */}
                    {/*   /> */}
                    {/* ))} */}
                    <DropdownButton
                      title="Connect Wallet"
                      description="Connect to an existing crypto wallet"
                      icon={
                        <Icon icon="material-symbols:account-balance-wallet" />
                      }
                    />

                    <hr className="w-full bg-black" />

                    <DropdownButton
                      title="Claim to public key"
                      description="Claim to a wallet address you specify"
                      icon={<Icon icon="tabler:circle-key-filled" />}
                      onClick={onOpen}
                    />
                  </div>
                </Popover.Panel>
              </div>
            </Float>
          </Popover>
        </>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <WalletAddressForm onSubmit={handleSubmit} onCancel={onClose} />
      </Modal>
    </>
  )
}
