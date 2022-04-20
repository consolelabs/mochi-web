import { fetcher } from "./fetcher";

export interface GetContentResponse {
  name: string;
  download_url: string;
  type: string;
}

export const DataService = {
  getChangelogFiles: async () => {
    return (
      (await fetcher.get<GetContentResponse[]>(
        `https://api.github.com/repos/consolelabs/mochi-changelog/contents`
      )) || []
    );
  },
  getChangelogContent: async (url: string) => {
    const fetcher = await fetch(url, { method: "GET" });
    const content = await fetcher.text();
    return content;
  },
};
