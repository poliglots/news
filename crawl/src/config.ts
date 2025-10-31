import type { Site } from "./store.ts";

export const NEWS_TEXT_FILE = "../dist/news.log";
export const NEWS_JSON_FILE = "../dist/news.json";
export const TIME_JSON_FILE = "../dist/time.json";

export default async function siteList() {
  let sites: Site[] = [
    {
      url: "https://edition.cnn.com",
      headLineLinkTag: "a",
      headLineTextTag: "span.container__headline-text",
      followLinkTextTag: "p",
      headers: {},
    },
    {
      url: "https://www.bbc.com",
      headLineLinkTag: "a",
      headLineTextTag: "h2",
      followLinkTextTag: "p",
      headers: {},
    },
    {
      url: "https://www.aljazeera.com",
      headLineLinkTag: "a",
      headLineTextTag: "span",
      followLinkTextTag: "p",
      headers: {},
    },
    {
      url: "https://www.washingtonpost.com",
      headLineLinkTag: "a",
      headLineTextTag: "span",
      followLinkTextTag: "p",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:144.0) Gecko/20100101 Firefox/144.0",
        Host: "www.washingtonpost.com",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    },
    {
      url: "https://www.euronews.com",
      headLineLinkTag: "a",
      headLineTextTag: "h2",
      followLinkTextTag: "p",
      headers: {},
    },
    {
      url: "https://www.reuters.com",
      headLineLinkTag: "a",
      headLineTextTag: "span",
      followLinkTextTag: "div.text-module__text__0GDob",
      headers: {},
    },
    {
      url: "https://www.nytimes.com",
      headLineLinkTag: "a",
      headLineTextTag: "p",
      followLinkTextTag: "p",
      headers: {},
    },
  ];

  return sites;
}
