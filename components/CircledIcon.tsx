import Image from 'next/image'
import React from 'react'
import { iconContainer } from '~utils/image'

type Props = {
  src: any
}

export const CircledIcon = (props: Props) => {
  return (
    <div className="flex relative justify-center items-center p-4 w-16 h-16">
      <Image fill src={iconContainer} alt="" />
      <Image
        width={40}
        height={40}
        src={props.src}
        alt=""
        className="relative"
      />
    </div>
  )
}
