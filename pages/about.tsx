import { Mission } from "~app/about/mission";
import { Team } from "~app/about/team";
import { Layout } from "~app/layout";
import { SEO } from "~app/layout/seo";
import { SidewayHeading } from "~components/heading/sideway";
import { PAGES } from "~constants";

export default function AboutPage() {
  return (
    <Layout>
      <SEO title={PAGES.ABOUT.title} tailTitle />
      <div className="max-w-5xl px-12 py-16 mx-auto">
        <div className="flex items-start">
          <SidewayHeading>About</SidewayHeading>
          <div className="flex-1 px-12">
            <p className="mb-6 font-serif text-2xl text-right">
              We build tools that make blockchain easier than ever for everyone.
            </p>
            <Mission />
            <Team />
          </div>
        </div>
      </div>
    </Layout>
  );
}
