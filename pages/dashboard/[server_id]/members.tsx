import { Icon } from '@iconify/react'
import { Input } from '~components/Dashboard/Input'
import DashboardLayout from '~components/Dashboard/Layout'
import { Table } from '~components/Dashboard/Table'
import { NextPageWithLayout } from '~pages/_app'
import useSWR from 'swr'
import { GET_PATHS } from '~constants/api'
import { useMemo, useState } from 'react'
import { useDashboardStore } from '~store/dashboard'
import { useAuthStore } from '~store'
import { format } from 'date-fns'
import { TIMESTAMP_FORMAT } from '~constants/date'
import { Pagination } from '~components/Dashboard/Pagination'
import { shallow } from 'zustand/shallow'

const LIMIT = 10

const Members: NextPageWithLayout = () => {
  const { me } = useAuthStore(({ me }) => ({ me }), shallow)
  const { server, getServerMemberList } = useDashboardStore(
    ({ server, getServerMemberList }) => ({
      server,
      getServerMemberList,
    }),
    shallow,
  )

  // TODO: Use official interface from Mochi API schema
  const [query, setQuery] = useState({
    q: '',
    page: 1,
    limit: LIMIT,
    sortBy: [],
  })

  const { data, isLoading } = useSWR(
    [GET_PATHS.USERS_TOP, query, server, me],
    () => {
      if (!server || !me) {
        return
      }

      return getServerMemberList({
        ...query,
        guild_id: server.id,
        user_id: me?.id,
      })
    },
  )
  const members = useMemo(() => {
    return data?.data.leaderboard || []
  }, [data])
  const totalPage = useMemo(() => {
    return Math.ceil((data?.data.metadata.total || 0) / LIMIT)
  }, [data])

  const skeletonRender = (
    <div className="flex flex-col gap-2">
      {new Array(3).fill(0).map((_, index) => {
        return (
          <div
            className="h-16 bg-white-pure animate-pulse rounded-lg"
            key={index}
          />
        )
      })}
    </div>
  )

  return (
    <DashboardLayout
      showSidebar
      header="Members"
      headerExtraRight={
        <div className="max-w-[200px]">
          <Input
            onChange={(e) =>
              setQuery((o: any) => ({ ...o, q: e.target.value }))
            }
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
      {isLoading || !data ? (
        skeletonRender
      ) : (
        <>
          <Table
            data={members}
            columns={[
              {
                Header: 'Name',
                id: 'name',
                minWidth: 250,
                Cell: ({ row: { original } }: any) => {
                  return (
                    <div className="flex items-center gap-2">
                      <img
                        className="w-10 h-10 rounded-full"
                        alt=""
                        src="https://boring-avatars-api.vercel.app/api/avatar?size=40&variant=beam"
                      />
                      <div className="flex flex-col">
                        <div className="font-bold">
                          {original.user.username}
                        </div>
                        <div className="text-xs text-dashboard-gray-8">
                          @{original.user.handle || ''}
                        </div>
                      </div>
                    </div>
                  )
                },
              },
              {
                Header: 'Roles',
                accessor: 'roles',
                id: 'roles',
                minWidth: 200,
                Cell: () => {
                  return (
                    <div className="flex flex-wrap gap-1">
                      {[
                        {
                          name: 'verified',
                          icon: '/assets/dashboard/coin.png',
                        },
                        {
                          name: 'podian',
                          icon: '/assets/dashboard/xp.png',
                        },
                      ].map((role: any) => {
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
              {
                Header: 'Total XP',
                accessor: 'total_xp',
                defaultCanSort: true,
                minWidth: 80,
                Cell: ({ cell: { value } }: any) => {
                  return (
                    <div className="flex gap-1 text-xs">
                      <img
                        src="/assets/dashboard/xp.png"
                        className="w-4 h-4"
                        alt=""
                      />
                      <div>{value}xp</div>
                    </div>
                  )
                },
              },
              {
                Header: 'Joined',
                accessor: 'joined',
                id: 'joined',
                minWidth: 100,
                tdClassName: 'text-right',
                thClassName: 'text-right',
                Cell: ({ cell: { value } }: any) => {
                  return (
                    <div className="text-xs text-dashboard-gray-8">
                      {format(new Date(), TIMESTAMP_FORMAT)}
                    </div>
                  )
                },
              },
            ]}
            theadClassName="text-[11px] uppercase text-dashboard-gray-2 font-bold mb-2 px-4"
            trBodyClassName="p-4 bg-white-pure rounded-lg border border-[#FFFFFF] hover:shadow hover:border-dashboard-gray-1 text-sm mb-2 transition flex items-center"
            manualSortBy
            onChange={({ sortBy }) => {
              setQuery((o: any) => ({ ...o, sortBy }))
            }}
          />
          {totalPage > 1 && (
            <div className="mt-4 flex justify-center">
              <Pagination
                page={query.page}
                totalPage={totalPage}
                onChange={(page) => setQuery((o) => ({ ...o, page }))}
              />
            </div>
          )}
        </>
      )}
    </DashboardLayout>
  )
}

export default Members
