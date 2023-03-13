import { select } from './styles'
import { Combobox, Transition } from '@headlessui/react'
import { Fragment, useMemo, useState } from 'react'
import { Input } from '../Input'
import clsx from 'clsx'
import { Icon } from '@iconify/react'

type Option = {
  label: string
  value: string
}

type Props = Parameters<typeof select>[0] & {
  name?: string
  value?: string | string[]
  options: Option[]
  multiple?: boolean
  searchable?: boolean
  placeholder?: string
  onChange?: (value: string | string[]) => void
  renderOption?: (option: Option) => JSX.Element
}

export const Select = (props: Props) => {
  const {
    name,
    value,
    options,
    multiple = false,
    searchable = false,
    placeholder = 'Select an option',
    className,
    onChange,
    renderOption,
    ...rest
  } = props

  const [query, setQuery] = useState('')

  const selectedOption = useMemo(() => {
    if (multiple) {
      return options.filter((option) => value?.includes(option.value))
    }

    return options.find((option) => option.value === value)
  }, [options, value, multiple])

  const selectedOptionLabel = useMemo(() => {
    if (
      !selectedOption ||
      (Array.isArray(selectedOption) && selectedOption.length === 0)
    ) {
      return placeholder
    }

    if (Array.isArray(selectedOption)) {
      return (
        <div className="flex gap-1 flex-wrap text-sm">
          {selectedOption.map((option) => {
            return (
              <span
                className="py-0.5 px-2 bg-dashboard-gray-6 rounded"
                key={option.value}
              >
                {renderOption ? renderOption(option) : option.label}
              </span>
            )
          })}
        </div>
      )
    }

    return renderOption ? renderOption(selectedOption) : selectedOption.label
  }, [selectedOption, placeholder, renderOption])

  const filteredOptions = useMemo(() => {
    if (!query) {
      return options
    }

    try {
      const regexp = new RegExp(query, 'gi')
      return options.filter((option) => {
        return regexp.test(option.label)
      })
    } catch {
      return options
    }
  }, [query, options])

  return (
    <Combobox
      // @ts-ignore
      value={value}
      // @ts-ignore
      onChange={onChange}
      name={name}
      // @ts-ignore
      multiple={multiple}
      className="relative"
      as="div"
    >
      {({ open }) => {
        return (
          <>
            {searchable && (
              <Combobox.Input
                as={Input}
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                appearance={rest.appearance}
              />
            )}
            <Combobox.Button
              className={select({
                ...rest,
                className: clsx(
                  'flex justify-between items-center',
                  className,
                  {
                    'absolute top-0 left-0 h-full': searchable,
                    invisible: searchable && open,
                  },
                ),
              })}
            >
              {selectedOptionLabel}
              <Icon className="w-4 h-4" icon="heroicons:chevron-down" />
              {value && (
                <button
                  type="button"
                  className="w-5 h-5 flex items-center justify-center bg-dashboard-gray-6 rounded-full absolute top-0 right-0 mt-2.5 mr-3"
                  onClick={(e) => {
                    e.preventDefault()
                    onChange && onChange({ target: { value: '' } } as any)
                  }}
                >
                  <Icon className="w-4 h-4" icon="heroicons:x-mark" />
                </button>
              )}
            </Combobox.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition duration-100 ease-out"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#FFFFFF] py-1 text-sm shadow-lg focus:outline-none border border-black/10 z-10">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => {
                    return (
                      <Combobox.Option
                        key={option.value}
                        value={option.value}
                        as={Fragment}
                      >
                        {({ active, selected }) => {
                          return (
                            <li
                              className={`px-3 py-2 cursor-pointer hover:bg-mochi-50 transition ${
                                (active || selected) && 'bg-mochi-50'
                              }`}
                            >
                              {renderOption
                                ? renderOption(option)
                                : option.label}
                            </li>
                          )
                        }}
                      </Combobox.Option>
                    )
                  })
                ) : (
                  <div className="px-3 py-2">No result.</div>
                )}
              </Combobox.Options>
            </Transition>
          </>
        )
      }}
    </Combobox>
  )
}
