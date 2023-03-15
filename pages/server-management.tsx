import Image from 'next/image'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { Button } from '~components/Button'
import { CommandText } from '~components/CommandText'
import { CTA } from '~components/CTA'
import { FeatureIntroduction } from '~components/FeatureIntroduction'
import { RingsBackground } from '~components/RingsBackground'
import { INVITE_LINK } from '~envs'
import {
  feature1,
  feature2,
  feature3,
  feature4,
  feature5,
  feature6,
  feature7,
  heroBg,
} from '~utils/image'

export default function ServerManagement() {
  return (
    <div className="overflow-hidden relative">
      <div className="absolute left-0 z-0 w-full min-h-screen aspect-auto top-[-80px]">
        <Image src={heroBg} fill alt="" />
      </div>
      <Layout>
        <SEO
          title="Server Management"
          description="Manage your Discord community with ease!"
        />
        <div className="flex relative flex-col justify-center items-center px-6 mt-10 md:px-12 body-block h-[400px]">
          <div className="absolute top-0 left-0 w-full h-full">
            <RingsBackground />
          </div>
          <p className="relative text-2xl text-center sm:text-3xl md:text-5xl">
            Manage your Discord
            <br />
            community with ease!
          </p>
          <span className="relative mt-4 text-sm text-center sm:text-base md:text-xl">
            Set and forget. Mochi does it all for you, automatically
          </span>
          <Button href={INVITE_LINK} className="relative mt-4">
            Get Mochi
          </Button>
        </div>
        <div className="flex flex-col px-6 md:gap-y-10 md:px-12 body-block">
          <FeatureIntroduction
            image={feature1}
            title={<p className="text-4xl">Holder Verification</p>}
            subtitle={
              <div className="flex flex-col gap-y-2 items-start mt-4">
                <CommandText>$verify</CommandText>
                <span>Manage role and channel for verified users.</span>
              </div>
            }
          />
          <FeatureIntroduction
            flip
            image={feature2}
            title={<p className="text-4xl">Automatic Role Grant</p>}
            subtitle={
              <div className="grid grid-cols-2 grid-rows-2 gap-2 mt-4">
                <div className="flex flex-col gap-y-2 items-start">
                  <CommandText>$defaultrole</CommandText>
                  <span>
                    Grant role for newcomers
                    <br />
                    automatically.
                  </span>
                </div>
                <div className="flex flex-col gap-y-2 items-start">
                  <CommandText>$reactionrole</CommandText>
                  <span>
                    Let users add &amp; remove roles
                    <br />
                    by reacting to a message.
                  </span>
                </div>
                <div className="flex flex-col gap-y-2 items-start">
                  <CommandText>$levelrole</CommandText>
                  <span>
                    Honor users with a new role
                    <br />
                    upon reaching a new level.
                  </span>
                </div>
                <div className="flex flex-col gap-y-2 items-start">
                  <CommandText>$nftrole</CommandText>
                  <span>
                    Assign role to users based on
                    <br />
                    the number of NFT that they
                    <br />
                    own. Multiple collections and
                    <br />
                    grouping are supported.
                  </span>
                </div>
              </div>
            }
          />
          <FeatureIntroduction
            image={feature3}
            title={
              <p className="mt-10 text-4xl md:mt-0">Detailed Server Insights</p>
            }
            subtitle={
              <div className="flex flex-col gap-y-2 items-start mt-4">
                <CommandText>$stats</CommandText>
                <span>
                  Updated server stats, including channels, members,
                  <br />
                  emojis, and stickers.
                </span>
              </div>
            }
          />
          <FeatureIntroduction
            flip
            image={feature4}
            title={<p className="text-4xl">Smooth Onboarding Experience</p>}
            subtitle={
              <div className="flex flex-col gap-y-2 items-start mt-4">
                <CommandText>$welcome</CommandText>
                <span>
                  Give your new members a heartwarming welcome
                  <br />
                  with our ready-to-use and fully customizable designs.
                </span>
              </div>
            }
          />
          <FeatureIntroduction
            image={feature5}
            title={<p className="text-4xl">Facilitate Engagement</p>}
            subtitle={
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2 items-start mt-4">
                  <CommandText>$log</CommandText>
                  <span>Record all users&apos; activities in a channel.</span>
                </div>
                <div className="flex flex-col gap-y-2 items-start mt-4">
                  <CommandText>$gm</CommandText>
                  <span>
                    Create a good morning/good night channel for users
                    <br />
                    to engage and keep streaks.
                  </span>
                </div>
              </div>
            }
          />
          <FeatureIntroduction
            flip
            image={feature6}
            title={
              <p className="text-4xl">
                Grow your
                <br />
                community
              </p>
            }
            subtitle={
              <div className="flex flex-col gap-y-2 items-start mt-4">
                <CommandText>$invite</CommandText>
                <span>
                  A quick &amp; easy way to catch up with invite activity.
                </span>
              </div>
            }
          />
          <FeatureIntroduction
            image={feature7}
            title={<p className="text-4xl">Automatically clean your server</p>}
            subtitle={
              <div className="flex flex-col gap-y-2 items-start mt-4">
                <CommandText>$prune</CommandText>
                <span>Instantly remove inactive users from your server.</span>
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
