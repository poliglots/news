export interface Site {
  url: string;
  headLineLinkTag: string;
  headLineTextTag: string;
  followLinkTextTag: string;
  headers: {};
  updatedAtTag: string;
  updateAtAttribute: string;
}

export interface News {
  link: string;
  headline: string;
  details: string;
  updatedAt: string;
}

export interface NewsLog extends News {
  level: string;
  message: string;
}
