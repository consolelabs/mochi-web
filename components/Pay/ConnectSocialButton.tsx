import { useDisclosure } from '@dwarvesf/react-hooks'
import { Icon } from '@iconify/react'
import { button } from '~components/Dashboard/Button'
import Modal from '~components/Modal'

export default function ConnectSocialButton() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <button
        className={button({
          appearance: 'gray',
        })}
        onClick={onOpen}
      >
        <div>Connect Social Links</div>
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="p-3 min-w-[340px]">
          <div className="font-semibold">Connect social links</div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              className={button({
                className: '!shadow-none font-semibold',
              })}
            >
              <Icon icon="ic:baseline-discord" />
              <div>Discord</div>
            </button>
            <button
              className={button({
                className: '!shadow-none font-semibold',
              })}
            >
              <Icon icon="ic:baseline-telegram" />
              <div>Telegram</div>
            </button>
            <button
              className={button({
                className: '!shadow-none font-semibold',
              })}
            >
              <Icon icon="mdi:twitter" />
              <div>Twitter</div>
            </button>
            <button
              className={button({
                className: '!shadow-none font-semibold',
              })}
            >
              <Icon icon="mingcute:google-fill" />
              <div>Google</div>
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
