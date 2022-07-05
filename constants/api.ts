import { INFTCollectionList, INFTTicker, INFTToken } from "~types/nft";
import { fetcher } from "~utils/fetcher";

const isProd = process.env.NEXT_PUBLIC_ENV === "production";

console.log(isProd);

const API_GW = {
  DEV: "https://develop-api.mochi.pod.town/api/v1",
  PROD: "https://api.mochi.pod.town/api/v1",
  INDEXER: "https://api.indexer.console.so/api/v1",
};

const getGW = () => (isProd ? API_GW.PROD : API_GW.DEV);

const verify = async (
  wallet_address: string,
  code: string,
  signature: string
) =>
  await fetcher.post<{ error?: string; status?: string }>(`${getGW()}/verify`, {
    wallet_address,
    code,
    signature,
  });

const getNFTTokenDetails = async (address: string, token_id: string | number) =>
  await fetcher.get<{ error?: string } & INFTToken>(
    `${API_GW.INDEXER}/nft/${address}/${token_id}`
  );

const getNFTCollectionDetails = async (address: string) => {
  const data = await fetcher.get<{ error?: string } & INFTCollectionList>(
    `${API_GW.INDEXER}/nft?address=${address}`
  );

  return data?.data?.[0];
};

const getNFTCollectionPrice = async (address: string) =>
  await fetcher.get<{ error?: string } & INFTTicker>(
    `${API_GW.INDEXER}/nft/ticker/${address}`
  );

export const API = {
  verify,
  getNFTTokenDetails,
  getNFTCollectionDetails,
  getNFTCollectionPrice,
};
