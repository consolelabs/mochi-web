import { Layout } from "~app/layout";
import { SEO } from "~app/layout/seo";
import { AddBotSection } from "./add-bot";
import { FeaturesSection } from "./features";
import { IntroductionSection } from "./introduction";
import { StatsSection } from "./stats";
import { MochiText } from "./text";

export const LandingPage = () => (
  <Layout>
    <SEO />
    <IntroductionSection />
    <FeaturesSection />
    <StatsSection />
    <MochiText className="max-w-7xl px-12 py-16 mx-auto" />
    <AddBotSection />
  </Layout>
);
