export interface INFTToken {
  token_id: string
  collection_address: string
  name: string
  description: string
  amount: string
  image: string
  image_cdn: string
  thumbnail_cdn: string
  image_content_type: string
  attributes?: IAttribute[]
  rarity: IRarity
  owner: IOwner
}

export interface IAttribute {
  trait_type: string
  value: string
  count: number
  rarity: string
  frequency: string
}

export interface IRarity {
  rank: number
  score: string
  total: number
  rarity?: string
}

export interface IOwner {
  owner_address: string
  collection_address: string
  token_id: string
  chain_id: number
  token: any
  created_time: string
  last_updated_time: string
}

export interface INFTCollectionList {
  page: number
  size: number
  sort: string
  total: number
  data: INFTCollection[]
}

export interface INFTCollection {
  id: number
  address: string
  name: string
  symbol: string
  chain_id: number
  erc_format: string
  supply: number
  is_rarity_calculated: boolean
  image: string
  marketplace_collections: any[]
  created_time: string
  last_updated_time: string
  chain: IChain
}

export interface IChain {
  chain_id: number
  id: number
  is_evm: boolean
  name: string
  scan_url: string
  symbol: string
}

export interface INFTTicker {
  tickers: ITickers
  floor_price: number
  name: string
  contract_address: string
  chain: string
  platforms: string[]
}

export interface ITickers {
  timestamps: number[]
  prices: number[]
}

export interface IAttributeIcon {
  id: number
  trait_type: string
  discord_icon: string
  unicode_icon: string
  created_at: string
  updated_at: string
}
export interface ITokenMetadata {
  latest_listing?: IPrice
  last_sale?: IPrice
  max_price?: IPrice
  min_price?: IPrice
  total_sales: number
  total_owners: number
  dob: string
  current_hold_time_in_secs: number
  longest_hold_time_in_secs: number
  creator: string
  collection_name: string
  owner: IOwner
}

export interface IPrice {
  amount?: string
  amount_in_usd?: number
  token?: IToken
}

export interface IToken {
  address?: string
  decimals?: number
  icon_url?: string
  is_native?: boolean
  symbol?: string
}
