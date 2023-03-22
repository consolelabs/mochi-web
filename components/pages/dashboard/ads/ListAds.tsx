import { Switch } from '~components/Dashboard/Switch'
import { Icon } from '@iconify/react'
import { button } from '~components/Dashboard/Button'
import { Table } from '~components/Dashboard/Table'

type Ads = {
  adName: string
  budget: 'Free' | 'Premium'
  schedule: 'Ongoing' | 'End'
  publish: boolean
}

export default function ListAds() {
  const mockData: Ads[] = [
    {
      adName: 'Ad name',
      budget: 'Free',
      schedule: 'Ongoing',
      publish: true,
    },
    {
      adName: 'Ad name',
      budget: 'Free',
      schedule: 'End',
      publish: true,
    },
    {
      adName: 'Ad name',
      budget: 'Premium',
      schedule: 'Ongoing',
      publish: false,
    },
  ]

  return (
    <>
      <div className="overflow-auto">
        <Table
          data={mockData}
          columns={[
            {
              Header: 'Name',
              accessor: 'adName',
              width: 300,
              tdClassName: 'font-bold pl-4', // add padding left for first col
              Cell: ({ cell: { value } }: any) => {
                return <div>{value}</div>
              },
            },
            {
              Header: 'Budget',
              accessor: 'budget',
              Cell: ({ cell: { value }, row: { original } }: any) => {
                return (
                  <span
                    className={!original.publish ? 'text-dashboard-gray-8' : ''}
                  >
                    {value}
                  </span>
                )
              },
            },
            {
              Header: 'Schedule',
              accessor: 'schedule',
              defaultCanSort: true,
              Cell: ({ cell: { value }, row: { original } }: any) => {
                return (
                  <span
                    className={!original.publish ? 'text-dashboard-gray-8' : ''}
                  >
                    {value}
                  </span>
                )
              },
            },
            {
              Header: 'Publish',
              accessor: 'publish',
              thClassName: 'text-right',
              tdClassName: 'justify-end gap-2 pr-4', // add padding right for last col
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
                      <Icon className="w-4 h-4" icon="mingcute:pencil-fill" />
                    </button>
                    <button
                      type="button"
                      className={button({
                        appearance: 'tertiary',
                        size: 'icon',
                      })}
                    >
                      <Icon className="w-4 h-4" icon="mingcute:delete-fill" />
                    </button>
                  </div>
                  <Switch checked={value} />
                </>
              ),
            },
          ]}
          tableClassName="!overflow-visible"
          theadClassName="mb-2 text-xs font-bold uppercase thead text-dashboard-gray-2"
          tdClassName="flex items-center"
          trBodyClassName="py-4 bg-[#FFFFFF] rounded-lg border border-[#FFFFFF] hover:shadow hover:border-dashboard-gray-1 text-sm mb-2 transition group"
        />
      </div>
    </>
  )
}
