import { Layout } from "~app/layout";
import { SEO } from "~app/layout/seo";
import { PAGES } from "~constants";
import { Mission } from "./mission";
import { Team } from "./team";

export const AboutPage = () => (
  <Layout>
    <SEO title={PAGES.ABOUT.title} tailTitle />
    <div className="max-w-5xl px-12 py-16 pr-0 mx-auto lg:pr-12 md:mt-12">
      <p className="mb-6 font-serif text-2xl text-right">
        We build tools that make blockchain easier than ever for everyone.
      </p>
      <Mission />
      <Team />
    </div>
  </Layout>
);
