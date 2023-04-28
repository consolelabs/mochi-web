import { Icon } from '@iconify/react'
import { INVITE_LINK } from '~envs'
import { Button } from './Button'

export const AddButtons = () => {
  return (
    <>
      <Button href={INVITE_LINK} appearance="discord">
        <Icon icon="ic:baseline-discord" color="white" className="w-5" />
        <div className="whitespace-nowrap">Add Discord</div>
      </Button>
      <Button appearance="telegram" href="#">
        <Icon icon="logos:telegram" color="white" className="w-5" />
        <div className="whitespace-nowrap">Add Telegram</div>
      </Button>
    </>
  )
}
