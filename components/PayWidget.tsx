import { Float } from '@headlessui-float/react'
import { Popover } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { button } from './Dashboard/Button'
import SocialButtons from './Pay/components/SocialButtons'
import cc from 'clsx'

export default function PayWidget() {
  const [value, setValue] = useState('')
  const [typeIdx, setTypeIndex] = useState(0)

  return (
    <div className="flex flex-col gap-y-3 py-3 px-3 rounded-xl border border-gray-200 shadow-xl bg-white-pure">
      <div className="flex gap-x-2">
        {['Pay Link', 'Pay Me', 'Tip'].map((t, i) => {
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTypeIndex(i)}
              className={cc('text-xs font-text', {
                underline: i === typeIdx,
              })}
            >
              {t}
            </button>
          )
        })}
      </div>

      <div className="flex overflow-hidden flex-col rounded-lg border border-gray-200">
        <div className="flex flex-col items-center py-2">
          <input
            className="text-2xl text-center outline-none"
            value={value ? `$${value} USD` : ''}
            onChange={(e) => setValue(e.target.value.replaceAll(/\D*/g, ''))}
            placeholder="$0 USD"
          />
          <span className="mt-1 text-xs font-normal text-gray-400 font-text">
            ~0.0000 ETH
          </span>
        </div>
        <div className="flex mt-1 border-t border-gray-200">
          {['$1', '$2', '$5'].map((b) => {
            return (
              <button
                key={b}
                type="button"
                onClick={() => setValue(b.replaceAll(/\D*/g, ''))}
                className="flex-1 py-1 px-4 text-sm border-r border-gray-200 hover:bg-gray-100 font-text"
              >
                {b}
              </button>
            )
          })}
        </div>
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
  )
}
