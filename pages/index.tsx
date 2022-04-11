import { AddBotSection } from "~app/landing/add-bot";
import { FeaturesSection } from "~app/landing/features";
import { IntroductionSection } from "~app/landing/introduction";
import { Layout } from "~app/layout";
import { SEO } from "~app/layout/seo";

export default function IndexPage() {
  return (
    <Layout>
      <SEO />
      <IntroductionSection />
      <FeaturesSection />
      <AddBotSection />
    </Layout>
  );
}
