import { useDisclosure } from '@dwarvesf/react-hooks'
import { button } from '~components/Dashboard/Button'
import Modal from '~components/Modal'
import SocialButton from './components/SocialButton'

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
            <SocialButton
              discordLink=""
              telegramLink=""
              twitterLink=""
              googleLink=""
            />
          </div>
        </div>
      </Modal>
    </>
  )
}
