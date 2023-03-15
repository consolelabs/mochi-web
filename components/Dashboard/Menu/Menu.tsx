import clsx from 'clsx'
import { Icon } from '@iconify/react'
import Link from 'next/link'

export type MenuItem = {
  id: string
  icon?: React.ReactNode
  text: string
  onClick?: () => void
  url?: string
  subItems?: { text: string; url?: string; onClick?: () => void }[]
}

type Props = {
  items: [string, MenuItem[]][]
  activeId?: string
  activeIdx?: number
}

export const Menu = (props: Props) => {
  const { items, activeId, activeIdx = -1 } = props

  return (
    <div className="flex flex-col min-w-[200px]">
      {items.map((group, groupIdx) => {
        return (
          <div className="flex flex-col gap-y-1" key={`user-menu-${groupIdx}`}>
            {groupIdx != 0 && !group[0] ? (
              <hr className="my-2 mx-auto w-full h-[1px] bg-black/5" />
            ) : (
              <span
                className={clsx(
                  'uppercase mx-3 text-xs font-semibold text-dashboard-gray-4',
                  {
                    'mt-6': groupIdx !== 0,
                  },
                )}
              >
                {group[0]}
              </span>
            )}
            <div className="flex flex-col gap-y-2">
              {group[1].map((item) => {
                return (
                  <div
                    key={`user-menu-item-${item.id}`}
                    className="flex flex-col"
                  >
                    <Link
                      href={item.url ?? '#'}
                      {...(item.onClick ? { as: 'button' } : {})}
                      onClick={() => item.onClick?.()}
                      className={clsx(
                        'transition duration-100 ease-in-out',
                        'flex gap-x-2 items-center py-2 px-3 whitespace-nowrap text-dashboard-gray-4',
                        {
                          'hover:bg-dashboard-gray-1': item.id !== activeId,
                        },
                      )}
                    >
                      <div
                        className={clsx({
                          'text-mochi': item.id === activeId,
                        })}
                      >
                        {item.icon}
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {item.text}
                      </span>
                      {item.subItems ? (
                        <Icon
                          icon="octicon:chevron-down-12"
                          className="ml-auto text-foreground"
                        />
                      ) : null}
                    </Link>
                    {item.subItems ? (
                      <div className="flex flex-col">
                        {item.subItems.map((si, i) => {
                          return (
                            <Link
                              href={si.url ?? '#'}
                              {...(si.onClick ? { as: 'button' } : {})}
                              onClick={() => si.onClick?.()}
                              key={`user-menu-subitem-${item.id}-${i}`}
                              className={clsx(
                                'transition duration-100 ease-in-out',
                                'flex gap-x-2 py-2 px-3 pl-0 ml-3 rounded-lg text-sm font-medium text-foreground',
                                {
                                  'bg-transparent hover:bg-dashboard-gray-1':
                                    activeId !== item.id || i !== activeIdx,
                                  'bg-dashboard-gray-3':
                                    activeId === item.id && i === activeIdx,
                                },
                              )}
                            >
                              <div className="w-5 h-5" />
                              {si.text}
                            </Link>
                          )
                        })}
                      </div>
                    ) : null}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
