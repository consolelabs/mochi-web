import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import { useAppWalletContext } from '~context/wallet-context'
import { Menu } from './Menu'
import { MenuItem } from './Menu/Menu'

const routesMap: Record<string, { activeId: string; activeIdx?: number }> = {
  '/dashboard/[server_id]': { activeId: 'overview' },
  '/dashboard/[server_id]/ads': { activeId: 'ads' },
  '/dashboard/[server_id]/quests': { activeId: 'quests' },
  '/dashboard/[server_id]/quests/recurrence': {
    activeId: 'quests',
    activeIdx: 0,
  },
  '/dashboard/[server_id]/quests/one-time': {
    activeId: 'quests',
    activeIdx: 1,
  },
  '/dashboard/[server_id]/quests/event': { activeId: 'quests', activeIdx: 2 },
  '/dashboard/[server_id]/dao': { activeId: 'dao' },
  '/dashboard/[server_id]/members': { activeId: 'members' },
}

const getDefaultItems = (query: ParsedUrlQuery): [string, MenuItem[]][] => [
  [
    'server settings',
    [
      {
        id: 'overview',
        icon: <Icon icon="mingcute:copy-2-fill" className="w-5 h-5" />,
        text: 'Overview',
        url: `/dashboard/${query.server_id}`,
      },
      {
        id: 'ads',
        icon: <Icon icon="mingcute:copy-2-fill" className="w-5 h-5" />,
        text: 'Ads',
        url: `/dashboard/${query.server_id}/ads`,
      },
      {
        id: 'quests',
        icon: <Icon icon="mingcute:copy-2-fill" className="w-5 h-5" />,
        text: 'Quests',
        subItems: [
          {
            text: 'Recurrence',
            url: `/dashboard/${query.server_id}/quests/recurrence`,
          },
          {
            text: 'One-time',
            url: `/dashboard/${query.server_id}/quests/one-time`,
          },
          {
            text: 'Event',
            url: `/dashboard/${query.server_id}/quests/event`,
          },
        ],
        url: `/dashboard/${query.server_id}/quests`,
      },
      {
        id: 'dao',
        icon: <Icon icon="mingcute:copy-2-fill" className="w-5 h-5" />,
        text: 'DAO',
        url: `/dashboard/${query.server_id}/dao`,
      },
      {
        id: 'members',
        icon: <Icon icon="mingcute:copy-2-fill" className="w-5 h-5" />,
        text: 'Members',
        url: `/dashboard/${query.server_id}/members`,
      },
    ],
  ],
]

const getSettingItems = (): [string, MenuItem[]][] => [
  [
    'account settings',
    [
      {
        id: 'settings-account',
        icon: <Icon icon="mingcute:copy-2-fill" className="w-5 h-5" />,
        text: 'Account',
        url: `/dashboard/settings/account`,
      },
      {
        id: 'settings-notification',
        icon: <Icon icon="mingcute:copy-2-fill" className="w-5 h-5" />,
        text: 'Notifications',
        url: `/dashboard/settings/notifications`,
      },
      {
        id: 'settings-reminders',
        icon: <Icon icon="mingcute:copy-2-fill" className="w-5 h-5" />,
        text: 'Reminders',
        url: `/dashboard/settings/reminders`,
      },
      {
        id: 'settings-integrations',
        icon: <Icon icon="mingcute:copy-2-fill" className="w-5 h-5" />,
        text: 'Integrations',
        url: `/dashboard/settings/integrations`,
      },
      {
        id: 'settings-currency',
        icon: <Icon icon="mingcute:copy-2-fill" className="w-5 h-5" />,
        text: 'Currency',
        url: `/dashboard/settings/currency`,
      },
    ],
  ],
  [
    'activities',
    [
      {
        id: 'settings-quests',
        icon: <Icon icon="mingcute:copy-2-fill" className="w-5 h-5" />,
        text: 'Quests',
        url: `/dashboard/settings/quests`,
      },
      {
        id: 'settings-registered-game',
        icon: <Icon icon="mingcute:copy-2-fill" className="w-5 h-5" />,
        text: 'Registered Game',
        url: `/dashboard/settings/registered-game`,
      },
      {
        id: 'settings-game-overlay',
        icon: <Icon icon="mingcute:copy-2-fill" className="w-5 h-5" />,
        text: 'Game Overlay',
        url: `/dashboard/settings/game-overlay`,
      },
    ],
  ],
]

const settingRoutesMap: Record<
  string,
  { activeId: string; activeIdx?: number }
> = {
  '/dashboard/settings/account': { activeId: 'settings-account' },
}

export default function Sidebar() {
  const { pathname, query } = useRouter()
  const { disconnect } = useAppWalletContext()

  if (pathname.startsWith('/dashboard/settings')) {
    return (
      <Menu
        {...settingRoutesMap[pathname]}
        items={getSettingItems().concat([
          [
            '',
            [
              {
                id: 'logout',
                icon: <Icon icon="majesticons:logout" className="w-5 h-5" />,
                text: 'Logout',
                url: '/dashboard',
                onClick: () => disconnect(),
              },
            ],
          ],
        ])}
      />
    )
  }

  return <Menu {...routesMap[pathname]} items={getDefaultItems(query)} />
}
