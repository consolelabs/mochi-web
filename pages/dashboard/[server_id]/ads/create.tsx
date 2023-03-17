import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'
import React from 'react'
import DashboardLayout from '~components/Dashboard/Layout'

const Ads = () => {
  const { back } = useRouter()

  return (
    <DashboardLayout fullWidth>
      <div className="flex w-full h-full">
        <div className="py-10 px-5 w-2/5">
          <h2>
            <div className="flex gap-2 items-center">
              <button type="button" onClick={back}>
                <Icon className="w-6 h-6" icon="heroicons:chevron-left" />
              </button>
              <div className="font-bold text-[22px]">Ad Name 1</div>
            </div>
          </h2>
        </div>
        <div className="py-10 px-5 w-3/5 h-full bg-dashboard-gray-6">
          {/* TODO: add content here */}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Ads
