import Head from "next/head";
import { PAGES } from "~constants";

interface Props {
  title?: string;
  tailTitle?: boolean;
  description?: string;
}

export const CONFIG = {
  title: PAGES.HOME.title,
  description: "Mochi Bot — Bring the Web3 universe to your Discord server",
  url: "https://getmochi.co/",
  image: "https://getmochi.co/featured.png",
};

export const SEO = ({
  title = CONFIG.title,
  tailTitle = false,
  description = CONFIG.description,
}: Props) => (
  <Head>
    <title>{title + (tailTitle === true ? ` - ${CONFIG.title}` : "")}</title>

    <meta name="title" content={title} />
    <meta name="description" content={description} />

    <meta property="og:type" content="website" />
    <meta property="og:url" content={CONFIG.url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={CONFIG.image} />

    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={CONFIG.url} />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={CONFIG.image} />
  </Head>
);
