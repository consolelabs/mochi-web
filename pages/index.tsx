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
import { Tweets } from '~components/Tweets'
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
} from '~utils/image'
import { Partner } from '~components/Partner'
import { IntegratedChains } from '~components/IntegratedChains'
import { Icon } from '@iconify/react'

const scale = 2.25

export default function index() {
  return (
    <div className="overflow-hidden relative">
      <div className="absolute left-0 z-0 w-full min-h-[80vh] aspect-auto top-[-80px]">
        <Image src={heroBg} layout="fill" alt="" />
      </div>
      <Layout>
        <SEO />
        <div className="flex relative flex-col-reverse justify-between px-6 md:px-12 lg:flex-row lg:mt-40 body-block h-[600px] xl:h-[450px]">
          <div className="flex relative z-10 flex-col">
            <p className="max-w-xl text-3xl md:text-5xl">
              Bring <span className="text-[#f17975]">Web3</span> universe to
              your <span className="text-[#6875ED]">Discord</span> server
            </p>
            <span className="mt-5 max-w-xl text-sm md:text-xl">
              Smooth onboarding, automated moderation, crypto ticker, NFT rarity
              ranking, and much more.
            </span>
            <div className="flex gap-x-5 items-center mt-10">
              <Button href={INVITE_LINK} appearance="discord">
                <Icon
                  icon="ic:baseline-discord"
                  color="white"
                  className="w-5"
                />
                <div className="whitespace-nowrap">Add Discord</div>
              </Button>
              <Button
                appearance="secondary"
                className="text-black shadow"
                disabled
              >
                <Icon icon="logos:telegram" color="white" className="w-5" />
                <div>Telegram</div>
                <span className="py-0.5 px-2 font-medium text-gray-800 uppercase bg-gray-300 rounded-full text-[10px]">
                  coming soon
                </span>
              </Button>
            </div>
          </div>
          <div className="absolute -right-32 -top-1/3 w-2/3 h-full">
            <RingsBackground />
          </div>
          <div className="flex relative flex-1 justify-center items-center lg:justify-end lg:items-start">
            <Image
              width={1080 / scale}
              height={669 / scale}
              src={rocket}
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col mt-32 lg:mt-5">
          <p className="mx-auto mb-2 text-3xl text-mochi">Integrated Chains</p>
          <IntegratedChains />
          <p className="mx-auto mt-16 mb-2 text-3xl text-mochi">Partners</p>
          <Partner />
        </div>
        <div className="mt-20">
          <Stats />
        </div>
        <div className="flex flex-col px-6 md:px-12 body-block">
          <div className="flex flex-col gap-y-2 items-start mx-auto mt-36 md:items-center">
            <p className="text-4xl">Server management made easy</p>
            <span className="text-xl">
              Set and forget. Mochi does it all for you, automatically
            </span>
            <Link legacyBehavior href="/server-management">
              <a className="flex gap-x-1 items-center font-medium text-blue-500 underline">
                <span className="font-medium text-blue-500 hover:text-mochi">
                  Learn more
                </span>
                <Icon
                  icon="heroicons:arrow-top-right-on-square-solid"
                  className="w-4"
                />
              </a>
            </Link>
          </div>
          {/* FEATURES */}
          <FeatureIntroduction
            title="Holder Verification"
            subtitle={
              <span>
                Manage access to holder-exclusive private channels,
                <br />
                multiple collections at once.
              </span>
            }
            image={feature1}
            className="mt-20 md:mt-20"
          />
          {/* ======================= */}
          <FeatureIntroduction
            flip
            title="Automatic Role Grant"
            subtitle={
              <span>
                Lets users add &amp; remove roles from themselves by
                <br />
                simply reacting to a message.
              </span>
            }
            image={feature2}
          />
          {/* ======================= */}
          <FeatureIntroduction
            title="Detailed Server Insights"
            subtitle={
              <span>
                The lastest server stats bot you need to make the right
                <br />
                decisions.
              </span>
            }
            image={feature3}
          />
          {/* ======================= */}
          <FeatureIntroduction
            flip
            title={
              <p className="text-2xl">
                Smooth Onboarding
                <br />
                Experience
              </p>
            }
            subtitle={
              <span>
                Give your new members a heartwarming welcome
                <br />
                with our ready-to-use and fully customizable designs.
              </span>
            }
            image={feature4}
          />
          {/* ======================= */}
          <FeatureIntroduction
            title="Facilitate Engagement"
            subtitle={
              <span>
                Quick &amp; easy to setup dedicated channels for fun &amp;
                <br />
                engaging activities such as GM.
              </span>
            }
            image={feature5}
          />
        </div>
        <div className="relative mt-[-800px]">
          <div className="relative h-[1142px]">
            <Image layout="fill" src={diagBg} alt="" />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Image width={134} height={136} src={mochiTextCircle} alt="" />
          </div>
        </div>
        <div className="flex flex-col px-6 md:px-12 body-block">
          <div className="flex flex-col gap-y-2 items-start mx-auto mt-36 md:items-center">
            <p className="text-4xl">Crypto Utilities</p>
            <span className="text-xl">
              Access all thing crypto without having to leave Discord
            </span>
            <Link legacyBehavior href="/crypto-utils">
              <a className="flex gap-x-1 items-center font-medium text-blue-500 underline">
                <span className="font-medium text-blue-500 hover:text-mochi">
                  Learn more
                </span>
                <Icon
                  icon="heroicons:arrow-top-right-on-square-solid"
                  className="w-4"
                />
              </a>
            </Link>
          </div>
          <div className="grid grid-cols-1 grid-rows-4 gap-6 mt-10 md:grid-cols-2 md:grid-rows-2">
            {[
              {
                icon: util1,
                title: 'Crypto ticker',
                desc: 'Track real-time price of more than 9,000 tokens supported',
              },
              {
                icon: util2,
                title: 'Watchlist',
                desc: 'Save a list of favorite tokens and pairs for a quick update',
              },
              {
                icon: util3,
                title: 'Tip bot',
                desc: 'Send and receive any amount of crypto, directly on Discord',
              },
              {
                icon: util4,
                title: 'Airdrop',
                desc: 'Airdrops, money rains and other community-engaging activities',
              },
            ].map((u, i) => {
              return (
                <div
                  key={`util-${i}`}
                  className="flex flex-col items-start p-6 bg-white rounded-lg border border-gray-200"
                >
                  <CircledIcon src={u.icon} />
                  <p className="mt-2 text-xl">{u.title}</p>
                  <span className="mt-1 text-base">{u.desc}</span>
                </div>
              )
            })}
          </div>
        </div>
        <div className="px-6 md:px-12 body-block">
          <div className="flex flex-col gap-y-2 items-start mx-auto mt-36 md:items-center">
            <p className="text-4xl">NFT + Discord = WAGMI</p>
            <span className="text-xl">
              A full set of tools for minters, traders, and collection owners
            </span>
            <Link legacyBehavior href="/nft">
              <a className="flex gap-x-1 items-center font-medium text-blue-500 underline">
                <span className="font-medium text-blue-500 hover:text-mochi">
                  Learn more
                </span>
                <Icon
                  icon="heroicons:arrow-top-right-on-square-solid"
                  className="w-4"
                />
              </a>
            </Link>
          </div>
          <div className="flex flex-col gap-y-8 justify-between mt-16 md:flex-row md:gap-y-0 md:mt-32">
            <div className="flex flex-col gap-y-2">
              <p className="text-xl">Rarity ranking tool</p>
              <span className="text-base">
                Instant rarity checker from a huge database, while
                <br />
                indexing new collections is quick and easy.
              </span>
            </div>
            <div className="flex flex-col gap-y-2">
              <p className="text-xl">Track NFT Sales</p>
              <span className="text-base">
                Quick catch up on market movement and you might
                <br />
                see some steals in there.
              </span>
            </div>
          </div>
          <div className="mt-10">
            <Image src={nftRarityRanking} alt="" />
          </div>
        </div>
        <div className="flex flex-col px-6 mt-44 md:px-12 body-block">
          <div className="flex flex-col gap-y-2 items-start mx-auto md:items-center">
            <p className="text-4xl">Social</p>
            <span className="text-xl">
              Engage with your community and honor members.
            </span>
            <Link legacyBehavior href="/social">
              <a className="flex gap-x-1 items-center font-medium text-blue-500 underline">
                <span className="font-medium text-blue-500 hover:text-mochi">
                  Learn more
                </span>
                <Icon
                  icon="heroicons:arrow-top-right-on-square-solid"
                  className="w-4"
                />
              </a>
            </Link>
          </div>
          <div className="flex flex-col gap-y-8 justify-between py-5 px-10 mt-10 bg-white rounded-lg border border-gray-200 md:flex-row md:gap-y-0">
            {[
              {
                icon: '/rocket.gif',
                title: 'Beyond Discord',
                desc: (
                  <>
                    Let users connect other social
                    <br />
                    profiles and flex their
                    <br />
                    personality
                  </>
                ),
              },
              {
                icon: '/thumbs-up.gif',
                title: 'Starboard',
                desc: (
                  <>
                    Honor and share well-rated
                    <br />
                    content
                  </>
                ),
              },
              {
                icon: '/party.gif',
                title: 'Leaderboard',
                desc: (
                  <>
                    Let your community know
                    <br />
                    who&apos;s the best
                  </>
                ),
              },
            ].map((s, i) => {
              return (
                <div
                  key={`social-${i}`}
                  className="flex flex-col items-center text-center"
                >
                  <CircledIcon src={s.icon} />
                  <p className="mt-1 text-xl">{s.title}</p>
                  <span className="mt-1 text-base">{s.desc}</span>
                </div>
              )
            })}
          </div>
        </div>
        <div className="flex flex-col px-6 mt-44 md:px-12 body-block">
          <div className="flex flex-col gap-y-2 items-start mx-auto md:items-center">
            <p className="text-4xl">Tweets</p>
          </div>
          <Tweets />
        </div>
        <div className="mt-20">
          <CTA />
        </div>
      </Layout>
    </div>
  )
}
