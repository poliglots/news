import fs from "node:fs";
import readline from "node:readline";
import { NEWS_JSON_FILE, NEWS_TEXT_FILE } from "./config";

async function winstonLogFile2Json(filePath: string, jsonFilePath: string) {
  const logs = [];
  try {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      const logEntry = JSON.parse(line);
      logs.push(logEntry);
    }

    // console.log(logs);
    fs.writeFileSync(jsonFilePath, JSON.stringify(logs));
  } catch (error) {
    console.error("Error in parsing/writing logs:", error);
  }
}

await winstonLogFile2Json(NEWS_TEXT_FILE, NEWS_JSON_FILE);
