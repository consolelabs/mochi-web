import { useDisclosure } from '@dwarvesf/react-hooks'
import { Icon } from '@iconify/react'
import { button } from '~components/Dashboard/Button'
import Modal from '~components/Modal'
import { QRCode as QRCodeGenerator } from '~components/Wallet/QRCode'
import { useMedia } from '@dwarvesf/react-hooks'

type Props = {
  uri: string
}

export default function QRCodeInfo({ uri }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const qrSize = useMedia(
    ['(min-width: 640px)', '(min-width: 0px)'],
    [300, 250],
    250,
  )

  return (
    <>
      <button
        className={button({
          size: 'sm',
          className: 'flex-1',
        })}
        onClick={onOpen}
      >
        <Icon
          icon="fluent:qr-code-28-filled"
          className="w-4 h-4 text-dashboard-gray-4"
        />
        <div className="whitespace-nowrap">QR Code</div>
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex flex-col gap-y-1 pb-2 w-full max-w-xs bg-white rounded-lg sm:max-w-md p-[14px]">
          <div className="text-center">
            <div className="font-bold">Pay Link&#39;s QR Code</div>
            <div className="text-xs font-medium mt-[2px] text-dashboard-gray-8">
              Scan to open directly to this pay link:
            </div>
          </div>

          <QRCodeGenerator
            logoBackground="white"
            logoUrl={'/assets/mochi-gray.png'}
            uri={uri}
            qrSize={qrSize}
          />
        </div>
      </Modal>
    </>
  )
}
