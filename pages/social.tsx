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
    <div className="relative overflow-hidden">
      <div className="w-full min-h-screen aspect-auto absolute left-0 top-[-80px] z-0">
        <Image src={heroBg} alt="" />
      </div>
      <Layout>
        <SEO
          title="Social"
          description="ENGAGE with your community & honor members"
        />
        <div className="mt-10 body-block px-6 md:px-12 flex flex-col relative items-center justify-center h-[400px]">
          <div className="absolute top-0 left-0 w-full h-full">
            <RingsBackground />
          </div>
          <p className="text-center relative text-2xl sm:text-3xl md:text-5xl">
            ENGAGE with your
            <br />
            community &amp; honor members
          </p>
          <span className="relative mt-4 text-sm sm:text-base md:text-xl text-center">
            Set and forget. Mochi does it all for you, automatically
          </span>
          <Button href={INVITE_LINK} className="relative mt-4">
            Get Mochi
          </Button>
        </div>
        <div className="body-block px-6 md:px-12 flex flex-col">
          <FeatureIntroduction
            image={feature14}
            title={<p className="text-4xl">Beyond Discord</p>}
            subtitle={
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-col items-start mt-4 gap-y-2">
                  <CommandText>$poe</CommandText>
                  <span>
                    Drive engagement to your server via automatically
                    <br />
                    forwarded tweets.
                  </span>
                </div>

                <div className="flex flex-col items-start mt-4 gap-y-2">
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
              <div className="flex flex-col items-start mt-4 gap-y-2">
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
                <div className="flex flex-col items-start mt-4 gap-y-2">
                  <CommandText>$top</CommandText>
                  <span>
                    Let your community know are the most active
                    <br />
                    members.
                  </span>
                </div>

                <div className="flex flex-col items-start mt-4 gap-y-2">
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
