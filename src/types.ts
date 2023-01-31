export type ScrapedPropertyType = {
  "web-scraper-order": string;
  "web-scraper-start-url": string;
  link: string;
  "link-href": string;
  address: string;
  bedrooms?: string;
  bathrooms?: string;
  carbays?: string;
  type?: string;
  title?: string;
  "image-src"?: string;
  subtitle?: string;
  description?: string;
  building_size?: string;
  property_id: string;
}

export interface ExtendedScrapedPropertyType extends ScrapedPropertyType {
  favouriteLevel: FavoriteLevelEnum;
}

export interface FavouriteProperty {
  id: string;
  level: FavoriteLevelEnum;
}

export enum FavoriteLevelEnum {
  "None" = 0,
  "Like",
  "Love"
}