import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { button } from '~components/Dashboard/Button'
import DashboardLayout from '~components/Dashboard/Layout'

const QuestsRecurrence = () => {
  const { query } = useRouter()

  return (
    <DashboardLayout
      showSidebar
      header="Recurrence Quests"
      headerExtraRight={
        <Link href={`/dashboard/${query.server_id}/quests/recurrence/create`}>
          <button
            type="button"
            className={button({
              appearance: 'secondary',
              className: 'text-sm',
            })}
          >
            <Icon className="w-4 h-4 text-white" icon="heroicons:plus" />
            <div>Create quest</div>
          </button>
        </Link>
      }
    >
      recurrence page
    </DashboardLayout>
  )
}

export default QuestsRecurrence
