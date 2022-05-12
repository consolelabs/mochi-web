import { fetcher } from "~utils/fetcher";

const API_GW = "https://develop-api.mochi.pod.town/api/v1";

export const verifyWallet = async (
  wallet_address: string,
  code: string,
  signature: string
) =>
  await fetcher.post(`${API_GW}/verify`, {
    wallet_address,
    code,
    signature,
  });
