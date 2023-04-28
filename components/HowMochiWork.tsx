import React from 'react'
import { CircledIcon } from './CircledIcon'

export const HowMochiWork = () => {
  return (
    <div className="flex relative flex-col flex-1 items-center px-6 mt-32 md:px-12 body-block">
      <p className="text-3xl font-bold">How does Mochi work?</p>
      <div className="flex flex-col self-stretch mx-24 mt-10 border-b border-b-gray-200">
        {[
          [
            'Install Mochi',
            'Choose a platform to install Mochi: Discord or Telegram!',
          ],
          [
            'Login Mochi Profile',
            'Join the Mochi world with tons of benefits.',
          ],
          [
            'Set-and-go',
            'Takes a few minutes to set up your server, then leave the rest for Mochi',
          ],
        ].map((e, i) => {
          return (
            <div
              className="flex gap-x-5 py-6 border-t border-t-gray-200"
              key={`how-mochi-work-${i}`}
            >
              <CircledIcon>
                <p className="text-lg font-black">{i + 1}</p>
              </CircledIcon>
              <div>
                <p className="text-lg font-bold">{e[0]}</p>
                <span className="font-light">{e[1]}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
