import { InjectedConnector } from "@web3-react/injected-connector";
import { useCallback, useEffect, useState } from "react";
import { Layout } from "~app/layout";
import { SEO } from "~app/layout/seo";
import { PAGES } from "~constants";
import { verifyWallet } from "~constants/api";
import { useWeb3React } from "~hooks/useWeb3React";
import { VerifyAction } from "./action";

interface Props {
  code: string;
}

export const randomInjected = new InjectedConnector({});

export const VerifyPage = ({ code }: Props) => {
  const [loading, setLoading] = useState(false);
  const [verified, setVerify] = useState(false);
  const [error, setError] = useState("");

  const { activate, active, account, library } = useWeb3React();

  const sign = useCallback(async () => {
    if (!activate || !account || !library || !code) return;
    try {
      setLoading(true);
      const signer = library.getSigner();
      const signature = await signer.signMessage(
        `This will help us connect your discord account to the wallet address.\n\nMochiBotCode=${code}`
      );
      const response = await verifyWallet(account, code, signature);
      console.log(response);
    } catch (e) {
      console.error("sign method error", e);
    } finally {
      setLoading(false);
    }
  }, [account, activate, code, library]);

  const handleVerify = useCallback(async () => {
    try {
      if (active) await sign();
      else await activate(randomInjected);
    } catch (e) {
      console.error("handleVerify method error", e);
    }
  }, [activate, active, sign]);

  useEffect(() => {
    if (!verified && active && !loading) sign();
  }, [active, verified]);

  return (
    <Layout>
      <SEO title={PAGES.VERIFY.title} tailTitle />
      <div className="relative flex flex-col items-center">
        <div className="max-w-5xl px-12 py-16 mx-auto">
          {code && !error ? (
            verified ? (
              <div className="z-20 max-w-3xl mt-32 text-2xl text-center lg:mt-56 xl:mt-72">
                Your wallet already verified! You can close this window ✨
              </div>
            ) : (
              <VerifyAction handleVerify={handleVerify} loading={loading} />
            )
          ) : (
            <div className="z-20 max-w-3xl mt-32 text-2xl text-center lg:mt-56 xl:mt-72">
              Something went wrong with error &ldquo;{error}&rdquo;
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
