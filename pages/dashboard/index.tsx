import type { ReactElement } from 'react'
import DashboardLayout from '~components/Dashboard/Layout'
import { NextPageWithLayout } from '~pages/_app'
import Home from './Home'

const Dashboard: NextPageWithLayout = () => {
  return <Home />
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Dashboard
