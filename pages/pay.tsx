import Image from 'next/image'
import { Icon } from '@iconify/react'
import { Layout } from '~app/layout'
import { heading } from '~components/Dashboard/Heading'
import { SEO } from '~app/layout/seo'
import QRCodeButton from '~components/Pay/QRCodeButton'
import CopyLinkButton from '~components/Pay/CopyLinkButton'
import ShareButton from '~components/Pay/ShareButton'
import WithdrawButton from '~components/Pay/WithdrawButton'

export default function Pay() {
  return (
    <Layout>
      <SEO title="Pay" tailTitle />
      <div className="text-center md:mt-32 md:mb-40 my-8 mx-auto max-w-[410px] flex flex-col gap-y-6 bg-[#FFFFFF] rounded-2xl p-8">
        <h1 className={heading({ size: 'base' })}>Pay Link</h1>
        <div className="grid grid-cols-3 gap-x-2">
          <QRCodeButton uri="https://mochi.gg/server-management" />
          <CopyLinkButton link="TODO later" />
          <ShareButton />
        </div>

        {/* card */}
        <div className="relative overflow-hidden pay-card flex flex-col min-h-[200px] p-8 border-solid border-2 border-black/15% rounded-2xl text-[#FFFFFF]">
          <div className="flex justify-between items-center">
            <div className="font-semibold">Total Balance</div>
            <Icon icon="mdi:contactless-payment" />
          </div>
          <div className="flex gap-x-1 mt-[10px] items-center">
            <div className="relative w-8 h-8 rounded-full">
              <Image
                fill={true}
                src="/integrated-chains/sol.png"
                alt="ftm-logo"
              />
            </div>
            <div>
              <span className="text-[#FFFFFF] font-semibold text-[32px]">
                0.1
              </span>
              <span className="text-[#FFFFFF] ml-1 font-bold text-sm">FTM</span>
            </div>
          </div>
          <div className="mt-auto text-right font-normal text-xs">
            Powered by Mochi
          </div>
        </div>

        <WithdrawButton />
      </div>
    </Layout>
  )
}
