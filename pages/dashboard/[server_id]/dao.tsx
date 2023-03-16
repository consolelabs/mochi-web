import React from 'react'
import type { ReactElement } from 'react'
import DashboardLayout from '~components/Dashboard/Layout'
import { NextPageWithLayout } from '~pages/_app'

const Dao: NextPageWithLayout = () => {
  return <span>dao page</span>
}

Dao.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout showSidebar>{page}</DashboardLayout>
}

export default Dao
