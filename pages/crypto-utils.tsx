import Image from 'next/image'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { Button } from '~components/Button'
import { CommandText } from '~components/CommandText'
import { CTA } from '~components/CTA'
import { FeatureIntroduction } from '~components/FeatureIntroduction'
import { RingsBackground } from '~components/RingsBackground'
import { INVITE_LINK } from '~envs'
import { feature10, feature11, feature8, feature9, heroBg } from '~utils/image'

export default function CryptoUtilities() {
  return (
    <div className="relative overflow-hidden">
      <div className="w-full min-h-screen aspect-auto absolute left-0 top-[-80px] z-0">
        <Image src={heroBg} layout="fill" alt="" />
      </div>
      <Layout>
        <SEO
          title="Crypto Utilities"
          description="Interact with cryptocurrency right on Discord!"
        />
        <div className="mt-10 body-block px-6 md:px-12 flex flex-col relative items-center justify-center h-[400px]">
          <div className="absolute top-0 left-0 w-full h-full">
            <RingsBackground />
          </div>
          <p className="text-center relative text-2xl sm:text-3xl md:text-5xl">
            Interact with Cryptocurrency
            <br />
            right on Discord!
          </p>
          <Button href={INVITE_LINK} className="relative mt-4">
            Get Mochi
          </Button>
        </div>
        <div className="body-block px-6 md:px-12 flex flex-col">
          <FeatureIntroduction
            image={feature8}
            title={<p className="text-4xl">Crypto Ticker</p>}
            subtitle={
              <div className="flex flex-col items-start mt-4 gap-y-2">
                <CommandText>$ticker</CommandText>
                <span>
                  Display/compare coin prices and market cap via
                  <br />
                  visual graphics, with real-time data from CoinGecko.
                </span>
              </div>
            }
          />
          <FeatureIntroduction
            flip
            image={feature9}
            title={<p className="text-4xl">Watchlist</p>}
            subtitle={
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-col items-start mt-4 gap-y-2">
                  <CommandText>$watchlist</CommandText>
                  <span>
                    Track your favorite tokens&apos; price and movement.
                  </span>
                </div>
                <div className="flex flex-col items-start mt-4 gap-y-2">
                  <CommandText>$token</CommandText>
                  <span>Manage all tokens supported by Mochi.</span>
                </div>
              </div>
            }
          />
          <FeatureIntroduction
            image={feature10}
            title={<p className="text-4xl">Tip bot</p>}
            subtitle={
              <div className="grid grid-cols-2 grid-rows-2 gap-x-2 gap-y-6 mt-4">
                <div className="flex flex-col gap-y-2 items-start">
                  <CommandText>$tip</CommandText>
                  <span>
                    Gift tokens to friends on
                    <br />
                    the server.
                  </span>
                </div>
                <div className="flex flex-col gap-y-2 items-start">
                  <CommandText>$withdraw</CommandText>
                  <span>
                    Withdraw tokens from
                    <br />
                    Discord wallet to your
                    <br />
                    actual one.
                  </span>
                </div>
                <div className="flex flex-col gap-y-2 items-start">
                  <CommandText>$deposit</CommandText>
                  <span>
                    Make a deposit to your
                    <br />
                    wallet on Discord.
                  </span>
                </div>
                <div className="flex flex-col gap-y-2 items-start">
                  <CommandText>$balances</CommandText>
                  <span>Check the balance of your Discord wallet.</span>
                </div>
              </div>
            }
          />
          <FeatureIntroduction
            flip
            image={feature11}
            title={<p className="text-4xl">Airdrop</p>}
            subtitle={
              <div className="flex flex-col items-start mt-4 gap-y-2">
                <CommandText>$airdrop</CommandText>
                <span>
                  Airdrops, money rains, and other community-
                  <br />
                  engaging activities.
                </span>
              </div>
            }
          />
        </div>
        <div className="mt-44">
          <CTA />
        </div>
      </Layout>
    </div>
  )
}
