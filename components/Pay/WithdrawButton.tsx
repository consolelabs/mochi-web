import { useDisclosure } from '@dwarvesf/react-hooks'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import { button } from '~components/Dashboard/Button'
import Modal from '~components/Modal'
import toast from 'react-hot-toast'
import ConnectSocialButton from './ConnectSocialButton'
import WalletAddressForm from './WalletAddressForm'
import ToastSuccess from '~components/Toast/ToastSuccess'

export default function WithdrawButton() {
  const [isDone, setIsDone] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleAfterSubmit = (walletAddress: string) => {
    // bla bla
    toast.custom(
      () => (
        <ToastSuccess
          message="Withdraw Successful!"
          description={
            <span>
              You&#39;re successfully withdraw all to wallet{' '}
              <span className="font-bold">{walletAddress}</span>
            </span>
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

  return (
    <>
      {isDone ? (
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
      ) : (
        <button
          className={button({
            appearance: 'secondary',
          })}
          onClick={onOpen}
        >
          <Icon icon="jam:arrow-square-down-f" />
          <div>Withdraw</div>
        </button>
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
