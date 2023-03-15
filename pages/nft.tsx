import Image from 'next/image'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { Button } from '~components/Button'
import { CommandText } from '~components/CommandText'
import { CTA } from '~components/CTA'
import { FeatureIntroduction } from '~components/FeatureIntroduction'
import { RingsBackground } from '~components/RingsBackground'
import { INVITE_LINK } from '~envs'
import { feature12, feature13, heroBg } from '~utils/image'

export default function NFT() {
  return (
    <div className="overflow-hidden relative">
      <div className="absolute left-0 z-0 w-full min-h-screen aspect-auto top-[-80px]">
        <Image src={heroBg} fill alt="" />
      </div>
      <Layout>
        <SEO
          title="NFT"
          description="Track multiple NFT collections in an instant!"
        />
        <div className="flex relative flex-col justify-center items-center px-6 mt-10 md:px-12 body-block h-[400px]">
          <div className="absolute top-0 left-0 w-full h-full">
            <RingsBackground />
          </div>
          <p className="relative text-2xl text-center sm:text-3xl md:text-5xl">
            Track multiple NFT
            <br />
            collections in an instant!
          </p>
          <Button href={INVITE_LINK} className="relative mt-4">
            Get Mochi
          </Button>
        </div>
        <div className="flex flex-col px-6 md:px-12 body-block">
          <FeatureIntroduction
            image={feature12}
            title={<p className="text-4xl">NFT Rarity ranking</p>}
            subtitle={
              <div className="flex flex-col gap-y-2 items-start mt-4">
                <CommandText>$nft</CommandText>
                <span>
                  Instant rarity checker from a huge database, plus
                  <br />
                  quick and easy collections indexing.
                </span>
              </div>
            }
          />
          <FeatureIntroduction
            flip
            image={feature13}
            title={<p className="text-4xl">NFT Sales tracker</p>}
            subtitle={
              <div className="flex flex-col gap-y-2 items-start mt-4">
                <CommandText>$sales</CommandText>
                <span>
                  Quickly catch up on market movement for potential
                  <br />
                  steals
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
