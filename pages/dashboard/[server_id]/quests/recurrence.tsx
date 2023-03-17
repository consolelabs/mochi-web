import React from 'react'
import type { ReactElement } from 'react'
import DashboardLayout from '~components/Dashboard/Layout'
import { NextPageWithLayout } from '~pages/_app'

const QuestsRecurrence: NextPageWithLayout = () => {
  return <span>{/* TODO */}</span>
}

QuestsRecurrence.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout showSidebar>{page}</DashboardLayout>
}

export default QuestsRecurrence
