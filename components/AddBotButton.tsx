import React from 'react'
import { button } from './Dashboard/Button'
import { Icon } from '@iconify/react'
import { Popover } from './Popover'
import clsx from 'clsx'
import { INVITE_LINK, TELEGRAM_LINK } from '~envs'

export default function AddBotButton() {
  return (
    <Popover
      trigger="Connect bot"
      triggerClassname={clsx(
        button({ size: 'sm', appearance: 'pill' }),
        'inline-flex items-center',
      )}
    >
      <div className="pt-3">
        <div className="flex flex-col gap-y-2 p-3 pr-10 bg-white rounded-3xl">
          <a href={INVITE_LINK} className="flex gap-x-2 items-center">
            <div className="p-2 w-8 h-8 bg-gray-200 rounded-md">
              <Icon icon="logos:discord-icon" className="w-full" />
            </div>
            <span className="text-sm font-semibold">Discord</span>
          </a>
          <a href={TELEGRAM_LINK} className="flex gap-x-2 items-center">
            <div className="p-2 w-8 h-8 bg-gray-200 rounded-md">
              <Icon icon="logos:telegram" className="w-full" />
            </div>
            <span className="text-sm font-semibold">Telegram</span>
          </a>
        </div>
      </div>
    </Popover>
  )
}
