import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import Banner from '~components/Home/Banner'
import CommandMessages from '~components/Home/CommandMessages'
import PayYourFrens from '~components/Home/PayYourFrens'
import SendAGift from '~components/Home/SendAGift'
import SkipTheMath from '~components/Home/SkipTheMath'
import ExpressYourSelf from '~components/Home/ExpressYourSelf'
import List from '~components/Home/List'
import ApiIntegration from '~components/Home/ApiIntegration'
import SetupIsSimple from '~components/Home/SetupIsSimple'

const Divider = () => (
  <div className="px-4 mx-auto max-w-5xl my-16 md:my-24">
    <hr />
  </div>
)

export default function index() {
  return (
    <Layout>
      <SEO />
      <Banner />
      <CommandMessages />
      <PayYourFrens />
      <Divider />
      <SendAGift />
      <Divider />
      <SkipTheMath />
      <Divider />
      <ExpressYourSelf />
      <List />
      <ApiIntegration />
      <SetupIsSimple />
      <hr />
    </Layout>
  )
}
