import fs from "node:fs";
import readline from "node:readline";
import { type NewsLog } from "./store.ts";
import { NEWS_JSON_FILE, NEWS_TEXT_FILE } from "./config.ts";
import { BlackListHeadLine, BlackListPara } from "./filterList.ts";
import { load } from "cheerio";

async function isHeadlineGarbage(news: NewsLog) {
  // if headline contains garbage
  for (let word in BlackListHeadLine) {
    if (news.headline.includes(word)) {
      return true;
    }
  }
  return false;
}

async function isParaGarbage(para: string) {
  // if headline contains garbage
  for (let word in BlackListPara) {
    if (para.includes(word)) {
      return true;
    }
  }
  // if details are short ignore
  if (para.length < 100) {
    return true;
  }
  return false;
}

async function transformPara(news_para: string) {
  let final_para = "";
  const $ = load(news_para);
  let paragraphs = $("p");

  for (const paragraph of paragraphs) {
    let para = $(paragraph).text().trim();
    if (!(await isParaGarbage(para))) {
      final_para = final_para.concat(para);
    }
  }
  return final_para;
}

async function winstonLogFile2Json(filePath: string, jsonFilePath: string) {
  const logArray: NewsLog[] = [];
  try {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      let newsLog: NewsLog = JSON.parse(line);
      newsLog.level = newsLog.link.split(".")[1] ?? "Unknown";
      newsLog.details = await transformPara(newsLog.details);
      newsLog.message = newsLog.details
        .split(".")
        .slice(0, 4)
        .join(". ")
        .concat(".");
      if (!(await isHeadlineGarbage(newsLog)) && newsLog.details.length > 300) {
        logArray.push(newsLog);
      }
    }
    const uniqueLogs = logArray.filter(
      (obj, index, self) =>
        index === self.findIndex((item) => item.headline === obj.headline)
    );
    // console.log(uniqueLogs);
    fs.writeFileSync(jsonFilePath, JSON.stringify(uniqueLogs, null, 2));
  } catch (error) {
    console.error("Error in parsing/writing logs:", error);
  }
}

await winstonLogFile2Json(NEWS_TEXT_FILE, NEWS_JSON_FILE);
