import { ExternalLinkIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { Button } from '~components/Button'
import { CircledIcon } from '~components/CircledIcon'
import { CTA } from '~components/CTA'
import { FeatureIntroduction } from '~components/FeatureIntroduction'
import { DiscordIcon } from '~components/icons/discord'
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

const scale = 2.25

export default function index() {
  return (
    <div className="relative overflow-hidden">
      <div className="w-full min-h-screen aspect-auto absolute left-0 top-[-80px] z-0">
        <Image src={heroBg} layout="fill" alt="" />
      </div>
      <Layout>
        <SEO />
        <div className="lg:mt-40 flex flex-col-reverse lg:flex-row justify-between relative body-block h-[600px] px-6 md:px-12">
          <div className="relative z-10 flex flex-col">
            <p className="text-3xl md:text-5xl max-w-xl">
              Bring <span className="text-[#f17975]">Web3</span> universe to
              your <span className="text-[#6875ED]">Discord</span> server
            </p>
            <span className="mt-5 text-sm md:text-xl max-w-xl">
              Smooth onboarding, automated moderation, crypto ticker, NFT rarity
              ranking, and much more.
            </span>
            <div className="mt-10 flex gap-x-5 items-center">
              <Button href={INVITE_LINK} appearance="primary">
                <DiscordIcon className="w-5 h-5" />
                <div>Get Mochi</div>
              </Button>
              <div
                style={{
                  background: 'linear-gradient(to right top, #9845ff, #1bf79f)',
                }}
                className="rounded-full p-1"
              >
                <a
                  href="https://twitter.com/SuperteamVN/status/1605880732416503808"
                  target="_blank"
                  className="text-white bg-gray-800 font-medium text-center px-4 py-1 flex rounded-full text-sm"
                  rel="noreferrer"
                >
                  Solana CodingCamp
                  <br />
                  🏆 2nd place 🏆
                </a>
              </div>
            </div>
          </div>
          <div className="absolute -right-32 -top-1/3 w-2/3 h-full">
            <RingsBackground />
          </div>
          <div className="relative flex-1 flex justify-center items-center lg:justify-end lg:items-start">
            <Image
              width={1080 / scale}
              height={669 / scale}
              src={rocket}
              alt=""
            />
          </div>
        </div>
        <div className="mt-10">
          <Stats />
        </div>
        <div className="body-block flex flex-col px-6 md:px-12">
          <div className="mx-auto mt-36 flex flex-col items-start md:items-center gap-y-2">
            <p className="text-4xl">Server management made easy</p>
            <span className="text-xl">
              Set and forget. Mochi does it all for you, automatically
            </span>
            <Link href="/server-management">
              <a className="items-center gap-x-1 flex text-blue-500 underline font-medium">
                <span className="hover:text-mochi text-blue-500 font-medium">
                  Learn more
                </span>
                <ExternalLinkIcon width={16} height={16} />
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
        <div className="body-block px-6 md:px-12 flex flex-col">
          <div className="mx-auto mt-36 flex flex-col items-start md:items-center gap-y-2">
            <p className="text-4xl">Crypto Utilities</p>
            <span className="text-xl">
              Access all thing crypto without having to leave Discord
            </span>
            <Link href="/crypto-utils">
              <a className="items-center gap-x-1 flex text-blue-500 underline font-medium">
                <span className="hover:text-mochi text-blue-500 font-medium">
                  Learn more
                </span>
                <ExternalLinkIcon width={16} height={16} />
              </a>
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 gap-6">
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
                  className="rounded-lg bg-white border border-gray-200 p-6 flex flex-col items-start"
                >
                  <CircledIcon src={u.icon} />
                  <p className="text-xl mt-2">{u.title}</p>
                  <span className="text-base mt-1">{u.desc}</span>
                </div>
              )
            })}
          </div>
        </div>
        <div className="body-block px-6 md:px-12">
          <div className="mx-auto mt-36 flex flex-col items-start md:items-center gap-y-2">
            <p className="text-4xl">NFT + Discord = WAGMI</p>
            <span className="text-xl">
              A full set of tools for minters, traders, and collection owners
            </span>
            <Link href="/nft">
              <a className="items-center gap-x-1 flex text-blue-500 underline font-medium">
                <span className="hover:text-mochi text-blue-500 font-medium">
                  Learn more
                </span>
                <ExternalLinkIcon width={16} height={16} />
              </a>
            </Link>
          </div>
          <div className="mt-16 md:mt-32 flex flex-col gap-y-8 md:gap-y-0 md:flex-row justify-between">
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
        <div className="body-block px-6 md:px-12 mt-44 flex flex-col">
          <div className="mx-auto flex flex-col items-start md:items-center gap-y-2">
            <p className="text-4xl">Social</p>
            <span className="text-xl">
              Engage with your community and honor members.
            </span>
            <Link href="/social">
              <a className="items-center gap-x-1 flex text-blue-500 underline font-medium">
                <span className="hover:text-mochi text-blue-500 font-medium">
                  Learn more
                </span>
                <ExternalLinkIcon width={16} height={16} />
              </a>
            </Link>
          </div>
          <div className="mt-10 border border-gray-200 bg-white rounded-lg py-5 px-10 flex flex-col md:flex-row gap-y-8 md:gap-y-0 justify-between">
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
                  className="flex flex-col text-center items-center"
                >
                  <CircledIcon src={s.icon} />
                  <p className="text-xl mt-1">{s.title}</p>
                  <span className="mt-1 text-base">{s.desc}</span>
                </div>
              )
            })}
          </div>
        </div>
        <div className="body-block px-6 md:px-12 mt-44 flex flex-col">
          <div className="mx-auto flex flex-col items-start md:items-center gap-y-2">
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
