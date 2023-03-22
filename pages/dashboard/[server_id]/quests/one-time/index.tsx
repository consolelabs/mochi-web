import { Icon } from '@iconify/react'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { button } from '~components/Dashboard/Button'
import DashboardLayout from '~components/Dashboard/Layout'
import { Switch } from '~components/Dashboard/Switch'
import { Table } from '~components/Dashboard/Table'

const mockData = [
  {
    name: 'Daily',
    data: [
      {
        // TODO: We'll be using API data for this url, no worry
        icon: '/assets/dashboard/coin.png',
        name: 'Say gm/gn',
        rewards: [
          {
            // TODO: We'll be using API data for this url, no worry
            icon: '/assets/dashboard/xp.png',
            type: 'xp',
            value: 10,
          },
          {
            icon: '/assets/dashboard/coin.png',
            type: 'coin',
            value: 10,
          },
        ],
        times: 1,
        publish: true,
      },
      {
        icon: '/assets/dashboard/coin.png',
        name: 'Check wailist',
        rewards: [
          {
            // TODO: We'll be using API data for this url, no worry
            icon: '/assets/dashboard/xp.png',
            type: 'xp',
            value: 10,
          },
          {
            icon: '/assets/dashboard/coin.png',
            type: 'coin',
            value: 10,
          },
        ],
        times: 3,
        publish: true,
      },
      {
        icon: '/assets/dashboard/coin.png',
        name: 'Click on ads',
        rewards: [
          {
            // TODO: We'll be using API data for this url, no worry
            icon: '/assets/dashboard/xp.png',
            type: 'xp',
            value: 10,
          },
          {
            icon: '/assets/dashboard/coin.png',
            type: 'coin',
            value: 10,
          },
        ],
        times: 1,
        publish: false,
      },
    ],
  },
  {
    name: 'Month',
    data: [
      {
        icon: '/assets/dashboard/coin.png',
        name: 'Say gm/gn',
        rewards: [
          {
            // TODO: We'll be using API data for this url, no worry
            icon: '/assets/dashboard/xp.png',
            type: 'xp',
            value: 10,
          },
          {
            icon: '/assets/dashboard/coin.png',
            type: 'coin',
            value: 10,
          },
        ],
        times: 1,
        publish: true,
      },
      {
        icon: '/assets/dashboard/coin.png',
        name: 'Check wailist',
        rewards: [
          {
            // TODO: We'll be using API data for this url, no worry
            icon: '/assets/dashboard/xp.png',
            type: 'xp',
            value: 10,
          },
          {
            icon: '/assets/dashboard/coin.png',
            type: 'coin',
            value: 10,
          },
        ],
        times: 3,
        publish: true,
      },
      {
        icon: '/assets/dashboard/coin.png',
        name: 'Click on ads',
        rewards: [
          {
            // TODO: We'll be using API data for this url, no worry
            icon: '/assets/dashboard/xp.png',
            type: 'xp',
            value: 10,
          },
          {
            icon: '/assets/dashboard/coin.png',
            type: 'coin',
            value: 10,
          },
        ],
        times: 1,
        publish: false,
      },
    ],
  },
]

const QuestsRecurrence = () => {
  const { query } = useRouter()

  return (
    <DashboardLayout
      showSidebar
      header="One-time Quests"
      headerExtraRight={
        <Link href={`/dashboard/${query.server_id}/quests/one-time/create`}>
          <button
            type="button"
            className={button({
              appearance: 'secondary',
              className: 'text-sm',
            })}
          >
            <Icon
              className="w-4 h-4 text-white"
              icon="heroicons:plus-20-solid"
            />
            <div>Create quest</div>
          </button>
        </Link>
      }
    >
      <div className="overflow-auto">
        <div className="inline-block px-8 mb-2 min-w-full text-xs font-bold uppercase thead text-dashboard-gray-2">
          <div className="flex trHead">
            <div className="th" style={{ flex: '1 1 400px', minWidth: 150 }}>
              Name
            </div>
            <div
              className="th text-center"
              style={{ flex: '1 1 150px', minWidth: 150 }}
            >
              Rewards
            </div>
            <div
              className="th text-center"
              style={{ flex: '1 1 150px', minWidth: 150 }}
            >
              Times
            </div>
            <div
              className="text-right th"
              style={{ flex: '1 1 150px', minWidth: 150 }}
            >
              Publish
            </div>
          </div>
        </div>
        {mockData.map((group, index) => {
          return (
            <div
              className="inline-block p-4 mb-4 min-w-full rounded-lg bg-dashboard-gray-3"
              key={index}
            >
              <div className="mb-4 text-sm font-semibold">{group.name}</div>
              <Table
                data={group.data}
                columns={[
                  {
                    accessor: 'name',
                    width: 400,
                    tdClassName: 'font-bold',
                    Cell: ({ cell: { value }, row: { original } }: any) => {
                      return (
                        <div
                          className={clsx('flex items-center gap-2', {
                            'text-dashboard-gray-3': !original.publish,
                          })}
                        >
                          <img src={original.icon} className="w-4 h-4" alt="" />
                          <div>{value}</div>
                        </div>
                      )
                    },
                  },
                  {
                    accessor: 'rewards',
                    Cell: ({ cell: { value }, row: { original } }: any) => {
                      return (
                        <div
                          className={clsx(
                            'flex items-center justify-center gap-2',
                            { 'text-dashboard-gray-8': !original.publish },
                          )}
                        >
                          {value.map((reward: any) => {
                            return (
                              <div
                                className="flex items-center gap-1"
                                key={reward.type}
                              >
                                <img
                                  src={reward.icon}
                                  className="w-4 h-4"
                                  alt=""
                                />
                                <div>{reward.value}</div>
                                <div>{reward.type}</div>
                              </div>
                            )
                          })}
                        </div>
                      )
                    },
                  },
                  {
                    accessor: 'times',
                    tdClassName: 'justify-center',
                    Cell: ({ cell: { value }, row: { original } }: any) => {
                      return (
                        <div
                          className={
                            !original.publish ? 'text-dashboard-gray-8' : ''
                          }
                        >
                          {value}
                        </div>
                      )
                    },
                  },
                  {
                    accessor: 'publish',
                    thClassName: 'text-right',
                    tdClassName: 'justify-end gap-2',
                    Cell: ({ cell: { value } }: any) => (
                      <>
                        <div className="flex gap-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition">
                          <button
                            type="button"
                            className={button({
                              appearance: 'tertiary',
                              size: 'icon',
                            })}
                          >
                            <Icon
                              className="w-4 h-4"
                              icon="mingcute:pencil-fill"
                            />
                          </button>
                          <button
                            type="button"
                            className={button({
                              appearance: 'tertiary',
                              size: 'icon',
                            })}
                          >
                            <Icon
                              className="w-4 h-4"
                              icon="mingcute:delete-fill"
                            />
                          </button>
                        </div>
                        <Switch checked={value} />
                      </>
                    ),
                  },
                ]}
                tableClassName="!overflow-visible"
                theadClassName="hidden"
                tdClassName="flex items-center"
                trBodyClassName="p-4 bg-[#FFFFFF] rounded-lg border border-[#FFFFFF] hover:shadow hover:border-dashboard-gray-1 text-sm mb-2 transition group"
              />
            </div>
          )
        })}
      </div>
    </DashboardLayout>
  )
}

export default QuestsRecurrence
