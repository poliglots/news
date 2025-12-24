import { load } from "cheerio";
import { type Site, type News } from "./store.ts";
import siteList, { TIME_JSON_FILE } from "./config.ts";
import { logger } from "./logger.ts";
import { writeFileSync } from "node:fs";

const DEBUG_MODE = Boolean(process.env.DEBUG_MODE) || false;

async function getNewsParagraphs(url: string, site: Site) {
  let full_story = "";
  let updatedAt = "";
  const today = new Date(); // Get the current date and time
  let twoDaysAgo = new Date(today); // Create a new Date object based on today
  twoDaysAgo.setDate(today.getDate() - 2); // Subtract 2 days from the current day of the month
  try {
    let res = await fetch(url, {
      headers: site.headers,
    });
    let page = await res.text();

    let $ = load(page);
    if (site.updateAtAttribute === "text") {
      updatedAt = $(site.updatedAtTag).text();
    } else {
      updatedAt =
        $(site.updatedAtTag).attr(site.updateAtAttribute) ??
        twoDaysAgo.toDateString();
    }

    let paragraphs = $(site.followLinkTextTag);

    for (const paragraph of paragraphs) {
      let para = $(paragraph).text().trim();
      full_story = full_story.concat(`<p>${para}</p>`);
    }
  } catch (error) {
    console.error(`Error in reading ${url} - `, error);
  } finally {
    return { full_story, updatedAt };
  }
}

async function readNews(site: Site) {
  try {
    let counter = 0;
    let res = await fetch(site.url, {
      headers: site.headers,
    });
    let page = await res.text();

    let $ = load(page);
    let headlines = $(site.headLineLinkTag);
    for (const headlineElement of headlines) {
      if (counter >= 1 && DEBUG_MODE === true) {
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
        let { full_story, updatedAt } = await getNewsParagraphs(navLink, site);
        let news: News = {
          link: `${navLink}`,
          headline: `${headline}`,
          details: `${full_story}`,
          updatedAt: new Date(updatedAt).toISOString(),
        };
        logger.info("", news);
        counter++;
      }
    }
  } catch (error) {
    console.error(`Error in reading ${site.url} - `, error);
  }
}

async function writeTime() {
  try {
    writeFileSync(TIME_JSON_FILE, `{"time":"${new Date()}"}`);
  } catch (error) {
    console.log("error in writing time");
  }
}

async function main() {
  let sites = await siteList();
  for (let site of sites) {
    readNews(site);
  }
  await writeTime();
}

await main();
