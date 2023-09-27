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
      <div className="container px-6 mx-auto max-w-5xl">
        <div className="flex flex-wrap">
          <div className="flex mb-10 space-x-8 sm:mb-0 sm:space-x-12">
            <div className="w-9 h-9 rounded-full">
              <Image
                src={logo}
                alt="Logo"
                width={36}
                height={36}
                className="block rounded-full"
              />
            </div>
            <div className="space-y-2 text-[13px]">
              <div className="text-footer-title">Home</div>
              <Link className="block text-footer-body" href="/feature">
                Feature
              </Link>
              <Link
                className="block text-footer-body"
                target="blank"
                href="/developer"
              >
                Developer
              </Link>
              <Link
                className="block text-footer-body"
                target="blank"
                href="/team"
              >
                For team
              </Link>
              <Link
                className="block text-footer-body"
                target="blank"
                href="/changelog"
              >
                What&apos;s new
              </Link>
              <Link
                className="block text-footer-body"
                target="blank"
                href="/status"
              >
                Status
              </Link>
            </div>
            <div className="space-y-2 text-[13px]">
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
            <div className="space-y-2 text-[13px]">
              <div className="text-footer-title">Company</div>
              <a className="block text-footer-body" href="mailto:gm@mochi.gg">
                Support
              </a>
              <a className="block text-footer-body" href="mailto:gm@mochi.gg">
                ToS
              </a>
            </div>
          </div>
          <div className="flex flex-col justify-center items-end ml-auto">
            <div className="mb-6 text-xs font-normal text-right text-footer-body">
              Copyright © {year} Mochi, All rights reserved
            </div>
            <div className="flex gap-4 justify-end items-center">
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
