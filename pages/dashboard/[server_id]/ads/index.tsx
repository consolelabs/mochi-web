import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { button } from '~components/Dashboard/Button'
import DashboardLayout from '~components/Dashboard/Layout'

const Ads = () => {
  const { query } = useRouter()

  return (
    <DashboardLayout
      showSidebar
      header="Ads"
      headerExtraRight={
        <Link href={`/dashboard/${query.server_id}/ads/create`}>
          <button
            type="button"
            className={button({ appearance: 'secondary', size: 'base' })}
          >
            <Icon className="w-4 h-4 text-white" icon="heroicons:plus" />
            <span className="text-white text-sm">Create ad</span>
          </button>
        </Link>
      }
    >
      ads page
    </DashboardLayout>
  )
}

export default Ads
