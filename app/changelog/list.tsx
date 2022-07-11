import { ChangelogContent } from "~pages/changelog";
import { ChangelogItem } from "./item";

export interface ChangelogProps {
  logs: ChangelogContent[];
}

export const ChangelogList = ({ logs }: ChangelogProps) => (
  <div className="max-w-7xl px-12 py-16 mx-auto">
    <h2 className="mb-12 font-serif text-3xl text-center md:text-4xl lg:text-5xl">
      Changelog
    </h2>
    {logs.map((log, index) => (
      <ChangelogItem log={log} key={index} />
    ))}
  </div>
);
