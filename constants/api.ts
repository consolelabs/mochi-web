import { fetcher } from "~utils/fetcher";

const API_GW = "https://develop-api.mochi.pod.town/api/v1";

const verify = async (
  wallet_address: string,
  code: string,
  signature: string
) =>
  await fetcher.post<{ error?: string; status?: string }>(`${API_GW}/verify`, {
    wallet_address,
    code,
    signature,
  });

export const API = {
  verify,
};
