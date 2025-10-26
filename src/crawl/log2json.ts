import fs from "node:fs";
import readline from "node:readline";
import type { Logs } from "./store";
import { NEWS_JSON_FILE, NEWS_TEXT_FILE } from "./config";

async function winstonLogFile2Json(filePath: string, jsonFilePath: string) {
  const logArray: Logs[] = [];
  try {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      const logEntry = JSON.parse(line);
      logArray.push(logEntry);
    }
    const uniqueLogs = logArray.filter(
      (obj, index, self) =>
        index === self.findIndex((item) => item.headline === obj.headline)
    );
    // console.log(uniqueLogs);
    fs.writeFileSync(jsonFilePath, JSON.stringify(uniqueLogs));
  } catch (error) {
    console.error("Error in parsing/writing logs:", error);
  }
}

await winstonLogFile2Json(NEWS_TEXT_FILE, NEWS_JSON_FILE);
