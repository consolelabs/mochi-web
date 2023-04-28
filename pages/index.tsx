import Image from 'next/image'
import Link from 'next/link'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { Button } from '~components/Button'
import { CircledIcon } from '~components/CircledIcon'
import { CTA } from '~components/CTA'
import { FeatureIntroduction } from '~components/FeatureIntroduction'
import { RingsBackground } from '~components/RingsBackground'
import { Stats } from '~components/Stats'
import { INVITE_LINK } from '~envs'
import {
  diagBg,
  feature1,
  feature2,
  feature3,
  feature4,
  feature5,
  heroBg,
  mochiTextCircle,
  nftRarityRanking,
  rocket,
  util1,
  util2,
  util3,
  util4,
  mochisanspacecar,
  mochisancoins,
  mochisanchartincrease,
} from '~utils/image'
import { Icon } from '@iconify/react'
import Balancer from 'react-wrap-balancer'
import { HowMochiWork } from '~components/HowMochiWork'
import { AddButtons } from '~components/AddButtons'

export default function index() {
  return (
    <div className="overflow-hidden relative">
      <div className="absolute left-0 z-0 w-full min-h-[80vh] aspect-auto top-[-80px]">
        <Image src={heroBg} fill alt="" />
      </div>
      <Layout>
        <SEO />
        <div className="flex relative flex-col-reverse justify-center items-center px-6 md:px-12 lg:flex-row lg:mt-24 body-block h-[600px] xl:h-[450px]">
          <div className="flex relative z-10 flex-col">
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
            <div className="flex gap-x-3 items-center mt-5">
              <AddButtons />
            </div>
          </div>
          <div className="relative self-stretch my-10 w-1/3 lg:m-0">
            <Image
              fill
              src={mochisanspacecar}
              alt="mochisan riding a space car"
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex gap-x-5 justify-center px-4 mt-5 body-block">
          <div className="flex gap-x-2 p-4 max-w-sm rounded-xl bg-mochi shadow-mochi">
            <div className="relative flex-1">
              <Image
                fill
                className="object-contain scale-125"
                src={mochisancoins}
                alt="mochisan sitting between piles of coins"
              />
            </div>
            <div className="flex flex-col flex-1">
              <p className="text-sm text-foreground">
                <span className="font-bold text-foreground">Do-to-earn</span>{' '}
                with Mochi and connect with tons of Web3 communities out there!
              </p>
              <div className="p-2 mt-auto text-white rounded-lg bg-near-black">
                Coming soon
              </div>
            </div>
          </div>
          <Stats />
        </div>
        <div className="flex flex-col px-6 md:px-12 body-block">
          <div className="flex flex-col gap-y-2 items-start mx-auto mt-36 md:items-center">
            <p className="text-3xl font-bold">What is Mochi.gg?</p>
            <span>
              <Balancer className="text-xl font-thin text-center">
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
          <div className="flex flex-col gap-y-2 items-start mx-auto mt-36 md:items-center">
            <p className="text-3xl font-bold">What Does Mochi Do?</p>
          </div>
          <div className="grid grid-cols-1 grid-rows-4 gap-6 mt-10 md:grid-cols-2 md:grid-rows-2">
            {[
              {
                icon: (
                  <Icon
                    width={32}
                    height={32}
                    icon="material-symbols:globe-asia"
                  />
                ),
                title: 'Seamless Access to Web3',
                desc: 'Access to all web3 application without having wallets and save tons of opportunities to earn like chads!',
              },
              {
                icon: (
                  <Icon
                    width={32}
                    height={32}
                    icon="fa6-solid:arrow-trend-up"
                  />
                ),
                title: 'Ultimate tools for Crypto Degens',
                desc: 'Perform better than 99% of crypto market to provide on-chain data insight for crypto degens. ',
              },
              {
                icon: (
                  <Icon
                    width={32}
                    height={32}
                    icon="fluent:people-community-20-filled"
                  />
                ),
                title: 'Grow Toolset for Community',
                desc: 'Reach out to, reward, and engage millions of Web3 users with a simple solution and loyalty programs.',
              },
              {
                icon: (
                  <Icon
                    width={32}
                    height={32}
                    icon="material-symbols:insert-chart-rounded"
                  />
                ),
                title: 'Toolset to manage Web3 community',
                desc: 'Set and forget. Mochi does all management activities for you, automatically.',
              },
            ].map((u, i) => {
              return (
                <div
                  key={`util-${i}`}
                  className="flex flex-col items-start p-6 bg-white rounded-lg border border-gray-200"
                >
                  <CircledIcon>{u.icon}</CircledIcon>
                  <p className="mt-2 text-xl">{u.title}</p>
                  <span className="mt-1 text-base font-light">{u.desc}</span>
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
