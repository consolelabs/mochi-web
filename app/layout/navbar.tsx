import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { Button } from '~components/Button'
import { DiscordIcon } from '~components/icons/discord'
import { Popover } from '~components/Popover'
import { PAGES, SOCIAL_LINKS } from '~constants'
import { INVITE_LINK } from '~envs'
import { logo } from '~utils/image'

const NavLink = (props: any) => {
  return (
    <Link href={props.href}>
      <a className="transition-colors duration-75 ease-out bg-transparent px-3 py-2 hover:bg-mochi-50/80 rounded-md">
        {props.children}
      </a>
    </Link>
  )
}

const NavLinks = ({ className }: { className: string }) => (
  <div className={['flex items-center', className].join(' ')}>
    <Popover
      trigger={<span className="text-sm font-semibold">Features</span>}
      panelClassname="flex flex-col whitespace-nowrap text-sm font-semibold text-foreground-secondary"
    >
      {[
        { href: '/server-management', text: 'Server Management' },
        { href: '/crypto-utils', text: 'Crypto Utilities' },
        { href: '/nft', text: 'NFT' },
        { href: '/social', text: 'Social' },
      ].map((l) => {
        return (
          <NavLink key={l.href} href={l.href}>
            {l.text}
          </NavLink>
        )
      })}
    </Popover>
    <Popover
      trigger={<span className="text-sm font-semibold">Community</span>}
      panelClassname="flex flex-col whitespace-nowrap text-sm font-semibold text-foreground-secondary"
    >
      <NavLink href={PAGES.CHANGE_LOG.path}>{PAGES.CHANGE_LOG.title}</NavLink>
      <span className="px-3 py-2 text-gray-400">Blog (Coming Soon)</span>
    </Popover>
    <Popover
      trigger={<span className="text-sm font-semibold">Support</span>}
      panelClassname="flex flex-col whitespace-nowrap text-sm font-semibold text-foreground-secondary"
    >
      <NavLink href={SOCIAL_LINKS.DISCORD}>Support Server</NavLink>
      <NavLink href={SOCIAL_LINKS.GITBOOK}>Instruction</NavLink>
    </Popover>
    <Popover
      trigger={<span className="text-sm font-semibold">Credibility</span>}
      panelClassname="flex flex-col whitespace-nowrap text-sm font-semibold text-foreground-secondary"
    >
      <NavLink href={SOCIAL_LINKS.TOP_GG}>Vote on Top.gg</NavLink>
      <NavLink href={SOCIAL_LINKS.DISCORBOTLIST}>
        Vote on Discordbotlist.com
      </NavLink>
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
                src={logo}
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
