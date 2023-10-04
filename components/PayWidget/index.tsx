import { Float } from '@headlessui-float/react'
import { Popover } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { button } from '~components/button'
import SocialButtons from '../Pay/components/SocialButtons'
import cc from 'clsx'
import Input from './input'
import Recipient from './recipient'

export default function PayWidget() {
  const [value, setValue] = useState('')
  const [typeIdx, setTypeIndex] = useState(0)

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 shadow-xl bg-white-pure w-[300px]">
      <div className="flex">
        {['Tip', 'Pay Link', 'Pay Me'].map((t, i) => {
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTypeIndex(i)}
              className={cc('whitespace-nowrap text-sm font-text flex-1 p-2', {
                'rounded-tl-xl': i === 0,
                'rounded-tr-xl': i === 2,
                'bg-white-pure': i === typeIdx,
                'bg-white border-b border-gray-200': i !== typeIdx,
                'border-l border-gray-200': i !== 0,
              })}
            >
              {t}
            </button>
          )
        })}
      </div>

      <div className="flex flex-col gap-y-3 p-3">
        <div className="flex flex-col gap-y-1 mt-1">
          {typeIdx === 0 ? (
            <>
              <span className="pb-1 text-sm text-center">
                Celebrate someone&apos;s birthday or achievement by sending them
                money
              </span>
              <Recipient />
              <Input value={value} setValue={setValue} />
            </>
          ) : typeIdx === 1 ? (
            <>
              <span className="pb-1 text-sm text-center">
                Create a PayLink and distribute them to your liking
              </span>
              <Input value={value} setValue={setValue} />
            </>
          ) : (
            <>
              <span className="pb-1 text-sm text-center">
                Remind your friend to pay you
              </span>
              <Recipient />
              <Input value={value} setValue={setValue} />
            </>
          )}
        </div>

        <Popover className="relative">
          <Float
            as="div"
            floatingAs={Fragment}
            className="relative"
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
            placement="bottom"
            offset={8}
          >
            <Popover.Button
              type="button"
              className={button({
                appearance: 'secondary',
                className: 'w-full',
                size: 'base',
              })}
            >
              Connect Options
            </Popover.Button>
            <div className="w-full">
              <Popover.Panel className="z-40 bg-white rounded-lg shadow-full">
                <div className="p-3">
                  <SocialButtons iconOnly />
                </div>
              </Popover.Panel>
            </div>
          </Float>
        </Popover>
      </div>
    </div>
  )
}
