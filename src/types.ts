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

// export type ExtendedScrapedPropertyType = Omit<ScrapedPropertyType, "web-scraper-order" | "web-scraper-start-url"> & {
export interface ExtendedScrapedPropertyType extends ScrapedPropertyType {
  favouriteLevel: FavoriteLevelEnum;

  dateAdded?: string;
  askingPrice?: string;
  lastSoldDate?: string;
  lastSoldPrice?: string;
  strataFees?: string;
  groupOf?: string;
  land?: string;
  floorArea?: string;
  yearBuild?: string;
  initialThoughts?: string;
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