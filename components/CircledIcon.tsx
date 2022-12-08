import Image from 'next/image'
import React from 'react'

type Props = {
  src: string
}

export const CircledIcon = (props: Props) => {
  return (
    <div className="w-16 h-16 relative flex items-center justify-center">
      <Image layout="fill" src="/icon-container.png" alt="" />
      <Image width={40} height={40} src={props.src} alt="" />
    </div>
  )
}
