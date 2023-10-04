import { useDisclosure } from '@dwarvesf/react-hooks'
import { button } from '~components/button'
import Modal from '~components/Modal'
import SocialButtons from './components/SocialButtons'

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
        <div className="p-3 bg-white rounded-lg min-w-[340px]">
          <div className="font-semibold">Connect social links</div>
          <div className="mt-4">
            <SocialButtons />
          </div>
        </div>
      </Modal>
    </>
  )
}
