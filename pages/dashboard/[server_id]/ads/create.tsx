import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'
import React from 'react'
import DashboardLayout from '~components/Dashboard/Layout'

const Ads = () => {
  const { back } = useRouter()

  return (
    <DashboardLayout fullWidth>
      <div className="w-full flex h-full">
        <div className="w-2/5 py-10 px-5">
          <h2>
            <div className="flex items-center gap-2">
              <button type="button" onClick={back}>
                <Icon className="w-6 h-6" icon="heroicons:chevron-left" />
              </button>
              <div className="text-[22px] font-bold">Ad Name 1</div>
            </div>
          </h2>
        </div>
        <div className="w-3/5 bg-dashboard-gray-6 h-full py-10 px-5">
          ads page
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Ads
