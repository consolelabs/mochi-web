import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { Button } from '~components/Button'
import { DiscordIcon } from '~components/icons/discord'
import { Popover } from '~components/Popover'
import { PAGES, SOCIAL_LINKS } from '~constants'
import { INVITE_LINK } from '~envs'

const NavLinks = ({ className }: { className: string }) => (
  <div className={['flex items-center', className].join(' ')}>
    <Popover
      trigger={<span className="text-sm font-semibold">Feature</span>}
      panelClassname="flex flex-col whitespace-nowrap"
    >
      <Link href="/server-management">
        <a className="px-3 py-2 hover:bg-mochi-50/30">Server Management</a>
      </Link>
      <Link href="/crypto-utils">
        <a className="px-3 py-2 hover:bg-mochi-50/30">Crypto Utilities</a>
      </Link>
      <Link href="/nft">
        <a className="px-3 py-2 hover:bg-mochi-50/30">NFT</a>
      </Link>
      <Link href="/social">
        <a className="px-3 py-2 hover:bg-mochi-50/30">Social</a>
      </Link>
    </Popover>
    <Popover
      trigger={<span className="text-sm font-semibold">Community</span>}
      panelClassname="flex flex-col whitespace-nowrap"
    >
      <Link href={PAGES.CHANGE_LOG.path}>
        <a className="px-3 py-2 hover:bg-mochi-50/30">
          {PAGES.CHANGE_LOG.title}
        </a>
      </Link>
      <span className="px-3 py-2 text-gray-400">Blog (Coming Soon)</span>
    </Popover>
    <Popover
      trigger={<span className="text-sm font-semibold">Support</span>}
      panelClassname="flex flex-col whitespace-nowrap"
    >
      <Link href={SOCIAL_LINKS.DISCORD}>
        <a className="px-3 py-2 hover:bg-mochi-50/30">Support Server</a>
      </Link>
      <Link href={SOCIAL_LINKS.GITBOOK}>
        <a className="px-3 py-2 hover:bg-mochi-50/30">Instruction</a>
      </Link>
    </Popover>
    <Popover
      trigger={<span className="text-sm font-semibold">Credibility</span>}
      panelClassname="flex flex-col whitespace-nowrap"
    >
      <Link href={SOCIAL_LINKS.TOP_GG}>
        <a className="px-3 py-2 hover:bg-mochi-50/30">Vote on Top.gg</a>
      </Link>
      <Link href={SOCIAL_LINKS.DISCORBOTLIST}>
        <a className="px-3 py-2 hover:bg-mochi-50/30">
          Vote on Discordbotlist.com
        </a>
      </Link>
    </Popover>
    <Button href={INVITE_LINK} appearance="secondary">
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
