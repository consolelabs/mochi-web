import Image from 'next/image'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { Button } from '~components/Button'
import { CommandText } from '~components/CommandText'
import { CTA } from '~components/CTA'
import { FeatureIntroduction } from '~components/FeatureIntroduction'
import { RingsBackground } from '~components/RingsBackground'
import { INVITE_LINK } from '~envs'
import { feature14, feature15, feature16, heroBg } from '~utils/image'

export default function NFT() {
  return (
    <div className="overflow-hidden relative">
      <div className="absolute left-0 z-0 w-full min-h-screen aspect-auto top-[-80px]">
        <Image src={heroBg} fill alt="" />
      </div>
      <Layout>
        <SEO
          title="Social"
          description="ENGAGE with your community & honor members"
        />
        <div className="flex relative flex-col justify-center items-center px-6 mt-10 md:px-12 body-block h-[400px]">
          <div className="absolute top-0 left-0 w-full h-full">
            <RingsBackground />
          </div>
          <p className="relative text-2xl text-center sm:text-3xl md:text-5xl">
            ENGAGE with your
            <br />
            community &amp; honor members
          </p>
          <span className="relative mt-4 text-sm text-center sm:text-base md:text-xl">
            Set and forget. Mochi does it all for you, automatically
          </span>
          <Button href={INVITE_LINK} className="relative mt-4">
            Get Mochi
          </Button>
        </div>
        <div className="flex flex-col px-6 md:px-12 body-block">
          <FeatureIntroduction
            image={feature14}
            title={<p className="text-4xl">Beyond Discord</p>}
            subtitle={
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2 items-start mt-4">
                  <CommandText>$poe</CommandText>
                  <span>
                    Drive engagement to your server via automatically
                    <br />
                    forwarded tweets.
                  </span>
                </div>

                <div className="flex flex-col gap-y-2 items-start mt-4">
                  <CommandText>$telegram</CommandText>
                  <span>
                    Transfer all data from Discord to Telegram easily.
                  </span>
                </div>
              </div>
            }
          />
          <FeatureIntroduction
            flip
            image={feature15}
            title={<p className="text-4xl">Starboard</p>}
            subtitle={
              <div className="flex flex-col gap-y-2 items-start mt-4">
                <CommandText>$starboard</CommandText>
                <span>Honor and share well-rated content.</span>
              </div>
            }
          />
          <FeatureIntroduction
            image={feature16}
            title={<p className="text-4xl">Leaderboard</p>}
            subtitle={
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2 items-start mt-4">
                  <CommandText>$top</CommandText>
                  <span>
                    Let your community know are the most active
                    <br />
                    members.
                  </span>
                </div>

                <div className="flex flex-col gap-y-2 items-start mt-4">
                  <CommandText>$profile</CommandText>
                  <span>View your own profile and other&apos;s</span>
                </div>
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
