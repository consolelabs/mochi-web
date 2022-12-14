import Image from 'next/image'
import React from 'react'
import { rings } from '~utils/image'

export const RingsBackground = () => {
  return (
    <div className="absolute top-0 left-0">
      <Image src={rings} alt="" />
    </div>
  )
}
