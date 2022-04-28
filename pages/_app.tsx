import "@fontsource/dela-gothic-one";
import "@fontsource/dm-serif-display/400.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/900.css";
import { Web3ReactProvider } from "@web3-react/core";
import { providers } from "ethers";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import "nprogress/nprogress.css";
import { StrictMode } from "react";
import "~styles/global.css";
import "~styles/nprogress.css";

const TopProgressBar = dynamic(() => import("~app/layout/nprogress"), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <Web3ReactProvider
        getLibrary={() => new providers.Web3Provider((window as any).ethereum)}
      >
        <TopProgressBar />
        <Component {...pageProps} />
      </Web3ReactProvider>
    </StrictMode>
  );
}
