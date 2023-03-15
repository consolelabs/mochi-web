import React from 'react'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import DashboardLayout from '~components/Dashboard/Layout'
import { NextPageWithLayout } from '~pages/_app'

const Ads: NextPageWithLayout = () => {
  return <span>ads page</span>
}

Ads.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout showSidebar>{page}</DashboardLayout>
}

export default Ads
