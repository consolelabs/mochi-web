import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { Popover } from '~components/Popover'
import { PAGES, SOCIAL_LINKS } from '~constants'
import { logo } from '~utils/image'
import { Icon } from '@iconify/react'
import ConnectButton from '~components/ConnectButton'

const NavLink = (props: any) => {
  if (!props.href) {
    return (
      <div className="flex items-center py-2 px-3 bg-transparent rounded-md group">
        <span className="p-1 mr-2 bg-gray-200 rounded transition-all duration-100 ease-out group-hover:text-mochi group-hover:bg-mochi-50">
          {props.icon}
        </span>
        <div className="mr-4">{props.children}</div>
        <Icon
          icon="heroicons:arrow-small-right-20-solid"
          className="ml-auto w-5 h-5 opacity-0 transition-all duration-100 ease-out translate-x-1/2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-mochi"
        />
      </div>
    )
  }
  return (
    <Link legacyBehavior href={props.href}>
      <a className="flex items-center py-2 px-3 bg-transparent rounded-md group">
        <span className="p-1 mr-2 bg-gray-200 rounded transition-all duration-100 ease-out group-hover:text-mochi group-hover:bg-mochi-50">
          {props.icon}
        </span>
        <div className="mr-4">{props.children}</div>
        <Icon
          icon="heroicons:arrow-small-right-20-solid"
          className="ml-auto w-5 h-5 opacity-0 transition-all duration-100 ease-out translate-x-1/2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-mochi"
        />
      </a>
    </Link>
  )
}

const NavLinks = ({ className }: { className: string }) => (
  <div
    className={['flex flex-wrap items-stretch gap-y-2', className].join(' ')}
  >
    <Popover
      trigger={<span className="text-sm font-semibold">Features</span>}
      panelClassname="p-2 bg-white flex flex-col whitespace-nowrap text-sm font-semibold text-foreground-secondary"
    >
      {[
        {
          href: '/server-management',
          text: 'DAO Management',
          icon: (
            <Icon
              icon="heroicons:globe-americas-20-solid"
              className="w-5 h-5"
            />
          ),
        },
        {
          href: '/crypto-utils',
          text: 'Crypto Utilities',
          icon: (
            <Icon
              icon="heroicons:viewfinder-circle-20-solid"
              className="w-5 h-5"
            />
          ),
        },
        {
          href: '/nft',
          text: 'NFT',
          icon: <Icon icon="heroicons:cpu-chip-20-solid" className="w-5 h-5" />,
        },
        {
          href: '/social',
          text: 'Social',
          icon: (
            <Icon icon="heroicons:user-group-20-solid" className="w-5 h-5" />
          ),
        },
      ].map((l) => {
        return (
          <NavLink key={l.href} href={l.href} icon={l.icon}>
            {l.text}
          </NavLink>
        )
      })}
    </Popover>
    <Popover
      trigger={<span className="text-sm font-semibold">Community</span>}
      panelClassname="p-2 bg-white flex flex-col whitespace-nowrap text-sm font-semibold text-foreground-secondary"
    >
      <NavLink
        icon={<Icon icon="heroicons:bell-alert-20-solid" className="w-5 h-5" />}
        href={PAGES.CHANGE_LOG.path}
      >
        {PAGES.CHANGE_LOG.title}
      </NavLink>
      <NavLink
        icon={<Icon icon="heroicons:newspaper-20-solid" className="w-5 h-5" />}
      >
        Blog (Coming Soon)
      </NavLink>
    </Popover>
    <Popover
      trigger={<span className="text-sm font-semibold">Support</span>}
      panelClassname="p-2 bg-white flex flex-col whitespace-nowrap text-sm font-semibold text-foreground-secondary"
    >
      <NavLink
        icon={<Icon icon="heroicons:heart-20-solid" className="w-5 h-5" />}
        href={SOCIAL_LINKS.DISCORD}
      >
        Support Server
      </NavLink>
      <NavLink
        icon={
          <Icon
            icon="heroicons:information-circle-20-solid"
            className="w-5 h-5"
          />
        }
        href={SOCIAL_LINKS.GITBOOK}
      >
        Instruction
      </NavLink>
    </Popover>
    <Popover
      trigger={<span className="text-sm font-semibold">Credibility</span>}
      panelClassname="p-2 bg-white flex flex-col whitespace-nowrap text-sm font-semibold text-foreground-secondary"
    >
      <NavLink
        icon={
          <Icon icon="heroicons:arrow-up-circle-20-solid" className="w-5 h-5" />
        }
        href={SOCIAL_LINKS.TOP_GG}
      >
        Vote on Top.gg
      </NavLink>
      <NavLink
        icon={<Icon icon="ic:baseline-discord" className="w-5 h-5" />}
        href={SOCIAL_LINKS.DISCORBOTLIST}
      >
        Vote on Discordbotlist.com
      </NavLink>
    </Popover>
  </div>
)

export const Navbar = () => (
  <Fragment>
    <nav className="relative sticky top-0 z-20 bg-white">
      <div className="flex justify-between items-center py-5 px-6 mx-auto max-w-7xl md:px-12">
        <Link className="flex gap-x-3 items-center" href="/">
          <Image
            src={logo}
            alt="Logo"
            width={32}
            height={32}
            className="block rounded-full"
          />
          <span className="text-xl font-black uppercase text-foreground">
            Mochi<span className="text-mochi">.</span>
          </span>
        </Link>
        <div className="order-1 ml-auto md:order-2 md:ml-10">
          <ConnectButton />
        </div>
      </div>
    </nav>
  </Fragment>
)
