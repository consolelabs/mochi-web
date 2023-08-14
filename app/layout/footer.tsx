import Image from 'next/image'
import { SOCIAL_LINKS } from '~constants'
import { logo } from '~utils/image'
import { Icon } from '@iconify/react'
import Link from 'next/link'

const TITLE_COLOR = '#474645'
const BODY_COLOR = '#A8A6A4'

export const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="pt-16 pb-24 mt-auto">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="flex flex-wrap">
          <div className="flex space-x-8 sm:space-x-12 mb-10 sm:mb-0">
            <div className="w-9 h-9 rounded-full">
              <Image
                src={logo}
                alt="Logo"
                width={36}
                height={36}
                className="block rounded-full"
              />
            </div>
            <div className="text-[13px] space-y-2">
              <div className="text-footer-title">Developer</div>
              <a
                className="block text-footer-body"
                target="blank"
                href={SOCIAL_LINKS.DOCUMENT}
              >
                Documentation
              </a>
              <a
                className="block text-footer-body"
                target="blank"
                href={SOCIAL_LINKS.GITHUB}
              >
                GitHub
              </a>
            </div>
            <div className="text-[13px] space-y-2">
              <div className="text-footer-title">Resources</div>
              <Link
                className="block text-footer-body"
                target="blank"
                href="/changelog"
              >
                Changelog
              </Link>
            </div>
            <div className="text-[13px] space-y-2">
              <div className="text-footer-title">Company</div>
              <a className="block text-footer-body" href="mailto:gm@mochi.gg">
                Contact
              </a>
              <a
                className="block text-footer-body"
                target="blank"
                href={SOCIAL_LINKS.TWITTER}
              >
                Twitter
              </a>
            </div>
          </div>
          <div className="ml-auto flex flex-col justify-center items-end">
            <div className="mb-6 text-xs font-normal text-footer-body text-right">
              Copyright © {year} Mochi, All rights reserved
            </div>
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
                href={SOCIAL_LINKS.TELEGRAM}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 p-[6px] border border-[#26272B1A] rounded-full overflow-hidden"
              >
                <Icon icon="simple-icons:telegram" className="text-black" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
