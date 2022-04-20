import Markdown from "react-markdown";
import { ChangelogContent } from "~pages/changelog";
import s from "./content.module.css";

const formatDate = (date: string) => {
  var options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Intl.DateTimeFormat(undefined, options).format(new Date(date));
};

export const ChangelogItem = ({ log }: { log: ChangelogContent }) => (
  <div className="mb-12 lg:flex gap-9">
    <div className="flex-shrink-0 max-w-[192px] mb-9 relative lg:pt-2">
      <div className="lg:sticky top-36">
        <div className="border-gradient">
          <div className="bg-white border-gradient-entry" />
          <div className="relative px-4 font-semibold leading-9 text-center lg:px-5 text-mochi-500">
            {formatDate(log.date)}
          </div>
        </div>
      </div>
    </div>
    <div className="flex-1 pb-6">
      <h3 className="mb-4 text-2xl font-bold lg:text-3xl">{log.title}</h3>
      <div className={s.content}>
        <Markdown>{log.content}</Markdown>
      </div>
    </div>
  </div>
);
