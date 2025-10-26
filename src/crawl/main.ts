import { load } from "cheerio";
import type { Site, News } from "./store.ts";
import siteList from "./config.ts";
import { logger } from "./logger.ts";

const DEBUG_MODE = process.env.DEBUG_MODE || false;

const BlackListWords = [
  "AnalysisAnalysis",
  "Live Updates",
  "GalleryGallery",
  "VideoVideo",
];

async function filterNews(news: News) {
  // if headline contains garbage
  for (let word in BlackListWords) {
    if (news.headline.includes(word)) {
      return;
    }
  }
  // if details are short ignore
  if (news.details.length < 300) {
    return;
  }

  logger.info("", news);
}

async function getFullNews(url: string, textTag: string) {
  let full_story = "";
  try {
    let res = await fetch(url);
    let page = await res.text();

    let $ = load(page);
    let paragraphs = $(textTag);

    for (const paragraph of paragraphs) {
      let para = $(paragraph).text().trim();
      full_story = full_story.concat(para);
    }
  } catch (error) {
    console.error(`Error in reading ${url} - `, error);
  } finally {
    return full_story;
  }
}

async function readNews(site: Site) {
  try {
    let counter = 0;
    let res = await fetch(site.url);
    let page = await res.text();

    let $ = load(page);
    let headlines = $(site.headLineLinkTag);
    for (const headlineElement of headlines) {
      if (counter >= 1 && DEBUG_MODE === "true") {
        break;
      }
      let headline = $(headlineElement)
        .find(site.headLineTextTag)
        .text()
        .trim();
      let link = $(headlineElement).attr("href");

      if (headline.length > 50) {
        let navLink = "";
        if (
          link?.includes(site.url) ||
          link?.includes("https") ||
          link?.includes("http")
        ) {
          navLink = link;
        } else {
          navLink = `${site.url}${link}`;
        }
        let detailedNews = await getFullNews(navLink, site.followLinkTextTag);
        let news: News = {
          link: `${navLink}`,
          headline: `${headline}`,
          details: `${detailedNews}`,
        };
        await filterNews(news);
        counter++;
      }
    }
  } catch (error) {
    console.error(`Error in reading ${site.url} - `, error);
  }
}

async function main() {
  let sites = await siteList();
  for (let site of sites) {
    readNews(site);
  }
}

await main();
