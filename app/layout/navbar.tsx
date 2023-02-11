import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { Button } from '~components/Button'
import { DiscordIcon } from '~components/icons/discord'
import { Popover } from '~components/Popover'
import { PAGES, SOCIAL_LINKS } from '~constants'
import { INVITE_LINK } from '~envs'
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

const NavLink = (props: any) => {
  if (!props.href) {
    return (
      <div className="group flex items-center bg-transparent px-3 py-2 rounded-md">
        <span className="mr-2 transition-all duration-100 ease-out group-hover:text-mochi group-hover:bg-mochi-50 bg-gray-200 rounded p-1">
          {props.icon}
        </span>
        <div className="mr-4">{props.children}</div>
        <ArrowSmallRightIcon className="transition-all duration-100 ease-out ml-auto w-5 h-5 translate-x-1/2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-mochi" />
      </div>
    )
  }
  return (
    <Link href={props.href}>
      <a className="group flex items-center bg-transparent px-3 py-2 rounded-md">
        <span className="mr-2 transition-all duration-100 ease-out group-hover:text-mochi group-hover:bg-mochi-50 bg-gray-200 rounded p-1">
          {props.icon}
        </span>
        <div className="mr-4">{props.children}</div>
        <ArrowSmallRightIcon className="transition-all duration-100 ease-out ml-auto w-5 h-5 translate-x-1/2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-mochi" />
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
    <div className="flex justify-center items-center w-full bg-black py-2 relative text-sm space-x-2">
      <span className="text-white font-semibold">Solana Coding Camp</span>
      <span
        className="flex items-center uppercase rounded-full py-1 px-3 text-black text-xs font-semibold"
        style={{
          background:
            'linear-gradient(90deg, #F4C4C2 0%, #EEC3FD 48.96%, #8FC6E4 100%)',
        }}
      >
        <TrophyIcon className="w-4 mr-1" />
        2nd place
      </span>
    </div>
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t-2 border-t-mochi-100 overflow-auto w-screen">
      <NavLinks className="gap-7 px-3 py-2 text-sm" />
    </div>
  </Fragment>
)
