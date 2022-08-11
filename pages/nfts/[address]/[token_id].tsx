import { GetServerSideProps } from 'next'
import React from 'react'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import NFTTokenPage from '~app/nft-collection/NFTTokenPage'
import { API } from '~constants/api'
import { getTraitEmoji } from '~constants/emoji'
import {
  IAttributeIcon,
  INFTCollection,
  INFTTicker,
  INFTToken,
} from '~types/nft'
import { sortNFTAttributes } from '~utils/nft'
import { capitalizeFirstLetter } from '~utils/string'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { address, token_id } = query
    const [collection, token, ticker] = await Promise.all([
      API.getNFTCollectionDetails(address as string),
      API.getNFTTokenDetails(address as string, token_id as string),
      API.getNFTCollectionPrice(address as string),
    ])

    if (!token || !collection) {
      throw new Error('Token not found')
    }
    const attrs = sortNFTAttributes(token.attributes || [])
    const traits = (token.attributes || []).map((att) => att.trait_type)
    const attrIcons = await API.getAttributeIcons(traits)
    const attrIconMap = (attrIcons || []).reduce(
      (acc, icon) => ({ ...acc, [icon.trait_type.toLowerCase()]: icon }),
      {},
    )

    const nftTier = token.rarity.rarity
      ? [
          `🏆ㅤTier: ${token.rarity.rarity}`,
          `Rank: ${token.rarity.rank}`,
          `Score: ${Number(token.rarity.score).toFixed(3)}`,
        ].join(' | ')
      : undefined

    const tokenPrice = !!ticker?.floor_price
      ? `💎ㅤFloor price: ${Number(ticker?.floor_price || 0)} ${ticker.chain}`
      : undefined

    const tokenAttrWithIcon = attrs.map((att) =>
      [
        getTraitEmoji(attrIconMap, att.trait_type),
        `${capitalizeFirstLetter(att.trait_type)}:`,
        att.value,
      ].join('ㅤ'),
    )

    return {
      props: {
        collection,
        token: { ...token, attributes: attrs },
        ticker,
        attrIcons: attrIconMap,
        seoDescription: [
          `Collection: ${collection.name} ✔`,
          nftTier,
          tokenPrice,
          '\n',
          !!token.attributes?.length && `Attributes:`,
          ...tokenAttrWithIcon,
        ]
          .filter(Boolean)
          .join('\n'),
      },
    }
  } catch (err) {
    console.error(`[GetNFTToken]`, err)
    return {
      notFound: true,
    }
  }
}

export default function Page({
  token,
  collection,
  ticker,
  seoDescription,
  attrIcons,
}: {
  collection: INFTCollection
  ticker: INFTTicker
  token: INFTToken
  attrIcons: Record<string, IAttributeIcon>
  seoDescription: string
}) {
  return (
    <Layout>
      <SEO
        tailTitle
        title={token.name}
        description={seoDescription || token.description}
        image={token.image?.replace(/^(ipfs:\/\/)/, 'https://ipfs.io/ipfs/')}
      />
      <div className="max-w-7xl flex items-center justify-center mx-auto p-6 md:p-12">
        <NFTTokenPage
          token={token}
          collection={collection}
          ticker={ticker}
          attrIcons={attrIcons}
        />
      </div>
    </Layout>
  )
}
