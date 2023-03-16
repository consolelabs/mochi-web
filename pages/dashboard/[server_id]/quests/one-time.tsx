import React from 'react'
import type { ReactElement } from 'react'
import DashboardLayout from '~components/Dashboard/Layout'
import { NextPageWithLayout } from '~pages/_app'

const QuestsOneTime: NextPageWithLayout = () => {
  return <span>quests event page</span>
}

QuestsOneTime.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout showSidebar>{page}</DashboardLayout>
}

export default QuestsOneTime
