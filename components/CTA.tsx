import React from 'react'
import { INVITE_LINK } from '~envs'
import { Button } from './Button'
import { Icon } from '@iconify/react'

export const CTA = () => {
  return (
    <div className="px-6 md:px-12 body-block">
      <div
        style={{
          backgroundImage: `url(/dot-bg.png), linear-gradient(90deg, #FCBCC8 0%, #D3A7F3 100%)`,
          backgroundSize: 'cover',
          backgroundBlendMode: 'overlay',
          height: 300,
        }}
        className="flex relative flex-col justify-center items-center p-10 rounded-lg"
      >
        <p className="text-lg text-center md:text-3xl">
          Level up your community. For Free ✨
        </p>
        <Button href={INVITE_LINK} appearance="secondary" className="mt-6">
          <Icon icon="ic:baseline-discord" className="w-5 h-5" />
          <div>Get Mochi</div>
        </Button>
      </div>
    </div>
  )
}
