import Image from 'next/image'
import { SOCIAL_LINKS } from '~constants'
import { logo } from '~utils/image'
import { Icon } from '@iconify/react'
import { AddButtons } from '~components/AddButtons'
import Balancer from 'react-wrap-balancer'

export const Footer = () => (
  <footer className="grid flex-1 grid-cols-1 auto-rows-max justify-between px-6 pt-40 pb-16 mx-auto mt-auto max-w-7xl md:grid-cols-2 md:gap-y-16 md:px-12">
    <div className="row-start-2">
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
            <Balancer className="inline-block my-3 text-xs md:my-6">
              Our mission is to build the best growth tool for your Discord
              servers, and help you bring about and connect strong communities,
              active users with the ever-growing blockchain.
            </Balancer>
          </span>
        </div>
      </div>
    </div>
    <div className="flex flex-col items-end mb-16 md:m-0">
      <p className="text-base font-semibold text-center sm:text-lg sm:text-left">
        Level up your community. For Free ✨
      </p>
      <div className="flex flex-wrap gap-3 justify-center mt-5">
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

    <div className="mt-5 text-xs text-left text-gray-500 md:m-0 md:text-right">
      Copyright &copy; 2022+ MochiBot, All rights reserved
    </div>
  </footer>
)
