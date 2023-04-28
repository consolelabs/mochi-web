import Image from 'next/image'
import React from 'react'
import { ctaBg, mochiPfp, textCircle } from '~utils/image'
import { AddButtons } from './AddButtons'

export const CTA = () => {
  return (
    <div className="flex relative flex-col flex-1 px-6 mt-32 md:px-12 body-block">
      <div className="relative p-2 mx-auto -mb-20 rounded-full bg-near-black">
        <Image
          src={textCircle}
          alt="mochi.gg texts forming a circle"
          className="animate-spin-slow"
        />
        <Image
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          src={mochiPfp}
          alt="Mochisan profile picture"
        />
      </div>
      <Image src={ctaBg} alt="Call to action background" />
      <div className="flex absolute top-1/2 left-1/2 flex-col gap-y-8 items-center pt-36 -translate-x-1/2 -translate-y-1/2">
        <p
          className="text-3xl font-bold text-transparent bg-clip-text"
          style={{
            backgroundImage:
              'linear-gradient(90deg, #F4C4C2 0%, #EEC3FD 48.96%, #8FC6E4 100%)',
          }}
        >
          Bring Mochi.gg to your community
        </p>
        <div className="flex gap-x-3">
          <AddButtons />
        </div>
      </div>
    </div>
  )
}
