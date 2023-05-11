import { useDisclosure, useHasMounted } from '@dwarvesf/react-hooks'
import { Icon } from '@iconify/react'
import { button } from '~components/Dashboard/Button'
import Modal from '~components/Modal'
import { QRCode as QRCodeGenerator } from '~components/Wallet/QRCode'
import { useMedia } from '@dwarvesf/react-hooks'
import { useEffect, useRef, useState } from 'react'
import domtoimage from 'dom-to-image'
import { FixedSizeList as List } from 'react-window'
import { useDrag, useGesture, useScroll } from '@use-gesture/react'

type Props = {
  links: string[]
  image?: string
  user?: string
  children?: React.ReactNode
}

export default function QRCodeInfo({ children, user, links, image }: Props) {
  const {
    isOpen: justCopied,
    onOpen: copied,
    onClose: clearCopied,
  } = useDisclosure()
  const hasMounted = useHasMounted()
  const [imgBlob, setImgBlob] = useState<Blob>()
  const [idx, setIdx] = useState(0)
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const qrSize = useMedia(
    ['(min-width: 640px)', '(min-width: 0px)'],
    [300, 250],
    250,
  )
  const qrOuterSize = useMedia(
    ['(min-width: 640px)', '(min-width: 0px)'],
    [318, 268],
    268,
  )

  const bind = useGesture(
    {
      onDrag: (state) => {
        let isLeft, isRight
        if (state.down) {
          state.cancel()
          isLeft = state.movement[0] < 0
          isRight = state.movement[0] > 0
        } else {
          state.cancel()
          isLeft = state.swipe[0] < 0
          isRight = state.swipe[0] > 0
        }
        if (isLeft) {
          setIdx(Math.min(idx + 1, links.length - 1))
        } else if (isRight) {
          setIdx(Math.max(idx - 1, 0))
        }
      },
    },
    { drag: { axis: 'x' } },
  )

  useEffect(() => {
    const ref = refs.current[idx]
    if (!ref) return
    domtoimage
      .toBlob(ref, {
        bgcolor: 'white',
      })
      .then(setImgBlob)
  }, [links, user, qrSize, idx])

  useEffect(() => {
    if (refs.current[idx] && hasMounted) {
      refs.current[idx]?.scrollIntoView()
    }
  }, [hasMounted, idx])

  if (!links.filter(Boolean).length) return null

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
              const ref = refs.current[idx]
              if (!ref) return
              let blob = imgBlob
              if (!blob) {
                blob = await domtoimage.toBlob(ref, {
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
          <div>
            <List
              height={qrOuterSize}
              width={qrOuterSize + 10}
              itemCount={links.length}
              itemSize={qrOuterSize + 10}
              layout="horizontal"
              /* style={{ */
              /*   overflow: 'hidden', */
              /* }} */
            >
              {({ index, style }) => {
                return (
                  <div style={style}>
                    <QRCodeGenerator
                      ref={(e) => {
                        refs.current[index] = e
                      }}
                      logoBackground="white"
                      logoUrl={image ?? '/assets/mochi-gray.png'}
                      uri={links[index]}
                      qrSize={qrSize}
                    />
                  </div>
                )
              }}
            </List>
          </div>
        </div>
      </Modal>
    </>
  )
}
