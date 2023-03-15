import React from 'react'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import DashboardLayout from '~components/Dashboard/Layout'
import { NextPageWithLayout } from '~pages/_app'

const Quests: NextPageWithLayout = () => {
  return <span>quests page</span>
}

Quests.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout showSidebar>{page}</DashboardLayout>
}

export default Quests
