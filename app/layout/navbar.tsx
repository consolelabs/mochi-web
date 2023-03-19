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
      panelClassname="flex flex-col whitespace-nowrap text-sm font-semibold text-foreground-secondary"
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
      panelClassname="flex flex-col whitespace-nowrap text-sm font-semibold text-foreground-secondary"
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
      panelClassname="flex flex-col whitespace-nowrap text-sm font-semibold text-foreground-secondary"
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
      panelClassname="flex flex-col whitespace-nowrap text-sm font-semibold text-foreground-secondary"
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
    <div className="hidden md:block">
      <ConnectButton />
    </div>
  </div>
)

export const Navbar = () => (
  <Fragment>
    <nav className="relative z-20 bg-transparent">
      <div className="flex flex-wrap gap-y-5 items-center py-5 px-6 mx-auto max-w-7xl md:px-12">
        <Link legacyBehavior href="/">
          <a className="flex gap-4 items-center text-gray-900 group">
            <div className="w-9 h-9 rounded-full transition-shadow duration-200 ease-in-out group-hover:shadow-xl group-hover:shadow-mochi-200">
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
        <div className="ml-auto md:hidden">
          <ConnectButton />
        </div>
        <NavLinks className="flex gap-x-10 justify-center mx-auto md:justify-start md:mx-0 md:ml-auto basis-full md:basis-[auto]" />
      </div>
    </nav>
    <div className="flex relative justify-center items-center py-2 space-x-2 w-full text-sm bg-black">
      <span className="font-semibold text-white">Solana Coding Camp</span>
      <span
        className="flex items-center py-1 px-3 text-xs font-semibold text-black uppercase rounded-full"
        style={{
          background:
            'linear-gradient(90deg, #F4C4C2 0%, #EEC3FD 48.96%, #8FC6E4 100%)',
        }}
      >
        <Icon icon="heroicons:trophy-20-solid" className="mr-1 w-4" />
        2nd place
      </span>
    </div>
  </Fragment>
)
