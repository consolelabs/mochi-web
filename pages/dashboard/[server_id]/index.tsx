import React from 'react'
import type { ReactElement } from 'react'
import { heading } from '~components/Dashboard/Heading'
import DashboardLayout from '~components/Dashboard/Layout'
import { NextPageWithLayout } from '~pages/_app'
import { useDashboardStore } from '~store'

const Overview: NextPageWithLayout = () => {
  const { server } = useDashboardStore()

  return (
    <div className="flex flex-col">
      <div className="flex gap-x-5 items-center">
        <img
          className="w-20 h-20 rounded-full bg-[#E4E4E4]"
          alt=""
          src={
            server?.icon
              ? server.icon
              : `https://boring-avatars-api.vercel.app/api/avatar?size=40&variant=marble`
          }
        />
        <p className={heading({ size: 'sm' })}>{server?.name}</p>
      </div>
      <span className="mt-16 text-base font-medium text-foreground">About</span>
    </div>
  )
}

Overview.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout showSidebar>{page}</DashboardLayout>
}

export default Overview
