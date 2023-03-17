import { heading } from '~components/Dashboard/Heading'
import { SEO } from '~app/layout/seo'
import QRCodeButton from '~components/Pay/QRCodeButton'
import CopyLinkButton from '~components/Pay/CopyLinkButton'
import ShareButton from '~components/Pay/ShareButton'
import WithdrawButton from '~components/Pay/WithdrawButton'
import Layout from '~components/Dashboard/Layout'
import Card from '~components/Pay/Card'
import Footer from '~components/Pay/Footer'

export default function Pay() {
  return (
    <Layout footer={<Footer />}>
      <SEO title="Pay" tailTitle />
      <div className="text-center md:mt-32 md:mb-40 my-8 mx-auto max-w-[410px] flex flex-col gap-y-6 bg-[#FFFFFF] rounded-2xl p-8">
        <h1 className={heading({ size: 'base' })}>Pay Link</h1>
        <div className="grid grid-cols-3 gap-x-2">
          <QRCodeButton uri="https://mochi.gg/server-management" />
          <CopyLinkButton link="TODO later" />
          <ShareButton />
        </div>

        <Card balance={0.1} coin="FTM" />
        <WithdrawButton />
      </div>
    </Layout>
  )
}
