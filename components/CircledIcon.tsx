import Image from 'next/image'
import React from 'react'
import { iconContainer } from '~utils/image'

type Props = {
  src: any
}

export const CircledIcon = (props: Props) => {
  return (
    <div className="w-16 h-16 relative flex items-center justify-center">
      <Image layout="fill" src={iconContainer} alt="" />
      <Image width={40} height={40} src={props.src} alt="" />
    </div>
  )
}
