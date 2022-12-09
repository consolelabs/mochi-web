import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { Button } from '~components/Button'
import { DiscordIcon } from '~components/icons/discord'
import { PAGES, SOCIAL_LINKS } from '~constants'

const NavLinks = ({ className }: { className: string }) => (
  <div className={['flex items-center', className].join(' ')}>
    <a
      className="text-sm font-semibold"
      href="#"
      target="_blank"
      rel="noreferrer"
    >
      Feature
    </a>
    <Link href={PAGES.CHANGE_LOG.path}>
      <a className="text-sm font-semibold">{PAGES.CHANGE_LOG.title}</a>
    </Link>
    <a
      className="text-sm font-semibold"
      href="#"
      target="_blank"
      rel="noreferrer"
    >
      Community
    </a>
    <a
      className="text-sm font-semibold"
      href={SOCIAL_LINKS.DISCORD}
      target="_blank"
      rel="noreferrer"
    >
      Support
    </a>
    <a
      className="text-sm font-semibold"
      href={SOCIAL_LINKS.DISCORD}
      target="_blank"
      rel="noreferrer"
    >
      Credibility
    </a>
    <Button appearance="secondary">
      <DiscordIcon className="w-5 h-5" />
      <div className="whitespace-nowrap">Get Mochi</div>
    </Button>
  </div>
)

export const Navbar = () => (
  <Fragment>
    <nav className="relative z-20 bg-transparent">
      <div className="flex items-center max-w-7xl px-6 md:px-12 py-5 mx-auto">
        <Link href="/">
          <a className="flex items-center gap-4 text-gray-900 group">
            <div className="transition-shadow duration-200 ease-in-out rounded-full group-hover:shadow-xl w-9 h-9 group-hover:shadow-mochi-200">
              <Image
                src="/logo.png"
                alt="Logo"
                width={36}
                height={36}
                className="block rounded-full"
              />
            </div>
            <span className="font-black uppercase">
              Mochi<span className="text-mochi">.</span>
            </span>
          </a>
        </Link>
        <NavLinks className="hidden gap-10 ml-auto md:flex" />
      </div>
    </nav>
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t-2 border-t-mochi-100 overflow-auto w-screen">
      <NavLinks className="gap-7 px-3 py-2 text-sm" />
    </div>
  </Fragment>
)
