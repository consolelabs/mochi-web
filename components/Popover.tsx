import { Popover as HeadlessPopover } from '@headlessui/react'
import clsx from 'clsx'
import { Float } from '@headlessui-float/react'
import { useState } from 'react'

type Props = {
  trigger: React.ReactNode
  children: React.ReactNode
  panelClassname?: string
}

export const Popover = (props: Props) => {
  const [isShowing, setIsShowing] = useState(false)

  return (
    <HeadlessPopover
      onMouseEnter={() => setIsShowing(true)}
      onMouseLeave={() => setIsShowing(false)}
      className="relative"
    >
      <Float
        show={isShowing}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
        placement="bottom-start"
        flip
        offset={0}
      >
        <HeadlessPopover.Button
          className={({ open }) =>
            clsx('outline-none h-full', {
              'text-mochi': open,
            })
          }
        >
          {props.trigger}
        </HeadlessPopover.Button>
        <HeadlessPopover.Panel
          className={clsx(
            'relative z-50 rounded-md shadow-xl bg-white p-2',
            props.panelClassname,
          )}
        >
          {props.children}
        </HeadlessPopover.Panel>
      </Float>
    </HeadlessPopover>
  )
}
