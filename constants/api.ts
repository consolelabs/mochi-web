import { fetcher } from "~utils/fetcher";

const isProd = process.env.ENV === "production";

console.log(isProd);

const API_GW = {
  DEV: "https://develop-api.mochi.pod.town/api/v1",
  PROD: "https://api.mochi.pod.town/api/v1",
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

export const API = {
  verify,
};
