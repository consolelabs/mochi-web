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

const API_URLS = {
  DEV: 'https://develop-api.mochi.pod.town/api/v1',
  PROD: 'https://api.mochi.pod.town/api/v1',
  INDEXER: 'https://api.indexer.console.so/api/v1',
  MOCHI_PROFILE: 'https://api.mochi-profile.console.so/api/v1',
  // INDEXER: 'http://localhost:8080/api/v1',
}

const getProfileByDiscord = async (id: string) =>
  await fetcher.get<any>(
    `${API_URLS.MOCHI_PROFILE}/profiles/get-by-discord/${id}`,
  )

const linkAccount = async (
  profile_id: string,
  wallet_address: string,
  code: string,
  signature: string,
  chain: 'evm' | 'solana',
) =>
  await fetcher.post(
    `${API_URLS.MOCHI_PROFILE}/profiles/${profile_id}/accounts/${chain}`,
    {
      wallet_address,
      code,
      signature,
    },
  )

const getNFTTokenDetails = async (
  address: string,
  token_id: string | number,
) => {
  const data = await fetcher.get<{ error?: string; data?: INFTToken }>(
    `${API_URLS.INDEXER}/nft/${address}/${token_id}`,
  )

  return data?.data
}

const getNFTCollectionDetails = async (address: string) => {
  const data = await fetcher.get<{ error?: string } & INFTCollectionList>(
    `${API_URLS.INDEXER}/nft?address=${address}`,
  )

  return data?.data?.[0]
}

const getNFTCollectionPrice = async (address: string) => {
  const q = qs.stringify({
    from: getUnixTime(subDays(new Date(), 7)) * 1000,
    to: getUnixTime(new Date()) * 1000,
  })

  const data = await fetcher.get<{ error?: string; data?: INFTTicker }>(
    `${API_URLS.INDEXER}/nft/ticker/${address}?${q}`,
  )
  return data?.data
}

const getAttributeIcons = async (traits: string[]) => {
  const q = qs.stringify({ trait_type: traits })
  const data = await fetcher.get<{ error?: string; data?: IAttributeIcon[] }>(
    `${API_URLS.INDEXER}/nft/metadata/attributes-icon?${q}`,
  )
  return data?.data
}

async function getAssetMetadata(collectionAddress: string, tokenId: number) {
  const data = await fetcher.get<{ error?: string; data?: ITokenMetadata }>(
    `${API_URLS.INDEXER}/nft/${collectionAddress}/${tokenId}/metadata`,
  )
  return data?.data
}

export const API = {
  linkAccount,
  getProfileByDiscord,
  getNFTTokenDetails,
  getNFTCollectionDetails,
  getNFTCollectionPrice,
  getAttributeIcons,
  getAssetMetadata,
}
