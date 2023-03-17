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
        <div className="flex gap-2 items-center">
          <Link
            href={`/dashboard/${query.server_id}/quests/one-time`}
            className="text-lg text-dashboard-gray-2"
          >
            One-time Quests /
          </Link>
          <div>Create a quest</div>
        </div>
      }
      footer={
        <div className="flex justify-between py-4 mx-auto w-full max-w-5xl">
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
      {/* TODO: create one-time quest */}
    </DashboardLayout>
  )
}

export default CreateOneTimeQuest
