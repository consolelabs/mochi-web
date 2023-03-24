import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'
import type { ReactElement } from 'react'
import { heading } from '~components/Dashboard/Heading'
import DashboardLayout from '~components/Dashboard/Layout'
import { NextPageWithLayout } from '~pages/_app'
import { useDashboardStore } from '~store/dashboard'
import useSWR from 'swr'
import { GET_PATHS } from '~constants/api'
import { useAuthStore } from '~store'
import { ViewDiscordGuild } from '~types/mochi-profile-schema'

const Server = (props: ViewDiscordGuild) => {
  const { id, icon, name } = props

  return (
    <Link
      href={`/dashboard/${id}`}
      className={clsx(
        'transition hover:-translate-y-2',
        'flex flex-col gap-y-4 items-center p-6 rounded-md border shadow border-black/10',
      )}
    >
      <img
        className="rounded-full w-20 h-20 bg-[#D9D9D9]"
        alt={name}
        src={
          icon
            ? `https://cdn.discordapp.com/icons/${id}/${icon}.png`
            : `https://boring-avatars-api.vercel.app/api/avatar?size=40&variant=marble`
        }
      />
      <span className="text-xs font-semibold uppercase text-dashboard-gray-8">
        {name}
      </span>
    </Link>
  )
}

const Home: NextPageWithLayout = () => {
  const { token } = useAuthStore()
  const { getServerList } = useDashboardStore()
  const { data, isLoading } = useSWR([GET_PATHS.GUILDS, token], () =>
    getServerList(),
  )
  const servers = data?.data || {}

  const skeletonRender = new Array(4).fill(0).map((_, index) => {
    return <div className="bg-white-pure animate-pulse h-40" key={index} />
  })

  return (
    <div className="flex flex-col gap-y-28 mx-auto w-full max-w-4xl">
      <div className="flex flex-col gap-y-6 items-center">
        <p className={heading({ size: 'sm' })}>Your Servers</p>
        <div className="grid grid-cols-4 auto-rows-auto gap-6 self-stretch">
          {isLoading
            ? skeletonRender
            : (servers?.owning || []).map((server, i) => {
                return <Server key={`your-server-${i}`} {...server} />
              })}
        </div>
      </div>
      <div className="flex flex-col gap-y-6 items-center">
        <p className={heading({ size: 'sm' })}>Your Other Servers</p>
        <div className="grid grid-cols-4 auto-rows-auto gap-6 self-stretch">
          {isLoading
            ? skeletonRender
            : (servers?.others || []).map((server, i) => {
                return <Server key={`your-server-${i}`} {...server} />
              })}
        </div>
      </div>
    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Home
