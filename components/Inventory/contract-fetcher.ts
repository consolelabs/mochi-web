import { API } from '~constants/api'
import type { Inventory } from '.'

export default async function fetcher(
  address: string,
  chainId: number,
): Promise<Inventory> {
  const collections = await API.getUserNFTCollections(address)
  const promises = collections.map(async (col: any) => {
    const nfts = await API.getUserNFTs(address, col.collection_address, chainId)

    return {
      [`${col.symbol}/${col.name}`]: {
        address: col.collection_address,
        name: col.name,
        collectionImage: col.image,
        items: nfts.map((n: any) => ({
          id: n.token_id,
          name: n.name,
          description: n.description,
          image: n.image_cdn,
        })),
      },
    }
  })

  const result = await Promise.allSettled(promises)

  return result
    .filter((r) => r.status === 'fulfilled')
    .map((r) => r.status === 'fulfilled' && r.value)
    .reduce((acc, c) => ({ ...acc, ...c }), {})
}
