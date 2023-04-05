import { Icon } from '@iconify/react'
import { format } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'
import { Input } from '~components/Dashboard/Input'
import DashboardLayout from '~components/Dashboard/Layout'
import { Table } from '~components/Dashboard/Table'
import { TIMESTAMP_FORMAT } from '~constants/date'
import { NextPageWithLayout } from '~pages/_app'
import { useProfileStore } from '~store'
import useSWR from 'swr'
import { GET_PATHS } from '~constants/api'
import { Pagination } from '~components/Dashboard/Pagination'

const LIMIT = 20

const Activities: NextPageWithLayout = () => {
  const { me, getActivites, updateActivityReadStatus } = useProfileStore(
    ({ me, getActivites, updateActivityReadStatus }) => ({
      me,
      getActivites,
      updateActivityReadStatus,
    }),
  )
  const [query, setQuery] = useState({
    page: 0,
    limit: LIMIT,
  })

  const { data, isLoading } = useSWR(
    [GET_PATHS.PROFILE_ACTIVITES(me?.id || ''), query],
    () => getActivites(query),
  )
  const activities = useMemo(() => data?.data || [], [data])
  const totalPage = useMemo(() => {
    return Math.ceil((data?.pagination?.total || 0) / LIMIT)
  }, [data])

  useEffect(() => {
    if (activities.length > 0) {
      const activitiesToRead = activities
        .filter((activity) => activity.status === 'new')
        .map((activity) => activity.id!)

      if (activitiesToRead.length > 0) {
        updateActivityReadStatus(activitiesToRead)
      }
    }
  }, [activities]) // eslint-disable-line

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
      {isLoading || !data ? (
        skeletonRender
      ) : (
        <>
          <Table
            data={activities}
            columns={[
              {
                Header: 'Timestamp',
                accessor: 'created_at',
                Cell: ({ cell: { value }, row: { original } }: any) => {
                  return (
                    <div className="flex flex-col gap-1 text-xs">
                      <div className="text-dashboard-gray-8">
                        {format(new Date(value), TIMESTAMP_FORMAT)}
                      </div>
                      <div className="flex gap-1 items-center">
                        {original.activity_platform?.emoji && (
                          <img
                            src={original.activity_platform?.emoji}
                            alt=""
                            className="w-4 h-4"
                          />
                        )}
                        <div>{original.platform}</div>
                      </div>
                    </div>
                  )
                },
              },
              {
                Header: 'Action',
                accessor: 'action_description',
                thClassName: 'text-right',
                Cell: ({ cell: { value }, row: { original } }: any) => {
                  return (
                    <div className="flex gap-1 items-center ml-auto">
                      {original.activity_content?.emoji && (
                        <img
                          src={original.activity_content?.emoji}
                          alt=""
                          className="w-6 h-6"
                        />
                      )}
                      <div className="text-right">{value}</div>
                    </div>
                  )
                },
              },
              // {
              //   Header: 'Rewards',
              //   accessor: 'rewards',
              //   thClassName: 'text-right',
              //   Cell: ({ cell: { value } }: any) => {
              //     return (
              //       <div className="flex gap-2 items-center ml-auto">
              //         {value.map((reward: any) => {
              //           return (
              //             <div
              //               className="flex gap-1 items-center"
              //               key={reward.type}
              //             >
              //               <img src={reward.icon} alt="" className="w-6 h-6" />
              //               <div>
              //                 {reward.value} {reward.type}
              //               </div>
              //             </div>
              //           )
              //         })}
              //       </div>
              //     )
              //   },
              // },
            ]}
            theadClassName="text-[11px] uppercase text-dashboard-gray-2 font-bold mb-2 px-4"
            trBodyClassName="p-4 bg-white-pure rounded-lg border border-[#FFFFFF] hover:shadow hover:border-dashboard-gray-1 text-sm mb-2 transition"
            tdClassName="flex items-center"
          />
          {totalPage > 1 && (
            <div className="flex justify-center mt-4">
              <Pagination
                page={data.pagination?.page || 1}
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

export default Activities
