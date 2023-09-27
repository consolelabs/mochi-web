import { Popover as HeadlessPopover } from '@headlessui/react'
import clsx from 'clsx'
import { Float } from '@headlessui-float/react'
import { useState } from 'react'
import { Icon } from '@iconify/react'

type Props = {
  trigger: React.ReactNode
  triggerClassname?: string
  children: Parameters<typeof HeadlessPopover.Panel>[0]['children']
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
            clsx(
              'outline-none h-full flex items-center',
              props.triggerClassname ?? '',
              {
                'text-mochi': open,
              },
            )
          }
        >
          {props.trigger}
          <Icon
            width={18}
            height={18}
            icon={
              isShowing ? 'majesticons:chevron-up' : 'majesticons:chevron-down'
            }
          />
        </HeadlessPopover.Button>
        <HeadlessPopover.Panel
          className={clsx(
            'relative z-50 rounded-md shadow-md border border-gray-200',
            props.panelClassname,
          )}
        >
          {props.children}
        </HeadlessPopover.Panel>
      </Float>
    </HeadlessPopover>
  )
}
