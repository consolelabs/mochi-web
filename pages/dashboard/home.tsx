import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import { heading } from '~components/Dashboard/Heading'
import DashboardLayout from '~components/Dashboard/Layout'
import { NextPageWithLayout } from '~pages/_app'

const Server = () => {
  return (
    <Link
      href="/dashboard/123"
      className={clsx(
        'transition hover:-translate-y-2',
        'flex flex-col gap-y-4 items-center p-6 rounded-md border shadow border-black/10',
      )}
    >
      <div className="rounded-full w-20 h-20 bg-[#D9D9D9]" />
      <span className="font-semibold text-xs uppercase text-[#7A7E85]">
        server name
      </span>
    </Link>
  )
}

const Home: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col gap-y-28 mx-auto w-full max-w-4xl">
      <div className="flex flex-col gap-y-6 items-center">
        <p className={heading({ size: 'sm' })}>Your Servers</p>
        <div className="grid grid-cols-4 auto-rows-auto gap-6 self-stretch">
          {Array(8)
            .fill(0)
            .map((_, i) => {
              return <Server key={`your-server-${i}`} />
            })}
        </div>
      </div>
      <div className="flex flex-col gap-y-6 items-center">
        <p className={heading({ size: 'sm' })}>Your Other Servers</p>
        <div className="grid grid-cols-4 auto-rows-auto gap-6 self-stretch">
          {Array(16)
            .fill(0)
            .map((_, i) => {
              return <Server key={`your-server-${i}`} />
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
