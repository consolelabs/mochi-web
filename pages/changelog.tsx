import { GetStaticProps } from "next";
import { ChangelogPage } from "~app/changelog";
import { DataService } from "~utils/data";

export interface ChangelogContent {
  date: string;
  title: string;
  content: string;
}

export default function changelog({ logs }: { logs: ChangelogContent[] }) {
  return <ChangelogPage logs={logs} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const fetcher = await DataService.getChangelogFiles();
  const files = fetcher.map(async (file) => {
    const splitter = file.name.match(/^\[(\d{4}-\d{2}-\d{2})\]\s(.*)$/);
    if (!splitter) return null;
    const [_, date, title] = splitter;
    const content = await DataService.getChangelogContent(file.download_url);
    return {
      date,
      title: title.replace(/\.md/, ""),
      content,
    } as ChangelogContent;
  });
  const logs = (await Promise.all(files)).filter((f) => f !== null);

  return {
    props: {
      logs: logs.sort(
        (a, b) => new Date(b!.date).getTime() - new Date(a!.date).getTime()
      ),
    },
    revalidate: 60 * 60,
  };
};
