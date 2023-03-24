import { Icon } from '@iconify/react'
import { format } from 'date-fns'
import { Input } from '~components/Dashboard/Input'
import DashboardLayout from '~components/Dashboard/Layout'
import { Table } from '~components/Dashboard/Table'
import { TIMESTAMP_FORMAT } from '~constants/date'
import { NextPageWithLayout } from '~pages/_app'

const Activities: NextPageWithLayout = () => {
  return (
    <DashboardLayout
      showSidebar
      header="Activities"
      headerExtraRight={
        <div className="max-w-[200px]">
          <Input
            placeholder="Search"
            prefix={
              <Icon
                className="w-5 h-5"
                icon="heroicons:magnifying-glass-20-solid"
              />
            }
            prefixProps={{
              appearance: 'bgless',
              className: 'pointer-events-none pr-0',
            }}
          />
        </div>
      }
    >
      <Table
        data={[
          {
            timestamp: '2023-03-22T08:16:39.284Z',
            service: {
              name: 'Mochi App',
              icon: '/assets/dashboard/coin.png',
            },
            action: {
              icon: '/assets/dashboard/coin.png',
              detail: 'Used 3 $ticker',
            },
            rewards: [
              {
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
          },
          {
            timestamp: '2023-03-22T08:16:39.284Z',
            service: {
              name: 'Mochi App',
              icon: '/assets/dashboard/coin.png',
            },
            action: {
              icon: '/assets/dashboard/coin.png',
              detail: 'Used 3 $ticker',
            },
            rewards: [
              {
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
          },
          {
            timestamp: '2023-03-22T08:16:39.284Z',
            service: {
              name: 'Mochi App',
              icon: '/assets/dashboard/coin.png',
            },
            action: {
              icon: '/assets/dashboard/coin.png',
              detail: 'Used 3 $ticker',
            },
            rewards: [
              {
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
          },
        ]}
        columns={[
          {
            Header: 'Timestamp',
            accessor: 'timestamp',
            Cell: ({ cell: { value }, row: { original } }: any) => {
              return (
                <div className="flex flex-col gap-1 text-xs">
                  <div className="text-dashboard-gray-8">
                    {format(new Date(value), TIMESTAMP_FORMAT)}
                  </div>
                  <div className="flex gap-1 items-center">
                    <img
                      src={original.service.icon}
                      alt=""
                      className="w-4 h-4"
                    />
                    <div>{original.service.name}</div>
                  </div>
                </div>
              )
            },
          },
          {
            Header: 'Action',
            accessor: 'action',
            Cell: ({ cell: { value } }: any) => {
              return (
                <div className="flex items-center gap-1">
                  <img src={value.icon} alt="" className="w-6 h-6" />
                  <div>{value.detail}</div>
                </div>
              )
            },
          },
          {
            Header: 'Rewards',
            accessor: 'rewards',
            thClassName: 'text-right',
            Cell: ({ cell: { value } }: any) => {
              return (
                <div className="flex items-center ml-auto gap-2">
                  {value.map((reward: any) => {
                    return (
                      <div
                        className="flex items-center gap-1"
                        key={reward.type}
                      >
                        <img src={reward.icon} alt="" className="w-6 h-6" />
                        <div>
                          {reward.value} {reward.type}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            },
          },
        ]}
        theadClassName="text-[11px] uppercase text-dashboard-gray-2 font-bold mb-2 px-4"
        trBodyClassName="p-4 bg-white-pure rounded-lg border border-[#FFFFFF] hover:shadow hover:border-dashboard-gray-1 text-sm mb-2 transition"
        tdClassName="flex items-center"
      />
    </DashboardLayout>
  )
}

export default Activities
