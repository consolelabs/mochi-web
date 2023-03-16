import React from 'react'
import type { ReactElement } from 'react'
import DashboardLayout from '~components/Dashboard/Layout'
import { NextPageWithLayout } from '~pages/_app'
import { heading } from '~components/Dashboard/Heading'

const Account: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col">
      <p className={heading({ size: 'sm' })}>Account</p>
    </div>
  )
}

Account.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout showSidebar>{page}</DashboardLayout>
}

export default Account
