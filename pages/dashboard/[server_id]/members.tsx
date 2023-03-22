import type { ReactElement } from 'react'
import DashboardLayout from '~components/Dashboard/Layout'
import { Table } from '~components/Dashboard/Table'
import { NextPageWithLayout } from '~pages/_app'

const Members: NextPageWithLayout = () => {
  return (
    <Table
      data={[
        {
          name: 'Theresa Webb',
          avatar: 'https://picsum.photos/300/300',
          handle: '@theresawebb',
          roles: [
            {
              name: 'verified',
              icon: '/assets/dashboard/coin.png',
            },
            {
              name: 'podian',
              icon: '/assets/dashboard/xp.png',
            },
          ],
        },
        {
          name: 'Theresa Webb',
          avatar: 'https://picsum.photos/300/300',
          handle: '@theresawebb',
          roles: [
            {
              name: 'verified',
              icon: '/assets/dashboard/coin.png',
            },
            {
              name: 'podian',
              icon: '/assets/dashboard/xp.png',
            },
          ],
        },
      ]}
      columns={[
        {
          Header: 'Name',
          accessor: 'name',
          Cell: ({ cell: { value }, row: { original } }: any) => {
            return (
              <div className="flex items-center gap-2">
                <img
                  src={original.avatar}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col">
                  <div className="font-bold">{value}</div>
                  <div className="text-xs text-dashboard-gray-8">
                    {original.handle}
                  </div>
                </div>
              </div>
            )
          },
        },
        {
          Header: 'Roles',
          accessor: 'roles',
          thClassName: 'text-right',
          Cell: ({ cell: { value } }: any) => {
            return (
              <div className="flex flex-wrap gap-1 justify-end">
                {value.map((role: any) => {
                  return (
                    <div
                      className="p-1 rounded bg-dashboard-gray-3 flex gap-1 text-xs"
                      key={role.name}
                    >
                      <img src={role.icon} className="w-4 h-4" alt="" />
                      <div>{role.name}</div>
                    </div>
                  )
                })}
              </div>
            )
          },
        },
      ]}
      theadClassName="text-xs uppercase text-dashboard-gray-2 font-bold mb-2 px-4"
      trBodyClassName="p-4 bg-[#FFFFFF] rounded-lg border border-[#FFFFFF] hover:shadow hover:border-dashboard-gray-1 text-sm mb-2 transition"
    />
  )
}

Members.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout showSidebar header="Members">
      {page}
    </DashboardLayout>
  )
}

export default Members
