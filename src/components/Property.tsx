import { SvgIcon } from "./SvgIcons";
import {
  FavoriteLevelEnum,
  FavouriteProperty,
  ScrapedPropertyType,
} from "../types";
import { useContext } from "react";
import { Context } from "../App";

interface PropertyProps extends ScrapedPropertyType {
  searchFilter: string;
  showHidden: boolean;
  favouriteLevel: FavoriteLevelEnum;
  onShowHideProperty: (id: string) => void;
  onFavouriteProperty: (id: string) => void;
}

export const Property = (props: PropertyProps) => {
  const { setSelectedId, showEditModal } = useContext(Context);

  const propertyBaseUrl = "https://www.realestate.com.au/property/";
  const propertyPrefix = /^\d+\/\d+/.test(props.address) ? "unit-" : "";
  const propertyAddressUrl = props.address
    .toLowerCase()
    .replaceAll(/[, \/]+/g, "-")
    .replace("road", "rd")
    .replace("street", "st")
    .replace("parade", "pde")
    .replace("place", "pl")
    .replace("avenue", "ave")
    .replace("terrace", "tce");

  const regexp = new RegExp(props.searchFilter, "i");
  const searchedAddress = props.address.replace(
    regexp,
    (match) => `<mark>${match}</mark>`
  );

  const heartColor =
    props.favouriteLevel === FavoriteLevelEnum.Love
      ? "#ff4d4d"
      : props.favouriteLevel === FavoriteLevelEnum.Like
      ? "pink"
      : "black";

  return (
    <>
      <section className="flex flex-col lg:flex-row bg-gray-400 gap-2">
        <img
          src={props["image-src"]}
          alt={props.address}
          className=""
          width={400}
          height={200}
        />
        <div className="flex flex-col grow gap-2 text-left p-4">
          <small>Property ID: {props.property_id}</small>
          <h1 className="text-xl">
            {props.type} - {props.title}
          </h1>
          <h2>{props.subtitle}</h2>
          <h3
            dangerouslySetInnerHTML={{
              __html: `<span>${searchedAddress}</span>`,
            }}
          ></h3>
          <div className="flex flex-row gap-2">
            <div aria-label={`${props.bedrooms} bedrooms`}>
              <span className="text-xl">{props.bedrooms || "?"}</span>
              <SvgIcon
                aria-hidden
                icon="pi-bed"
                width={20}
                height={20}
                className="text-white inline-block ml-1"
                fill="#fff"
              />
            </div>
            <div aria-label={`${props.bathrooms} bathrooms`}>
              <span className="text-xl">{props.bathrooms || "?"}</span>
              <SvgIcon
                aria-hidden
                icon="pi-bath"
                width={20}
                height={20}
                className="text-white inline-block ml-1"
                fill="#fff"
              />
            </div>
            <div aria-label={`${props.carbays} carbays`}>
              <span className="text-xl">{props.carbays || "?"}</span>
              <SvgIcon
                aria-hidden
                icon="pi-car"
                width={20}
                height={20}
                className="text-white inline-block ml-1"
                fill="#fff"
              />
            </div>
            <div aria-label={`${props.carbays} carbays`}>
              <span className="text-xl">{props.carbays || "?"}</span>
              <SvgIcon
                aria-hidden
                icon="pi-property"
                width={20}
                height={20}
                className="text-white inline-block ml-1"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-auto">
            <div>
              <a
                href={props["link-href"]}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-center px-4 py-2 space-x-3 text-sm border rounded-lg dark:text-gray-200 dark:border-gray-200
            hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                View property
              </a>
            </div>
            <div>
              <a
                href={propertyBaseUrl + propertyPrefix + propertyAddressUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-center px-4 py-2 space-x-3 text-sm border rounded-lg dark:text-gray-200 dark:border-gray-200
 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Link to past sales
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 p-4">
          <button
            type="button"
            className="p-2 self-start rounded-lg
          hover:bg-red-100 dark:hover:bg-red-700 hover:bg-opacity-50 dark:hover:bg-opacity-50"
            title="Edit property"
            aria-label="Edit property details"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setSelectedId(props.property_id);
              showEditModal();
            }}
          >
            <SvgIcon aria-hidden icon="ri-pencil-fill" width={24} height={24} />
          </button>
          <button
            type="button"
            className="p-2 self-start rounded-lg
          hover:bg-red-100 dark:hover:bg-red-700 hover:bg-opacity-50 dark:hover:bg-opacity-50"
            title="Favourite property"
            aria-label="Change favourite level of property"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              props.onFavouriteProperty(props.property_id);
            }}
          >
            <SvgIcon
              aria-hidden
              icon="ri-heart-fill"
              width={24}
              height={24}
              fill={heartColor}
            />
          </button>
          <button
            type="button"
            className="p-2 border self-start rounded-lg dark:text-red-200 dark:border-red-200
          hover:bg-red-100 dark:hover:bg-red-700"
            title={`${props.showHidden ? "Restore" : "Hide"} property`}
            aria-label={`${props.showHidden ? "Restore" : "Hide"} property`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              props.onShowHideProperty(props.property_id);
            }}
          >
            <SvgIcon
              aria-hidden
              icon={props.showHidden ? "ri-eye-off-fill" : "ri-close-fill"}
              width={24}
              height={24}
            />
          </button>
        </div>
      </section>
    </>
  );
};
