import { Icon } from '@iconify/react'
import React from 'react'

export default function ToastSuccess({
  message,
  description,
}: {
  message: React.ReactNode
  description?: React.ReactNode
}) {
  return (
    <div className="flex gap-x-3 p-3 pr-4 bg-white rounded-lg shadow-full">
      <Icon
        icon="tabler:square-rounded-check-filled"
        className="w-5 h-5 text-dashboard-green-1"
      />
      <div className="text-dashboard-green-1">
        <div className="text-sm font-semibold">{message}</div>
        <div className="mt-1 text-xs font-medium">{description}</div>
      </div>
    </div>
  )
}
