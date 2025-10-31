export interface Site {
  url: string;
  headLineLinkTag: string;
  headLineTextTag: string;
  followLinkTextTag: string;
  headers: {};
}

export interface News {
  link: string;
  headline: string;
  details: string;
}

export interface NewsLog extends News {
  level: string;
  message: string;
}
