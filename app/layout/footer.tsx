import Image from 'next/image'
import { SOCIAL_LINKS } from '~constants'
import { logo } from '~utils/image'
import { Icon } from '@iconify/react'
import { AddButtons } from '~components/AddButtons'
import Balancer from 'react-wrap-balancer'

export const Footer = () => (
  <footer className="grid flex-1 grid-cols-2 auto-rows-max gap-y-16 justify-between px-6 pt-40 pb-16 mx-auto mt-auto max-w-7xl md:px-12">
    <div>
      <div className="flex flex-wrap">
        <div className="w-full text-sm text-gray-500">
          <div className="flex gap-4 items-center">
            <div
              className="w-9 h-9 rounded-full shadow-mochi"
              style={{
                boxShadow: '0 0 3rem var(--tw-shadow-color)',
              }}
            >
              <Image
                src={logo}
                alt="Logo"
                width={36}
                height={36}
                className="block rounded-full"
              />
            </div>
            <span className="text-lg font-black text-gray-900 uppercase">
              Mochi<span className="text-mochi">.</span>
            </span>
          </div>
          <span>
            <Balancer className="inline-block my-6 text-xs">
              Our mission is to build the best growth tool for your Discord
              servers, and help you bring about and connect strong communities,
              active users with the ever-growing blockchain.
            </Balancer>
          </span>
        </div>
      </div>
    </div>
    <div className="flex flex-col items-end">
      <p className="text-lg font-semibold">
        Level up your community. For Free ✨
      </p>
      <div className="flex gap-x-2 mt-5">
        <AddButtons />
      </div>
    </div>

    <div className="flex gap-4 items-center">
      <a href={SOCIAL_LINKS.TWITTER} target="_blank" rel="noreferrer">
        <Icon icon="mdi:twitter" className="w-4 h-4 text-gray-500" />
      </a>
      <a href={SOCIAL_LINKS.DISCORD} target="_blank" rel="noreferrer">
        <Icon icon="ic:baseline-discord" className="w-4 h-4 text-gray-500" />
      </a>
      <a href={SOCIAL_LINKS.GITBOOK} target="_blank" rel="noreferrer">
        <Icon icon="simple-icons:gitbook" className="w-4 h-4 text-gray-500" />
      </a>
    </div>

    <div className="text-xs text-right text-gray-500">
      Copyright &copy; 2022+ MochiBot, All rights reserved
    </div>
  </footer>
)
