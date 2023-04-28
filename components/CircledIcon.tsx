import Image from 'next/image'
import React from 'react'
import { iconContainer } from '~utils/image'

type Props = {
  children: React.ReactNode
}

export const CircledIcon = (props: Props) => {
  return (
    <div className="flex relative flex-shrink-0 justify-center items-center p-4 w-14 h-14">
      <Image fill src={iconContainer} alt="" />
      <div className="relative">{props.children}</div>
    </div>
  )
}
