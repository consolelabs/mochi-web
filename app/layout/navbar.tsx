import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { Popover } from '~components/Popover'
import { PAGES, SOCIAL_LINKS } from '~constants'
import { logo } from '~utils/image'
import { Icon } from '@iconify/react'
import ConnectButton from '~components/ConnectButton'
import Marquee from 'react-fast-marquee'
import clsx from 'clsx'

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
      trigger={
        <span className="text-sm font-semibold text-inherit">Features</span>
      }
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
      trigger={
        <span className="text-sm font-semibold text-inherit">Community</span>
      }
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
      trigger={
        <span className="text-sm font-semibold text-inherit">Support</span>
      }
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
      trigger={
        <span className="text-sm font-semibold text-inherit">Credibility</span>
      }
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

const Banner = () => {
  return (
    <div className="flex items-center mx-3 space-x-6">
      <span className="font-black text-white">SOLANA CODING CAMP</span>
      <span className="flex items-center px-2 text-xs font-black text-black uppercase bg-yellow-50 rounded-full">
        <Icon
          icon="fluent-emoji-high-contrast:2nd-place-medal"
          className="mr-1"
          height={20}
        />
        2nd place
      </span>
    </div>
  )
}

export const Navbar = ({
  showBanner,
  dark,
}: {
  showBanner: boolean
  dark: boolean
}) => (
  <Fragment>
    <nav
      className={clsx('relative z-20', {
        'bg-transparent': !dark,
        'bg-near-black': dark,
      })}
    >
      <div className="flex flex-wrap gap-y-5 items-center py-5 px-6 mx-auto max-w-7xl md:px-12">
        <Link className="flex gap-x-3 items-center" href="/">
          <Image
            src={logo}
            alt="Logo"
            width={32}
            height={32}
            className="block rounded-full"
          />
          <span
            className={clsx('text-xl font-black uppercase text-foreground', {
              'text-foreground': !dark,
              'text-white': dark,
            })}
          >
            Mochi<span className="text-mochi">.</span>
          </span>
        </Link>
        <div className="order-1 ml-auto md:order-2 md:ml-10">
          <ConnectButton />
        </div>
        <NavLinks
          className={clsx(
            'flex order-2 gap-x-10 justify-center mx-auto md:order-1 md:justify-start md:mx-0 md:ml-auto basis-full md:basis-[auto]',
            {
              'text-foreground': !dark,
              'text-white': dark,
            },
          )}
        />
      </div>
    </nav>
    <div
      className={clsx(
        'relative justify-center items-center py-1 w-full text-sm bg-black',
        {
          flex: showBanner,
          hidden: !showBanner,
        },
      )}
    >
      <Marquee gradientColor={[0, 0, 0]}>
        {Array(10)
          .fill(Banner)
          .map((Comp, i) => (
            <Comp key={`banner-${i}`} />
          ))}
      </Marquee>
    </div>
  </Fragment>
)
