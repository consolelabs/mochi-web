import {
  IAttributeIcon,
  INFTCollectionList,
  INFTTicker,
  INFTToken,
  ITokenMetadata,
} from '~types/nft'
import { fetcher } from '~utils/fetcher'
import qs from 'querystring'
import getUnixTime from 'date-fns/getUnixTime'
import subDays from 'date-fns/subDays'

const isProd = process.env.NEXT_PUBLIC_ENV === 'production'

const API_GW = {
  DEV: 'https://develop-api.mochi.pod.town/api/v1',
  PROD: 'https://api.mochi.pod.town/api/v1',
  INDEXER: 'https://api.indexer.console.so/api/v1',
  // INDEXER: 'http://localhost:8080/api/v1',
}

const getGW = () => (isProd ? API_GW.PROD : API_GW.DEV)

const verify = async (
  wallet_address: string,
  code: string,
  signature: string,
) =>
  await fetcher.post<{ error?: string; status?: string }>(`${getGW()}/verify`, {
    wallet_address,
    code,
    signature,
  })

const getNFTTokenDetails = async (
  address: string,
  token_id: string | number,
) => {
  const data = await fetcher.get<{ error?: string; data?: INFTToken }>(
    `${API_GW.INDEXER}/nft/${address}/${token_id}`,
  )

  return data?.data
}

const getNFTCollectionDetails = async (address: string) => {
  const data = await fetcher.get<{ error?: string } & INFTCollectionList>(
    `${API_GW.INDEXER}/nft?address=${address}`,
  )

  return data?.data?.[0]
}

const getNFTCollectionPrice = async (address: string) => {
  const q = qs.stringify({
    from: getUnixTime(subDays(new Date(), 7)) * 1000,
    to: getUnixTime(new Date()) * 1000,
  })

  const data = await fetcher.get<{ error?: string; data?: INFTTicker }>(
    `${API_GW.INDEXER}/nft/ticker/${address}?${q}`,
  )
  return data?.data
}

const getAttributeIcons = async (traits: string[]) => {
  const q = qs.stringify({ trait_type: traits })
  const data = await fetcher.get<{ error?: string; data?: IAttributeIcon[] }>(
    `${API_GW.INDEXER}/nft/metadata/attributes-icon?${q}`,
  )
  return data?.data
}

async function getAssetMetadata(collectionAddress: string, tokenId: number) {
  const data = await fetcher.get<{ error?: string; data?: ITokenMetadata }>(
    `${API_GW.INDEXER}/nft/${collectionAddress}/${tokenId}/metadata`,
  )
  return data?.data
}

async function getUserNFTCollections(address: string) {
  const data = await fetcher.get<any>(`${API_GW.INDEXER}/${address}/collection`)

  return data?.data
}

async function getUserNFTs(
  address: string,
  colAddress: string,
  chainId: number,
) {
  const data = await fetcher.get<any>(
    `${API_GW.INDEXER}/${address}/nft?collection_addresses=${colAddress}&chain_id=${chainId}`,
  )

  return data.data
}

async function getTradeOffer(tradeId: string) {
  const data = await fetcher.get<any>(`${getGW()}/trades/${tradeId}`)

  return data.data
}

export const API = {
  verify,
  getNFTTokenDetails,
  getNFTCollectionDetails,
  getNFTCollectionPrice,
  getAttributeIcons,
  getAssetMetadata,
  getUserNFTCollections,
  getUserNFTs,
  getTradeOffer,
}
