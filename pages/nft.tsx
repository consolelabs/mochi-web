import Image from 'next/image'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { Button } from '~components/Button'
import { CommandText } from '~components/CommandText'
import { CTA } from '~components/CTA'
import { FeatureIntroduction } from '~components/FeatureIntroduction'
import { RingsBackground } from '~components/RingsBackground'

export default function NFT() {
  return (
    <div className="relative overflow-hidden">
      <div className="w-full min-h-screen aspect-auto absolute left-0 top-[-80px] z-0">
        <Image layout="fill" src="/hero-bg.png" alt="" />
      </div>
      <Layout>
        <SEO
          title="NFT"
          description="Track multiple NFT collections in an instant!"
        />
        <div className="mt-10 body-block px-6 md:px-12 flex flex-col relative items-center justify-center h-[400px]">
          <div className="absolute top-0 left-0 w-full h-full">
            <RingsBackground />
          </div>
          <p className="text-center relative text-2xl sm:text-3xl md:text-5xl">
            Track multiple NFT
            <br />
            collections in an instant!
          </p>
          <span className="relative mt-4 text-sm sm:text-base md:text-xl text-center">
            Set and forget. Mochi does it all for you, automatically
          </span>
          <Button className="relative mt-4">Learn more</Button>
        </div>
        <div className="body-block px-6 md:px-12 flex flex-col gap-y-20">
          <FeatureIntroduction
            height={{
              default: 400,
              md: 500,
            }}
            image="/feature-12.png"
            title={<p className="text-4xl">NFT Rarity ranking</p>}
            subtitle={
              <div className="flex flex-col items-start mt-4 gap-y-2">
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
            height={{
              default: 300,
              md: 450,
            }}
            flip
            image="/feature-13.png"
            title={<p className="text-4xl">NFT Sales tracker</p>}
            subtitle={
              <div className="flex flex-col items-start mt-4 gap-y-2">
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
