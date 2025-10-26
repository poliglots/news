import type { Site } from "./store.ts";

export const NEWS_TEXT_FILE = "./dist/news.log";
export const NEWS_JSON_FILE = "./dist/news.json";

export default async function siteList() {
  let sites: Site[] = [
    {
      url: "https://edition.cnn.com",
      headLineLinkTag: "a",
      headLineTextTag: "span",
      followLinkTextTag: "p",
    },
    {
      url: "https://www.bbc.com",
      headLineLinkTag: "a",
      headLineTextTag: "h2",
      followLinkTextTag: "p",
    },
    {
      url: "https://www.aljazeera.com",
      headLineLinkTag: "a",
      headLineTextTag: "span",
      followLinkTextTag: "p",
    },
    {
      url: "https://www.washingtonpost.com",
      headLineLinkTag: "a",
      headLineTextTag: "span",
      followLinkTextTag: "p",
    },
    {
      url: "https://www.euronews.com",
      headLineLinkTag: "a",
      headLineTextTag: "h2",
      followLinkTextTag: "p",
    },
  ];

  return sites;
}
