import React from 'react'
import DashboardLayout from '~components/Dashboard/Layout'
import { AdsForm } from '~components/pages/dashboard/ads/AdsForm'

const Ads = () => {
  return (
    <DashboardLayout fullWidth>
      <AdsForm />
    </DashboardLayout>
  )
}

export default Ads
