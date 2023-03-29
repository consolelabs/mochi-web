import { Icon } from '@iconify/react'
import { Input } from '~components/Dashboard/Input'
import DashboardLayout from '~components/Dashboard/Layout'
import { Table } from '~components/Dashboard/Table'
import { NextPageWithLayout } from '~pages/_app'
import useSWR from 'swr'
import { GET_PATHS } from '~constants/api'
import { useMemo, useState } from 'react'
import { useDashboardStore } from '~store'
import { useProfileStore } from '~store'
import { format } from 'date-fns'
import { TIMESTAMP_FORMAT } from '~constants/date'
import { Pagination } from '~components/Dashboard/Pagination'
import { shallow } from 'zustand/shallow'
import { ResponseDiscordGuildRole } from '~types/mochi-schema'
import { useDebounce } from '@dwarvesf/react-hooks'

const LIMIT = 20

const Members: NextPageWithLayout = () => {
  const { me } = useProfileStore(({ me }) => ({ me }), shallow)
  const {
    server,
    roles = [],
    getServerMemberList,
  } = useDashboardStore(
    ({ server, roles, getServerMemberList }) => ({
      server,
      roles,
      getServerMemberList,
    }),
    shallow,
  )

  // TODO: Use official interface from Mochi API schema
  const [metadata, setMetadata] = useState({
    sort: undefined,
    page: 1,
  })
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)

  const { data, isLoading } = useSWR(
    [GET_PATHS.USERS_TOP, server?.id, me?.id, debouncedQuery, metadata],
    ([_, guild_id, user_id, query, metadata]) => {
      if (!guild_id || !user_id) {
        return
      }

      return getServerMemberList({
        ...metadata,
        query,
        limit: LIMIT,
        guild_id,
        user_id,
        platform: 'web',
      })
    },
  )
  const members = useMemo(() => {
    return data?.data.leaderboard || []
  }, [data])
  const totalPage = useMemo(() => {
    return Math.ceil((data?.data.metadata?.total || 0) / LIMIT)
  }, [data])

  const roleMap = useMemo(() => {
    return roles.reduce((result, current) => {
      return {
        ...result,
        [current.id || '']: current,
      }
    }, {} as Record<string, ResponseDiscordGuildRole>)
  }, [roles])

  const skeletonRender = (
    <div className="flex flex-col gap-2">
      {new Array(3).fill(0).map((_, index) => {
        return (
          <div
            className="h-16 rounded-lg animate-pulse bg-white-pure"
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
                    <div className="flex gap-2 items-center">
                      <img
                        className="w-10 h-10 rounded-full"
                        alt=""
                        src={
                          original.user.guild_users[0]?.avatar
                            ? original.user.guild_users[0]?.avatar
                            : 'https://boring-avatars-api.vercel.app/api/avatar?size=40&variant=beam'
                        }
                      />
                      <div className="flex flex-col">
                        <div className="font-bold">
                          {original.user.guild_users[0]?.nickname ||
                            original.user.username}
                        </div>
                        <div className="text-xs text-dashboard-gray-8">
                          {original.user.username}#{original.user.discriminator}
                        </div>
                      </div>
                    </div>
                  )
                },
              },
              {
                Header: 'Roles',
                id: 'roles',
                minWidth: 250,
                tdClassName: 'pr-4',
                Cell: ({ row: { original } }: any) => {
                  return (
                    <div className="flex flex-wrap gap-1">
                      {original.user.guild_users[0]?.roles
                        .slice(0, 3)
                        .map((id: string) => {
                          const role = roleMap[id]

                          return (
                            <div
                              className="flex gap-1 p-1 text-xs rounded bg-dashboard-gray-3"
                              key={id}
                            >
                              {role.icon ? (
                                <img
                                  src={role.icon}
                                  className="w-4 h-4"
                                  alt=""
                                />
                              ) : (
                                <div>{role.unicode_emoji}</div>
                              )}
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
                id: 'joined',
                minWidth: 80,
                tdClassName: 'text-right',
                thClassName: 'text-right',
                Cell: ({ row: { original } }: any) => {
                  const dateString = original?.user.guild_users[0]
                    ? format(
                        new Date(original?.user.guild_users[0]?.joined_at),
                        TIMESTAMP_FORMAT,
                      )
                    : 'N/A'

                  return (
                    <div className="text-xs text-dashboard-gray-8">
                      {dateString.split(', ')[0]}
                      <br />
                      {dateString.split(', ')[1]}
                    </div>
                  )
                },
              },
            ]}
            theadClassName="text-[11px] uppercase text-dashboard-gray-2 font-bold mb-2 px-4"
            trBodyClassName="px-4 py-3 bg-white-pure rounded-lg border border-[#FFFFFF] hover:shadow hover:border-dashboard-gray-1 text-sm mb-2 transition flex items-center"
            manualSortBy
            onChange={({ sortBy }) => {
              if (sortBy.length > 0) {
                setMetadata((o: any) => ({
                  ...o,
                  sort: sortBy[0].desc ? 'DESC' : 'ASC',
                }))
              } else {
                setMetadata((o: any) => ({ ...o, sort: undefined }))
              }
            }}
          />
          {totalPage > 1 && (
            <div className="flex justify-center mt-4">
              <Pagination
                page={metadata.page}
                totalPage={totalPage}
                onChange={(page) => setMetadata((o) => ({ ...o, page }))}
              />
            </div>
          )}
        </>
      )}
    </DashboardLayout>
  )
}

export default Members
