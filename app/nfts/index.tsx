import { Layout } from "~app/layout";
import { SEO } from "~app/layout/seo";
import { PAGES } from "~constants";
import { NFTHeading } from "./heading";
import { NFTIntro } from "./intro";
import { NFTMint } from "./mint";
import { NFTWhy } from "./why";

export const NFTPage = () => (
  <Layout>
    <SEO title={PAGES.NFT.title} tailTitle />
    <NFTHeading />
    <NFTIntro />
    <NFTMint />
    <NFTWhy />
  </Layout>
);
