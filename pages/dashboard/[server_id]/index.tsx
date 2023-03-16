import React from 'react'
import type { ReactElement } from 'react'
import { heading } from '~components/Dashboard/Heading'
import DashboardLayout from '~components/Dashboard/Layout'
import { NextPageWithLayout } from '~pages/_app'

const Overview: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-x-5 items-center">
        <div className="w-20 h-20 rounded-full bg-[#E4E4E4]" />
        <p className={heading({ size: 'sm' })}>Server name</p>
      </div>
      <span className="mt-16 text-base font-medium text-foreground">About</span>
    </div>
  )
}

Overview.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout showSidebar>{page}</DashboardLayout>
}

export default Overview
