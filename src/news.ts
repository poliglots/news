import axios from "axios";
import { parse } from "node-html-parser";
import { writeFile, appendFile } from "fs";

export interface myNews {
  message: string;
  url: string;
}

export let config: axios.AxiosRequestConfig = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0",
  },
};

export async function scrapeAndWriteNews(
  host_url: string,
  config: axios.AxiosRequestConfig,
  md_file_name: string,
  news_link_css: string,
  news_text_css?: string
) {
  console.log("Into Function");

  const resp = await axios.get(host_url, config);
  const root = parse(resp.data);
  const news_elements = root.querySelectorAll(news_link_css);

  writeFile("docs/" + md_file_name + ".md", "", (err) => {
    if (err) console.log(err);
  });

  for (let i = 0; i < news_elements.length; i++) {
    let news_link = news_elements[i].getAttribute("href");
    let headline: string;

    if (news_text_css) {
      headline = news_elements[i].querySelector(news_text_css)?.textContent;
    } else {
      headline = news_elements[i].text;
    }

    if (headline != undefined && headline.length > 50) {
      let message = "[" + headline + "]";
      let news_url: string;

      if (!news_link.startsWith("/")) {
        news_url = "(" + news_link + ")";
      } else {
        news_url = "(" + host_url + news_link + ")";
      }

      const data = new Uint8Array(
        Buffer.from("### " + message + news_url + "\n")
      );

      appendFile("docs/" + md_file_name + ".md", data, (err) => {
        if (err) console.log(err);
      });
    }
  }
  console.log(news_elements.length);
}
