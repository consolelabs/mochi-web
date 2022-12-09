import Image from 'next/image'
import React from 'react'

export const RingsBackground = (props: {}) => {
  return (
    <Image
      className="scale-[2]"
      objectFit="contain"
      layout="fill"
      src="/rings.png"
      alt=""
    />
  )
}
