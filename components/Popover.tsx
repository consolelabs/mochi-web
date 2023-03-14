import { Popover as HeadlessPopover, Transition } from '@headlessui/react'
import clsx from 'clsx'
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
      className="relative z-50"
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
      <Transition
        show={isShowing}
        enter="transition duration-150 ease-out"
        enterFrom="fixed md:static transform md:translate-y-3 -translate-y-4 opacity-0"
        enterTo="fixed md:static transform md:translate-y-2 -translate-y-3 opacity-100"
        leave="transition duration-150 ease-out"
        leaveFrom="fixed md:static transform md:translate-y-2 -translate-y-3 opacity-100"
        leaveTo="fixed md:static transform md:translate-y-3 -translate-y-4 opacity-0"
      >
        <HeadlessPopover.Panel
          static
          className={clsx(
            'bottom-0 md:bottom-auto -translate-y-3 md:top-full md:-translate-y-2 absolute z-50 rounded-md shadow-xl bg-white p-2',
            props.panelClassname,
          )}
        >
          {props.children}
        </HeadlessPopover.Panel>
      </Transition>
    </HeadlessPopover>
  )
}
