import { Layout } from "~app/layout";
import { SEO } from "~app/layout/seo";
import { NFTHeading } from "~app/nfts/heading";
import { NFTIntro } from "~app/nfts/intro";
import { NFTMint } from "~app/nfts/mint";
import { NFTWhy } from "~app/nfts/why";
import { PAGES } from "~constants";

export default function NFTPage() {
  return (
    <Layout>
      <SEO title={PAGES.NFT.title} tailTitle />
      <NFTHeading />
      <NFTIntro />
      <NFTMint />
      <NFTWhy />
    </Layout>
  );
}
