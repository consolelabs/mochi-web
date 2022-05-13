import { useWeb3React as useWeb3ReactOg } from "@web3-react/core";
import { providers } from "ethers";

export function useWeb3React() {
  return useWeb3ReactOg<providers.Web3Provider>();
}
