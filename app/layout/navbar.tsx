import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { DiscordIcon } from '~components/icons/discord'
import { Popover } from '~components/Popover'
import { PAGES, SOCIAL_LINKS } from '~constants'
import { logo } from '~utils/image'
import { TrophyIcon } from '@heroicons/react/24/outline'
import {
  GlobeAmericasIcon,
  ViewfinderCircleIcon,
  CpuChipIcon,
  UserGroupIcon,
  BellAlertIcon,
  NewspaperIcon,
  HeartIcon,
  InformationCircleIcon,
  ArrowUpCircleIcon,
  ArrowSmallRightIcon,
} from '@heroicons/react/20/solid'
import ConnectButton from '~components/ConnectButton'

const NavLink = (props: any) => {
  if (!props.href) {
    return (
      <div className="flex items-center py-2 px-3 bg-transparent rounded-md group">
        <span className="p-1 mr-2 bg-gray-200 rounded transition-all duration-100 ease-out group-hover:text-mochi group-hover:bg-mochi-50">
          {props.icon}
        </span>
        <div className="mr-4">{props.children}</div>
        <ArrowSmallRightIcon className="ml-auto w-5 h-5 opacity-0 transition-all duration-100 ease-out translate-x-1/2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-mochi" />
      </div>
    )
  }
  return (
    <Link href={props.href}>
      <a className="flex items-center py-2 px-3 bg-transparent rounded-md group">
        <span className="p-1 mr-2 bg-gray-200 rounded transition-all duration-100 ease-out group-hover:text-mochi group-hover:bg-mochi-50">
          {props.icon}
        </span>
        <div className="mr-4">{props.children}</div>
        <ArrowSmallRightIcon className="ml-auto w-5 h-5 opacity-0 transition-all duration-100 ease-out translate-x-1/2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-mochi" />
      </a>
    </Link>
  )
}

const NavLinks = ({ className }: { className: string }) => (
  <div className={['flex items-stretch', className].join(' ')}>
    <Popover
      trigger={<span className="text-sm font-semibold">Features</span>}
      panelClassname="flex flex-col whitespace-nowrap text-sm font-semibold text-foreground-secondary"
    >
      {[
        {
          href: '/server-management',
          text: 'DAO Management',
          icon: <GlobeAmericasIcon className="w-5 h-5" />,
        },
        {
          href: '/crypto-utils',
          text: 'Crypto Utilities',
          icon: <ViewfinderCircleIcon className="w-5 h-5" />,
        },
        {
          href: '/nft',
          text: 'NFT',
          icon: <CpuChipIcon className="w-5 h-5" />,
        },
        {
          href: '/social',
          text: 'Social',
          icon: <UserGroupIcon className="w-5 h-5" />,
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
        icon={<BellAlertIcon className="w-5 h-5" />}
        href={PAGES.CHANGE_LOG.path}
      >
        {PAGES.CHANGE_LOG.title}
      </NavLink>
      <NavLink icon={<NewspaperIcon className="w-5 h-5" />}>
        Blog (Coming Soon)
      </NavLink>
    </Popover>
    <Popover
      trigger={<span className="text-sm font-semibold">Support</span>}
      panelClassname="flex flex-col whitespace-nowrap text-sm font-semibold text-foreground-secondary"
    >
      <NavLink
        icon={<HeartIcon className="w-5 h-5" />}
        href={SOCIAL_LINKS.DISCORD}
      >
        Support Server
      </NavLink>
      <NavLink
        icon={<InformationCircleIcon className="w-5 h-5" />}
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
        icon={<ArrowUpCircleIcon className="w-5 h-5" />}
        href={SOCIAL_LINKS.TOP_GG}
      >
        Vote on Top.gg
      </NavLink>
      <NavLink
        icon={<DiscordIcon className="w-5 h-5" />}
        href={SOCIAL_LINKS.DISCORBOTLIST}
      >
        Vote on Discordbotlist.com
      </NavLink>
    </Popover>
    <ConnectButton />
  </div>
)

export const Navbar = () => (
  <Fragment>
    <nav className="relative z-10 bg-transparent">
      <div className="flex items-center py-5 px-6 mx-auto max-w-7xl md:px-12">
        <Link href="/">
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
        <NavLinks className="hidden gap-10 ml-auto md:flex" />
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
        <TrophyIcon className="mr-1 w-4" />
        2nd place
      </span>
    </div>
    <div className="overflow-auto fixed right-0 bottom-0 left-0 z-50 w-screen bg-white border-t-2 md:hidden border-t-mochi-100">
      <NavLinks className="gap-7 py-2 px-3 text-sm" />
    </div>
  </Fragment>
)
