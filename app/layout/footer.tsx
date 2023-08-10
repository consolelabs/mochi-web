import Image from 'next/image'
import { SOCIAL_LINKS } from '~constants'
import { logo } from '~utils/image'
import { Icon } from '@iconify/react'

export const Footer = () => (
  <footer className="pt-16 pb-24 mt-auto">
    <div className="px-6 mx-auto max-w-7xl md:px-12">
      <div className="flex flex-wrap justify-between">
        <div className="text-sm text-gray-500 md:w-1/3">
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
          <span className="inline-block my-6 text-xs">
            Our mission is to build the best growth tool for your Discord
            servers, and help you bring about and connect strong communities,
            active users with the ever-growing blockchain.
          </span>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center items-end">
          <div className="flex gap-4 items-center justify-end">
            <a
              href={SOCIAL_LINKS.TWITTER}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center w-8 h-8 p-[6px] border border-[#26272B1A] rounded-full overflow-hidden"
            >
              <Icon icon="mdi:twitter" className="text-black" />
            </a>
            <a
              href={SOCIAL_LINKS.DISCORD}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center w-8 h-8 p-[6px] border border-[#26272B1A] rounded-full overflow-hidden"
            >
              <Icon icon="ic:baseline-discord" className="text-black" />
            </a>
            <a
              href={SOCIAL_LINKS.GITBOOK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center w-8 h-8 p-[6px] border border-[#26272B1A] rounded-full overflow-hidden"
            >
              <Icon icon="simple-icons:gitbook" className="text-black" />
            </a>
          </div>
          <div className="flex gap-6 w-full md:w-3/5"></div>
          <div className="pt-6 text-xs text-gray-500 text-right">
            Copyright &copy; 2022+ MochiBot, All rights reserved
          </div>
        </div>
      </div>
    </div>
  </footer>
)
