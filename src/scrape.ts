import { scrapeAndWriteNews, config } from "./news";

const cnn = "https://edition.cnn.com";
const wp = "https://www.washingtonpost.com";
const bl = "https://www.bloomberg.com";

scrapeAndWriteNews(cnn, config, "CNN", "a", "span");
scrapeAndWriteNews(wp, config, "Washington", "a");
scrapeAndWriteNews(bl, config, "Bloomberg", "a", "span");
