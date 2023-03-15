import React from 'react'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import DashboardLayout from '~components/Dashboard/Layout'
import { NextPageWithLayout } from '~pages/_app'

const Home: NextPageWithLayout = () => {
  return <div>const Home: NextPageWithLayout = list of servers</div>
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Home
