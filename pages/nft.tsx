import { Layout } from "~app/layout";
import { SEO } from "~app/layout/seo";
import { NFTHeading } from "~app/nft/heading";
import { NFTIntro } from "~app/nft/intro";
import { PAGES } from "~constants";

export default function NFTPage() {
  return (
    <Layout>
      <SEO title={PAGES.NFT.title} tailTitle />
      <NFTHeading />
      <NFTIntro />
    </Layout>
  );
}
