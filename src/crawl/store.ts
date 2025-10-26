export interface Site {
  url: string;
  headLineLinkTag: string;
  headLineTextTag: string;
  followLinkTextTag: string;
}

export interface News {
  link: string;
  headline: string;
  details: string;
}

export interface Logs {
  details: string;
  headline: string;
  level: string;
  link: string;
  message: string;
}
