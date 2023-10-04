import { noop } from '@dwarvesf/react-utils'
import clsx from 'clsx'
import React from 'react'
import { button } from '~components/button'

export const DropdownButton = ({
  icon,
  image,
  title,
  description,
  onClick = noop,
  disabled = false,
}: {
  icon?: React.ReactElement
  image?: React.ReactElement
  title: string
  description: string
  onClick?: (args?: any) => void
  disabled?: boolean
}) => {
  return (
    <button
      type="button"
      className={button({
        appearance: 'text',
        className: clsx('!p-0 gap-x-2', {
          'opacity-40 outline-none cursor-auto': disabled,
        }),
      })}
      onClick={onClick}
    >
      <div className="flex relative flex-shrink-0 w-5 h-5 md:w-6 md:h-6">
        {icon
          ? React.cloneElement(icon, {
              ...icon.props,
              className: 'w-full h-full',
            })
          : image
          ? image
          : null}
      </div>
      <div className="flex-1 text-start">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs font-medium text-dashboard-gray-8">
          {description}
        </div>
      </div>
    </button>
  )
}
