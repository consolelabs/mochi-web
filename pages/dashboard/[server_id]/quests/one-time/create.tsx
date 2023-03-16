import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { button } from '~components/Dashboard/Button'
import DashboardLayout from '~components/Dashboard/Layout'

const CreateOneTimeQuest = () => {
  const { query, back } = useRouter()

  return (
    <DashboardLayout
      header={
        <div className="flex items-center gap-2">
          <Link
            href={`/dashboard/${query.server_id}/quests/one-time`}
            className="text-dashboard-gray-2 text-lg"
          >
            One-time Quests /
          </Link>
          <div>Create a quest</div>
        </div>
      }
      footer={
        <div className="py-4 max-w-5xl mx-auto flex justify-between">
          <button
            type="button"
            className={button({ appearance: 'text' })}
            onClick={back}
          >
            Back
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              className={button({ appearance: 'tertiary' })}
            >
              Cancel
            </button>
            <button
              type="button"
              className={button({ appearance: 'secondary' })}
            >
              Next
            </button>
          </div>
        </div>
      }
    >
      one time create
    </DashboardLayout>
  )
}

export default CreateOneTimeQuest
