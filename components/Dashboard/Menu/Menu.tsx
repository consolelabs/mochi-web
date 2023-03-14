import { Fragment } from 'react'

export type MenuItem = {
  icon?: React.ReactNode
  text: string
  onClick?: () => void
}

type Props = {
  items: MenuItem[][]
}

export const Menu = (props: Props) => {
  const { items } = props

  return (
    <>
      {items.map((group, groupIdx) => {
        return (
          <Fragment key={`user-popover-${groupIdx}`}>
            {groupIdx !== 0 ? (
              <hr className="w-full mx-auto h-[1px] bg-black/5" />
            ) : null}
            <div className="flex flex-col">
              {group.map((item, itemIdx) => {
                return (
                  <button
                    onClick={() => item.onClick?.()}
                    key={`user-popover-item-${itemIdx}`}
                    className="flex gap-x-2 items-center py-2 px-3 whitespace-nowrap text-dashboard-gray-4"
                  >
                    {item.icon}
                    <span className="text-sm font-medium text-foreground">
                      {item.text}
                    </span>
                  </button>
                )
              })}
            </div>
          </Fragment>
        )
      })}
    </>
  )
}
