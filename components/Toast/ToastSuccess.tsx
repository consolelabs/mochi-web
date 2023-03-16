import { Icon } from '@iconify/react'
import React from 'react'

export default function ToastSuccess({
  message,
  description,
}: {
  message: React.ReactNode | string
  description?: React.ReactNode | string
}) {
  return (
    <div className="top-20 flex gap-x-3 p-3 pr-4 bg-[#FFFFFF] rounded-lg shadow-full">
      <Icon
        icon="tabler:square-rounded-check-filled"
        color="green"
        width={20}
        height={20}
      />
      <div className="text-green-400">
        <div className="font-semibold text-sm">{message}</div>
        <div className="mt-1 font-medium text-xs">{description}</div>
      </div>
    </div>
  )
}
