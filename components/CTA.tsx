import React from 'react'
import { Button } from './Button'
import { DiscordIcon } from './icons/discord'

export const CTA = () => {
  return (
    <div className="body-block px-12">
      <div
        style={{
          backgroundImage: `url(/dot-bg.png), linear-gradient(90deg, #FCBCC8 0%, #D3A7F3 100%)`,
          backgroundSize: 'cover',
          backgroundBlendMode: 'overlay',
          height: 300,
        }}
        className="relative rounded-lg p-10 flex flex-col items-center justify-center"
      >
        <p className="text-3xl">Level up your community. For Free ✨</p>
        <Button appearance="secondary" className="mt-6">
          <DiscordIcon className="w-5 h-5" />
          <div>Get Mochi</div>
        </Button>
      </div>
    </div>
  )
}
