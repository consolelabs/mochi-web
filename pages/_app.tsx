import "@fontsource/dela-gothic-one";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/900.css";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";
import type { AppProps } from "next/app";
import { StrictMode } from "react";
import "~styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <Component {...pageProps} />
    </StrictMode>
  );
}
