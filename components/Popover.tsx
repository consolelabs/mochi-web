import {
  Popover as HeadlessPopover,
  PopoverPanelProps,
} from '@headlessui/react'
import clsx from 'clsx'
import { Float } from '@headlessui-float/react'
import { useState } from 'react'

type Props = {
  trigger: React.ReactNode
  triggerClassname?: string
  children: PopoverPanelProps<any>['children']
  panelClassname?: string
  offset?: number
}

export const Popover = (props: Props) => {
  const [isShowing, setIsShowing] = useState(false)

  return (
    <HeadlessPopover
      onMouseEnter={() => setIsShowing(true)}
      onMouseLeave={() => setIsShowing(false)}
      className="flex relative"
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
        offset={props.offset ?? 0}
        strategy="fixed"
      >
        <HeadlessPopover.Button
          className={({ open }) =>
            clsx('outline-none h-full', props.triggerClassname ?? '', {
              'text-mochi': open,
            })
          }
        >
          {props.trigger}
        </HeadlessPopover.Button>
        <HeadlessPopover.Panel
          className={clsx(
            'relative z-50 rounded-md shadow-xl',
            props.panelClassname,
          )}
        >
          {props.children}
        </HeadlessPopover.Panel>
      </Float>
    </HeadlessPopover>
  )
}
