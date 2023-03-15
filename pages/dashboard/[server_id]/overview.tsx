import React from 'react'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import DashboardLayout from '~components/Dashboard/Layout'
import { NextPageWithLayout } from '~pages/_app'

const Overview: NextPageWithLayout = () => {
  return <span>overview page</span>
}

Overview.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout showSidebar>{page}</DashboardLayout>
}

export default Overview
