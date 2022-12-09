import { ExternalLinkIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { Button } from '~components/Button'
import { CircledIcon } from '~components/CircledIcon'
import { CTA } from '~components/CTA'
import { FeatureIntroduction } from '~components/FeatureIntroduction'
import { DiscordIcon } from '~components/icons/discord'
import { RingsBackground } from '~components/RingsBackground'
import { Stats } from '~components/Stats'

const scale = 2.25

export default function index() {
  return (
    <div className="relative overflow-hidden">
      <div className="w-full min-h-screen aspect-auto absolute left-0 top-[-80px] z-0">
        <Image layout="fill" src="/hero-bg.png" alt="" />
      </div>
      <Layout>
        <SEO />
        <div className="lg:mt-40 flex flex-col-reverse lg:flex-row justify-between relative body-block h-[600px] px-6 md:px-12">
          <div className="relative z-10 flex flex-col">
            <p className="text-3xl md:text-5xl">
              Bring <span className="text-[#f17975]">Web3</span> universe to
              <br />
              your <span className="text-[#6875ED]">Discord</span> server
            </p>
            <span className="mt-5 text-sm md:text-xl">
              Smooth onboarding, automated moderation, crypto ticker,
              <br />
              NFT rarity ranking, and much more.
            </span>
            <div className="mt-10 flex gap-x-5">
              <Button appearance="primary">
                <DiscordIcon className="w-5 h-5" />
                <div>Get Mochi</div>
              </Button>
              <Button appearance="tertiary">Features</Button>
            </div>
          </div>
          <div className="absolute -right-32 -top-1/3 w-2/3 h-full">
            <RingsBackground />
          </div>
          <div className="relative flex-1 flex justify-center items-center lg:justify-end lg:items-start">
            <Image
              width={1080 / scale}
              height={669 / scale}
              src="/rocket.png"
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
            <a
              href="#"
              className="items-center gap-x-1 flex text-blue-500 underline font-medium"
            >
              <span className="text-blue-500 font-medium">Learn more</span>
              <ExternalLinkIcon width={16} height={16} />
            </a>
          </div>
          {/* FEATURES */}
          <FeatureIntroduction
            height={{
              default: 400,
              md: 400,
            }}
            title="Holder Verification"
            subtitle={
              <>
                Manage access to holder-exclusive private channels,
                <br />
                multiple collections at once.
              </>
            }
            image="/feature-1.png"
          />
          {/* ======================= */}
          <FeatureIntroduction
            flip
            title="Automatic Role Grant"
            subtitle={
              <>
                Lets users add &amp; remove roles from themselves by
                <br />
                simply reacting to a message.
              </>
            }
            image="/feature-2.png"
          />
          {/* ======================= */}
          <FeatureIntroduction
            title="Detailed Server Insights"
            subtitle={
              <>
                The lastest server stats bot you need to make the right
                <br />
                decisions.
              </>
            }
            image="/feature-3.png"
          />
          {/* ======================= */}
          <FeatureIntroduction
            flip
            title={
              <>
                Smooth Onboarding
                <br />
                Experience
              </>
            }
            subtitle={
              <>
                Give your new members a heartwarmng welcome
                <br />
                with our ready-to-use and fully customizable designs.
              </>
            }
            image="/feature-4.png"
          />
          {/* ======================= */}
          <FeatureIntroduction
            title="Facilitate Engagement"
            subtitle={
              <>
                Quick &amp; easy to setup dedicated channels for fun &amp;
                <br />
                engaging activities such as GM.
              </>
            }
            image="/feature-5.png"
          />
        </div>
        <div className="relative mt-[-800px]">
          <div className="relative h-[1142px]">
            <Image layout="fill" src="/diag.png" alt="" />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Image
              width={134}
              height={136}
              src="/mochi-text-circle.png"
              alt=""
            />
          </div>
        </div>
        <div className="body-block px-6 md:px-12 flex flex-col">
          <div className="mx-auto mt-36 flex flex-col items-start md:items-center gap-y-2">
            <p className="text-4xl">Crypto Utilities</p>
            <span className="text-xl">
              Access all thing crypto without having to leave Discord
            </span>
            <a
              href="#"
              className="items-center gap-x-1 flex text-blue-500 underline font-medium"
            >
              <span className="text-blue-500 font-medium">Learn more</span>
              <ExternalLinkIcon width={16} height={16} />
            </a>
          </div>
          <div className="mt-10 grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 gap-6">
            {[
              {
                icon: '/util-1.png',
                title: 'Crypto ticker',
                desc: 'Track real-time price of more than 9,000 tokens supported',
              },
              {
                icon: '/util-2.png',
                title: 'Watchlist',
                desc: 'Save a list of favorite tokens and pairs for a quick update',
              },
              {
                icon: '/util-3.png',
                title: 'Tip bot',
                desc: 'Send and receive any amount of crypto, directly on Discord',
              },
              {
                icon: '/util-4.png',
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
            <a
              href="#"
              className="items-center gap-x-1 flex text-blue-500 underline font-medium"
            >
              <span className="text-blue-500 font-medium">Learn more</span>
              <ExternalLinkIcon width={16} height={16} />
            </a>
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
          <img className="w-full mt-10" src="/nft-rarity-ranking.png" alt="" />
        </div>
        <div className="body-block px-6 md:px-12 mt-44 flex flex-col">
          <div className="mx-auto flex flex-col items-start md:items-center gap-y-2">
            <p className="text-4xl">Social</p>
            <span className="text-xl">
              Engage with your community and honor members.
            </span>
            <a
              href="#"
              className="items-center gap-x-1 flex text-blue-500 underline font-medium"
            >
              <span className="text-blue-500 font-medium">Learn more</span>
              <ExternalLinkIcon width={16} height={16} />
            </a>
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
        <div className="mt-20">
          <CTA />
        </div>
      </Layout>
    </div>
  )
}
