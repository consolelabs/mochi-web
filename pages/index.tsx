import Image from 'next/image'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { CircledIcon } from '~components/CircledIcon'
import { CTA } from '~components/CTA'
import { Stats } from '~components/Stats'
import {
  heroBg,
  mochisanspacecar,
  mochisancoins,
  mochisanchartincrease,
} from '~utils/image'
import { Icon } from '@iconify/react'
import Balancer from 'react-wrap-balancer'
import { HowMochiWork } from '~components/HowMochiWork'
import { AddButtons } from '~components/AddButtons'
import { IntegratedChains } from '~components/IntegratedChains'
import { Partner } from '~components/Partner'
import Link from 'next/link'

export default function index() {
  return (
    <div className="overflow-hidden relative">
      <div className="absolute left-0 z-0 w-full min-h-[80vh] aspect-auto top-[-80px]">
        <Image src={heroBg} fill alt="" />
      </div>
      <Layout>
        <SEO />
        <div className="flex relative flex-col-reverse justify-center items-center px-6 md:flex-row md:px-12 lg:mt-24 body-block lg:h-[450px]">
          <div className="flex relative z-10 flex-col w-full">
            <p>
              <Balancer className="text-3xl font-black md:text-6xl text-foreground">
                The Siri of
                <br />
                <span className="font-black text-mochi">Web3</span> World!
              </Balancer>
            </p>
            <span>
              <Balancer className="mt-2 max-w-xl text-sm font-medium md:text-base text-foreground-secondary">
                Turn your community into a place all{' '}
                <span className="font-bold">Web3</span> users want to stay!
              </Balancer>
            </span>
            <div className="flex flex-wrap gap-3 items-center mt-5">
              <AddButtons />
            </div>
          </div>
          <div className="relative self-stretch my-10 mx-auto w-full sm:w-2/3 lg:m-0 lg:w-1/3">
            <Image
              src={mochisanspacecar}
              alt="mochisan riding a space car"
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex flex-col gap-5 justify-center px-4 mt-5 lg:flex-row body-block">
          <div className="grid grid-cols-2 auto-rows-auto gap-2 gap-x-2 p-4 rounded-xl lg:flex-row lg:max-w-sm bg-mochi shadow-mochi">
            <div className="relative flex-1">
              <Image
                className="object-contain"
                src={mochisancoins}
                alt="mochisan sitting between piles of coins"
              />
            </div>
            <div className="flex flex-col flex-1">
              <p className="text-sm text-foreground">
                <span className="font-bold text-foreground">Do-to-earn</span>{' '}
                with Mochi and connect with tons of Web3 communities out there!
              </p>
            </div>
            <div className="col-span-2 p-2 mt-auto font-bold text-center text-white rounded-lg bg-near-black">
              Coming soon 🚧
            </div>
          </div>
          <Stats />
        </div>
        <div className="mt-20 body-block">
          <p className="mb-5 font-bold text-center uppercase">
            which chains has mochi integrated?
          </p>
          <IntegratedChains />
        </div>
        <div className="mt-20 body-block">
          <p className="mb-5 font-bold text-center uppercase">
            who uses mochi.gg?
          </p>
          <Partner />
        </div>
        <div className="flex flex-col px-6 md:px-12 body-block">
          <div className="flex flex-col gap-y-2 items-center mx-auto mt-36">
            <p className="text-xl font-bold text-center sm:text-3xl">
              What is Mochi.gg?
            </p>
            <span>
              <Balancer className="text-base font-thin text-center sm:text-xl">
                Mochi is an all-in-one bot that help you to make sure money well
                spent on the right activity!
                <br />
                We provides all web3 activities in different social platform
                what help your community to bring more traffic and ease the
                growth process.
              </Balancer>
            </span>
            <div className="relative mt-3 w-52 h-52">
              <Image
                fill
                className="object-contain"
                src={mochisanchartincrease}
                alt="mochisan over a chart that seems to be increasing"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col px-6 md:px-12 body-block">
          <div className="flex flex-col gap-y-2 items-center mx-auto mt-36">
            <p className="text-xl font-bold text-center sm:text-3xl">
              What Does Mochi Do?
            </p>
          </div>
          <div className="grid grid-cols-1 grid-rows-4 gap-6 mt-10 md:grid-cols-2 md:grid-rows-2">
            {[
              {
                icon: (
                  <Icon
                    width={28}
                    height={28}
                    icon="material-symbols:globe-asia"
                  />
                ),
                title: 'Seamless Access to Web3',
                desc: 'Access to all web3 application without having wallets and save tons of opportunities to earn like chads!',
                href: {
                  url: '#',
                  text: 'Start Earning',
                },
              },
              {
                icon: (
                  <Icon
                    width={28}
                    height={28}
                    icon="fa6-solid:arrow-trend-up"
                  />
                ),
                title: 'Ultimate tools for Crypto Degens',
                desc: 'Perform better than 99% of crypto market to provide on-chain data insight for crypto degens. ',
                href: {
                  url: '#',
                  text: 'Start Earning',
                },
              },
              {
                icon: (
                  <Icon
                    width={28}
                    height={28}
                    icon="fluent:people-community-20-filled"
                  />
                ),
                title: 'Grow Toolset for Community',
                desc: 'Reach out to, reward, and engage millions of Web3 users with a simple solution and loyalty programs.',
                href: {
                  url: '#',
                  text: 'Start Earning',
                },
              },
              {
                icon: (
                  <Icon
                    width={28}
                    height={28}
                    icon="material-symbols:insert-chart-rounded"
                  />
                ),
                title: 'Toolset to manage Web3 community',
                desc: 'Set and forget. Mochi does all management activities for you, automatically.',
                href: {
                  url: '#',
                  text: 'Start Earning',
                },
              },
            ].map((u, i) => {
              return (
                <div
                  key={`util-${i}`}
                  className="flex flex-col items-start p-6 bg-white rounded-lg border border-gray-200"
                >
                  <CircledIcon>{u.icon}</CircledIcon>
                  <p className="mt-2 text-sm sm:text-xl">{u.title}</p>
                  <span className="mt-1 text-sm font-light sm:text-base">
                    {u.desc}
                  </span>
                  <Link
                    href={u.href.url}
                    className="flex flex-1 gap-x-2 justify-end items-center w-full group"
                  >
                    <span className="text-sm font-medium opacity-0 transition -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-mochi">
                      {u.href.text}
                    </span>
                    <div className="p-1 rounded-full border border-gray-200">
                      <Icon
                        className="w-4 sm:w-6"
                        icon="eva:diagonal-arrow-right-up-fill"
                      />
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
        <CTA />
        <HowMochiWork />
      </Layout>
    </div>
  )
}
