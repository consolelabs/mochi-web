import { Layout } from "~app/layout";
import { SEO } from "~app/layout/seo";
import { PAGES } from "~constants";
import { ChangelogList, ChangelogProps } from "./list";

export const ChangelogPage = (props: ChangelogProps) => (
  <Layout>
    <SEO title={PAGES.CHANGE_LOG.title} tailTitle />
    <ChangelogList {...props} />
  </Layout>
);
