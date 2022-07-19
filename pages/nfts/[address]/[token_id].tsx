import { GetServerSideProps } from "next";
import React from "react";
import { Layout } from "~app/layout";
import { SEO } from "~app/layout/seo";
import NFTTokenPage from "~app/nft-collection/NFTTokenPage";
import { API } from "~constants/api";
import { getTraitEmoji } from "~constants/emoji";
import { INFTCollection, INFTTicker, INFTToken } from "~types/nft";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { address, token_id } = query;
    const [collection, token, ticker] = await Promise.all([
      API.getNFTCollectionDetails(address as string),
      API.getNFTTokenDetails(address as string, token_id as string),
      API.getNFTCollectionPrice(address as string),
    ]);

    if (!token || !collection) {
      throw new Error("Token not found");
    }

    return {
      props: {
        collection,
        token,
        ticker,
        seoDescription: [
          `Collection: ${collection.name} ✔`,
          token.rarity.rarity &&
            [
              `🏆ㅤTier: ${token.rarity.rarity}`,
              `Rank: ${token.rarity.rank}`,
              `Score: ${Number(token.rarity.score).toFixed(3)}`,
            ].join(" | "),
          !!ticker?.floor_price
            ? `💎ㅤFloor price: ${Number(ticker?.floor_price || 0)} ${
                ticker.chain
              }`
            : undefined,
          "\n",
          !!token.attributes?.length && `Attributes:`,
          (token.attributes || [])
            .map(
              (att) =>
                `${getTraitEmoji(att.trait_type)}${att.trait_type}: ${
                  att.value
                }`
            )
            .join("\n"),
        ]
          .filter(Boolean)
          .join("\n"),
      },
    };
  } catch (err) {
    console.error(`[GetNFTToken]`, err);
    return {
      notFound: true,
    };
  }
};

export default function Page({
  token,
  collection,
  ticker,
  seoDescription,
}: {
  collection: INFTCollection;
  ticker: INFTTicker;
  token: INFTToken;
  seoDescription: string;
}) {
  return (
    <Layout>
      <SEO
        tailTitle
        title={token.name}
        description={seoDescription || token.description}
        image={token.image?.replace(/^(ipfs:\/\/)/, "https://ipfs.io/ipfs/")}
      />
      <div className="max-w-7xl flex items-center justify-center mx-auto p-6 md:p-12">
        <NFTTokenPage token={token} collection={collection} ticker={ticker} />
      </div>
    </Layout>
  );
}
