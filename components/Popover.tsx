import { Popover as HeadlessPopover, Transition } from '@headlessui/react'
import cln from 'classnames'

type Props = {
  trigger: React.ReactNode
  children: React.ReactNode
  panelClassname?: string
}

export const Popover = (props: Props) => {
  return (
    <HeadlessPopover className="relative z-50">
      <HeadlessPopover.Button
        className={({ open }) =>
          cln('outline-none', {
            'text-mochi': open,
          })
        }
      >
        {props.trigger}
      </HeadlessPopover.Button>
      <Transition
        enter="transition duration-150 ease-out"
        enterFrom="fixed md:static transform md:translate-y-3 -translate-y-4 opacity-0"
        enterTo="fixed md:static transform md:translate-y-2 -translate-y-3 opacity-100"
        leave="transition duration-150 ease-out"
        leaveFrom="fixed md:static transform md:translate-y-2 -translate-y-3 opacity-100"
        leaveTo="fixed md:static transform md:translate-y-3 -translate-y-4 opacity-0"
      >
        <HeadlessPopover.Panel
          className={cln(
            'bottom-0 md:bottom-auto -translate-y-3 md:top-full md:translate-y-2 absolute z-50 rounded-md shadow-xl bg-white px-3 py-2',
            props.panelClassname,
          )}
        >
          {props.children}
        </HeadlessPopover.Panel>
      </Transition>
    </HeadlessPopover>
  )
}
