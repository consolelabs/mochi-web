import { useDisclosure } from '@dwarvesf/react-hooks'
import { Icon } from '@iconify/react'
import { button } from '~components/Dashboard/Button'
import Modal from '~components/Modal'
import { QRCode as QRCodeGenerator } from '~components/Wallet/QRCode'

type Props = {
  uri: string
}

export default function QRCodeInfo({ uri }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <button
        className={button({
          size: 'sm',
          className: '!py-2 !px-0 !shadow-none font-semibold',
        })}
        onClick={onOpen}
      >
        <Icon
          icon="fluent:qr-code-20-regular"
          className="text-dashboard-gray-4"
        />
        <div>QR Code</div>
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex flex-col gap-y-1 p-[14px] pb-2">
          <div className="text-center">
            <div className="font-bold">Pay Link&#39;s QR Code</div>
            <div className="mt-[2px] font-medium text-xs text-[#7A7E85]">
              Scan to open directly to this pay link:
            </div>
          </div>

          <QRCodeGenerator logoUrl={'/assets/mochi-gray.png'} uri={uri} />
        </div>
      </Modal>
    </>
  )
}
