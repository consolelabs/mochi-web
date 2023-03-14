import clsx from 'clsx'
import { RadioGroup as RG } from '@headlessui/react'
import { Fragment } from 'react'

type Option = {
  label: string
  value: string
}

type Props = {
  name?: string
  value?: string | string[]
  options: Option[]
  onChange?: (value: string | string[]) => void
}

export const RadioGroup = (props: Props) => {
  const { name, value, options, onChange } = props

  return (
    <RG
      value={value}
      name={name}
      onChange={onChange}
      className="text-sm flex flex-wrap w-full"
    >
      {options.map((option, index) => {
        return (
          <RG.Option as={Fragment} value={option.value} key={option.value}>
            {({ checked }) => {
              return (
                <div
                  className={clsx(
                    'px-3 py-2 text-center border-t border-b border-l flex-1 cursor-pointer hover:border-mochi transition',
                    {
                      'border-black': option.value === value,
                      'border-black/10': option.value !== value,
                      'rounded-l-lg': index === 0,
                      'rounded-r-lg border-r': index === options.length - 1,
                      'bg-black text-white': checked,
                      'bg-[#FFFFFF]': !checked,
                    },
                  )}
                >
                  {option.label}
                </div>
              )
            }}
          </RG.Option>
        )
      })}
    </RG>
  )
}
