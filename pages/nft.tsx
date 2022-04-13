import { Layout } from "~app/layout";
import { SEO } from "~app/layout/seo";
import { PAGES } from "~constants";

export default function NFTPage() {
  return (
    <Layout>
      <SEO title={PAGES.NFT.title} tailTitle />
      <div className="max-w-5xl px-12 py-16 pr-0 mx-auto lg:pr-12 md:mt-12">
        Hm...
      </div>
    </Layout>
  );
}
