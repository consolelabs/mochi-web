import clsx from 'clsx'
import { Switch as HS } from '@headlessui/react'

type Props = {
  label?: string
  checked?: boolean
  onChange?: (value: boolean) => void
}

export const Switch = (props: Props) => {
  const { label, checked, onChange } = props

  return (
    <div className="flex gap-2 text-sm">
      <HS
        checked={checked}
        onChange={onChange}
        className="h-6 w-12 p-0.5 rounded-full bg-mochi-500"
      >
        <div
          className={clsx(
            'rounded-full aspect-square bg-white h-full shadow-lg transition',
            {
              'translate-x-0': !checked,
              'translate-x-6': checked,
            },
          )}
        />
      </HS>
      {label && <div onClick={() => onChange?.(!checked)}>{label}</div>}
    </div>
  )
}
