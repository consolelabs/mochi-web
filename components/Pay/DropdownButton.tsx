import { noop } from '@dwarvesf/react-utils'
import clsx from 'clsx'
import React from 'react'
import { button } from '~components/Dashboard/Button'

export const DropdownButton = ({
  icon,
  image,
  title,
  description,
  onClick = noop,
  wip = false,
}: {
  icon?: React.ReactElement
  image?: React.ReactElement
  title: string
  description: string
  onClick?: (args?: any) => void
  wip?: boolean
}) => {
  return (
    <button
      type="button"
      className={button({
        appearance: 'text',
        className: clsx('!p-0 gap-x-2', {
          'opacity-30 outline-none': wip,
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
