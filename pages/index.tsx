import { AddBotSection } from "~app/landing/add-bot";
import { FeaturesSection } from "~app/landing/features";
import { IntroductionSection } from "~app/landing/introduction";
import { MochiText } from "~app/landing/text";
import { Layout } from "~app/layout";
import { SEO } from "~app/layout/seo";

export default function IndexPage() {
  return (
    <Layout>
      <SEO />
      <IntroductionSection />
      <FeaturesSection />
      <MochiText />
      <AddBotSection />
    </Layout>
  );
}
