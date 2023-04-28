import Image from 'next/image'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import {
  pepechan,
  pepeDropCrown,
  pepegod,
  pepeIllu1,
  pepeIllu2,
  pepeIllu3,
  pepeIllu4,
  pepejak1_1,
  pepejak1_2,
  pepemouth,
  peper,
  peperman,
  pepewiz,
  superrareartwork,
} from '~utils/image'
import Balancer from 'react-wrap-balancer'
import { Button } from '~components/Button'
import { PepeCard } from '~components/PepeCard'
import { Icon } from '@iconify/react'
import Particles from 'react-particles'
import { loadFull } from 'tsparticles'
import particlesJson from '../utils/particles.json'
import { FeatureIntroduction } from '~components/FeatureIntroduction'
import Head from 'next/head'

const particle = {
  src: pepejak1_1.src,
}

particlesJson.particles.shape.options.image = [particle] as any
particlesJson.particles.shape.options.images = [particle] as any

export default function Mint() {
  return (
    <div className="overflow-hidden relative">
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/pepe-favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/pepe-favicon-16x16.png"
        />
      </Head>
      <Layout darkNav showBanner={false}>
        <SEO
          title="Pepe mint"
          description="A hilarious and uniqe Pepe is the key to obtain $MOCHI"
        />
        <div
          style={{
            height: 'calc(100vh - 72px)',
          }}
          className="flex relative gap-x-10 justify-center items-center w-full max-h-screen min-h-[700px] bg-near-black"
        >
          <Particles
            id="tsparticles"
            options={particlesJson as any}
            init={async (engine) => {
              await loadFull(engine)
            }}
            className="absolute w-full h-full"
          />
          <Image
            className="absolute bottom-0 left-0 w-48 2xl:w-96 aspect-auto scale-x-[-1]"
            src={pepejak1_2}
            alt="pepejack pointing"
          />
          <div className="flex relative max-w-[500px]">
            <Image
              className="object-contain !w-32 !h-32 !left-full -translate-y-28 -translate-x-32"
              fill
              src={superrareartwork}
              alt="super rare artwork stamp"
            />
            <div>
              <p className="text-6xl font-thin text-white font-clash">Earn a</p>
              <div className="grid auto-cols-max auto-rows-max gap-y-1 gap-x-2">
                <span className="col-start-1 row-start-1 text-9xl leading-[0.85] text-pepe font-clash-bold">
                  PEPE
                </span>
                <Image
                  className="inline-flex col-start-2 row-start-1 w-24 h-24"
                  src={pepejak1_1}
                  alt="pepe face suprised"
                />
                <Image
                  className="col-start-1 row-start-2 w-full"
                  src={pepemouth}
                  alt="pepe mouth"
                />
              </div>

              <span className="inline-block mt-5">
                <Balancer className="text-gray-300">
                  A hilarious and unique Pepe is the key to obtain $MOCHI which
                  grant access to{' '}
                  <span className="font-semibold text-inherit">Mochi Earn</span>{' '}
                  and an abundant of earning activities.
                </Balancer>
              </span>
              <span className="inline-block mt-5">
                <Balancer className="text-gray-300">
                  This Collection is founded on the concepts of community first
                  and under promise - over deliver.
                </Balancer>
              </span>

              <div className="flex gap-x-2 mt-8">
                <Button appearance="discord">Join Discord</Button>
                <Button appearance="telegram">Follow @mochi.gg</Button>
              </div>
            </div>
          </div>

          <div className="overflow-hidden relative bg-white rounded-xl min-w-[500px]">
            <div
              className="flex flex-col items-center p-4 py-8"
              style={{
                background:
                  'linear-gradient(95.71deg, #FFE6DE 1.69%, #DCF7EA 54.43%, #F8EAB9 100%)',
              }}
            >
              <p className="text-lg font-clash-bold">Mint is coming, kings</p>
            </div>
            <div className="flex justify-center p-20">
              <PepeCard img={pepechan}>
                <p className="mt-2 text-2xl text-center font-clash-semi">
                  Pepe-chan 💅
                </p>
              </PepeCard>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-32 body-block">
          <PepeCard.Cards img={[peper, peperman, pepewiz, pepegod, pepechan]} />
          <p className="mt-36 text-5xl font-clash-bold">
            Pepe + $Mochi = WAGMI
          </p>
        </div>
        <div className="flex flex-col px-32 mt-20 body-block">
          <FeatureIntroduction
            flip
            image={
              <div className="flex relative justify-center w-[450px]">
                <Image
                  className="object-cover rounded"
                  src={pepeDropCrown}
                  alt=""
                />
                <p className="absolute top-5 text-5xl text-meme font-clash-bold">
                  hey king
                </p>
                <p className="absolute bottom-5">
                  <Balancer className="text-4xl text-center text-meme font-clash-semi">
                    i think you dropped this
                  </Balancer>
                </p>
              </div>
            }
            title="Frognation citizen = Kings"
            subtitle="If you already own $TIME or $MIM or $ICE, you can mint our exclusive Pepe collection."
          />
          <FeatureIntroduction
            image={<Image src={pepeIllu2} className="w-[500px]" alt="" />}
            title="Limited time!"
            subtitle="Minting Pepe festival only opens from 10th May to 10th June, so hurry up!"
          />
          <FeatureIntroduction
            flip
            image={<Image src={pepeIllu3} className="ml-48 w-[300px]" alt="" />}
            title="Majestic & Unique"
            subtitle="No 2 Pepes are the same, Kings don't have duplication, they just have too many Pepes in their bag"
          />
          <FeatureIntroduction
            image={<Image src={pepeIllu4} className="mr-20 w-[400px]" alt="" />}
            title="Earn $MOCHI for holding"
            subtitle="True Kings use $MOCHI, holding Pepes will also reward holders with $MOCHI"
          />
        </div>
        <div className="flex justify-center px-24 mt-64 body-block">
          <div className="py-8 px-4 bg-white rounded-xl border-y border-near-black">
            <p className="text-3xl text-center font-clash-semi">
              How does it work?
            </p>
            <div className="grid grid-cols-3 grid-rows-1 gap-x-28 mt-10">
              {[
                {
                  icon: 'solar:wallet-2-bold',
                  title: 'Setup your wallet',
                  desc: 'Once you’ve set up your wallet of choice, connect it to the website by clicking the wallet icon in the top right corner.',
                },
                {
                  icon: 'ri:money-dollar-circle-fill',
                  title: 'Mint token',
                  desc: 'If you own one of 3 tokens:$TIME, $MIM, and $ICE; you can mint NFTs. Otherwise let’s buy some tokens to own this exclusive NFT!',
                },
                {
                  icon: 'solar:bag-4-bold',
                  title: 'Sell & Trade',
                  desc: 'You can bridge Pepe to any blockchain by using LayerZero, then trade on different NFT market place.',
                },
              ].map((e) => {
                return (
                  <div key={`how-does-it-work-${e.title}`} className="">
                    <Icon icon={e.icon} width={44} className="mx-auto" />
                    <p className="mt-5 text-lg font-semibold text-center">
                      {e.title}
                    </p>
                    <span>
                      <Balancer className="inline-block mt-2 text-center">
                        {e.desc}
                      </Balancer>
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-20 w-full h-96 bg-near-black">
          <p className="text-4xl font-clash-semi text-pepe">
            In partnership with
          </p>
        </div>
        <div className="flex flex-col items-center mt-32 mb-16 body-block">
          <p className="text-5xl font-clash-semi text-near-black">
            Earn WAGMI opportunities with Pepe!
          </p>
          <button className="py-2 px-4 mt-10 rounded-xl bg-near-black">
            <span
              className="font-medium text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #F4C4C2 0%, #EEC3FD 48.96%, #8FC6E4 100%)',
              }}
            >
              Mint Now
            </span>
          </button>
        </div>
      </Layout>
    </div>
  )
}
