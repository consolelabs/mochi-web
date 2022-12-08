import Image from 'next/image'
import React from 'react'

export const RingsBackground = (props: {}) => {
  return <Image objectFit="contain" layout="fill" src="/rings.png" alt="" />
}
