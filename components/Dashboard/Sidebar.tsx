import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'
import React from 'react'
import { Menu } from './Menu'

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
}

export default function Sidebar() {
  const { pathname, query } = useRouter()

  return (
    <Menu
      {...routesMap[pathname]}
      items={[
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
          ],
        ],
      ]}
    />
  )
}
