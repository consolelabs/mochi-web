export interface INFTToken {
  token_id: string;
  collection_address: string;
  name: string;
  description: string;
  amount: string;
  image: string;
  image_cdn: string;
  thumbnail_cdn: string;
  image_content_type: string;
  attributes?: IAttribute[];
  rarity: IRarity;
}

export interface IAttribute {
  trait_type: string;
  value: string;
  count: number;
  rarity: string;
  frequency: number;
}

export interface IRarity {
  rank: number;
  score: string;
  total: number;
  rarity?: string;
}

export interface INFTCollectionList {
  page: number;
  size: number;
  sort: string;
  total: number;
  data: INFTCollection[];
}

export interface INFTCollection {
  id: number;
  address: string;
  name: string;
  symbol: string;
  chain_id: number;
  erc_format: string;
  supply: number;
  is_rarity_calculated: boolean;
  image: string;
  marketplace_collections: any[];
  created_time: string;
  last_updated_time: string;
}

export interface INFTTicker {
  tickers: ITickers;
  floor_price: number;
  name: string;
  contract_address: string;
  chain: string;
  platforms: string[];
}

export interface ITickers {
  timestamps: number[];
  prices: number[];
}
