import { GetServerSideProps } from "next";
import { VerifyPage } from "~app/verify";

export default function verify({ code }: { code: string }) {
  return <VerifyPage code={code} />;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const code = ctx.query.code;
  if (!code) return { notFound: true };

  return {
    props: { code },
  };
};
