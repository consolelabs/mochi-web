import { useDisclosure } from '@dwarvesf/react-hooks'
import { Icon } from '@iconify/react'
import { button } from '~components/Dashboard/Button'
import Modal from '~components/Modal'
import { QRCode as QRCodeGenerator } from '~components/Wallet/QRCode'
import { useMedia } from '@dwarvesf/react-hooks'
import { useEffect, useRef, useState } from 'react'
import domtoimage from 'dom-to-image'

type Props = {
  link: string
  image?: string
  user?: string
  children?: React.ReactNode
}

export default function QRCodeInfo({ children, user, link, image }: Props) {
  const {
    isOpen: justCopied,
    onOpen: copied,
    onClose: clearCopied,
  } = useDisclosure()
  const [imgBlob, setImgBlob] = useState<Blob>()
  const ref = useRef<HTMLDivElement>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const qrSize = useMedia(
    ['(min-width: 640px)', '(min-width: 0px)'],
    [300, 250],
    250,
  )

  useEffect(() => {
    if (!ref.current) return
    domtoimage
      .toBlob(ref.current, {
        bgcolor: 'white',
      })
      .then(setImgBlob)
  }, [link, user, qrSize])

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
        {children ?? <div className="whitespace-nowrap">QR Code</div>}
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex flex-col gap-y-1 pb-2 w-full max-w-xs bg-white rounded-lg sm:max-w-md p-[14px]">
          <div className="text-center">
            <div className="font-bold">Pay Link&#39;s QR Code</div>
            <div className="text-xs font-medium mt-[2px] text-dashboard-gray-8">
              Scan to open directly to this pay link:
            </div>
          </div>

          <button
            onClick={async () => {
              if (!ref.current) return
              let blob = imgBlob
              if (!blob) {
                blob = await domtoimage.toBlob(ref.current, {
                  bgcolor: 'white',
                })
                setImgBlob(blob)
              }
              await navigator.clipboard
                .write([
                  new ClipboardItem({
                    'image/png': blob,
                  }),
                ])
                .then(copied)
                .then(setTimeout.bind(window, clearCopied, 500))
            }}
            className={button({ size: 'sm', className: 'mx-auto my-2' })}
          >
            {justCopied ? 'Copied!' : 'Copy QR Code'}
          </button>
          <QRCodeGenerator
            ref={ref}
            logoBackground="white"
            logoUrl={image ?? '/assets/mochi-gray.png'}
            uri={link}
            qrSize={qrSize}
            caption={user}
          />
        </div>
      </Modal>
    </>
  )
}
