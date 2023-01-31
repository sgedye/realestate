import { FavoriteLevelEnum, ScrapedPropertyType } from "../types";
import { SvgIcon } from "./SvgIcons";

interface FiltersProps {
  results: ScrapedPropertyType[];
  searchFilter: string;
  showHidden: boolean;
  favouriteLevel: FavoriteLevelEnum;
  setSearchFilter: React.Dispatch<React.SetStateAction<string>>;
  setShowHidden: React.Dispatch<React.SetStateAction<boolean>>;
  setFavouriteLevel: React.Dispatch<React.SetStateAction<FavoriteLevelEnum>>;
}

export const Filters = (props: FiltersProps) => {
  const heartColor =
    props.favouriteLevel === FavoriteLevelEnum.Love
      ? "#ff4d4d"
      : props.favouriteLevel === FavoriteLevelEnum.Like
      ? "pink"
      : "black";
  return (
    <form className="border p-4 text-center bg-gray-500 rounded-lg mb-6">
      <fieldset className="flex flex-row flex-wrap content-center gap-3">
        <div>
          <label htmlFor="search_filter" className="sr-only">
            Search for an address
          </label>
          <input
            type="text"
            id="search_filter"
            name="search_filter"
            className={`
              bg-gray-50 border border-gray-300 rounded-lg p-2
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
              focus:ring-red-500 focus:border-red-500
              dark:focus:ring-red-500 dark:focus:border-red-500
            `}
            value={props.searchFilter}
            placeholder="Search for an address"
            onChange={(e) => props.setSearchFilter(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="px-4 py-2 space-x-3 text-sm rounded-lg dark:text-red-200 dark:border-red-200
          hover:bg-red-900 dark:hover:bg-red-900 hover:bg-opacity-50 dark:hover:bg-opacity-50"
          onClick={() => props.setFavouriteLevel((prev) => (prev + 1) % 3)}
        >
          <SvgIcon
            aria-hidden
            icon="ri-hearts-fill"
            width={24}
            height={24}
            fill={heartColor}
          />
        </button>

        <div
          className="flex content-center justify-self-end"
          title={`${props.showHidden ? "Hide" : "Show"} hidden properties`}
        >
          <input
            type="checkbox"
            id="toggleHidden"
            name="toggleHidden"
            className="sr-only"
            aria-label={`${
              props.showHidden ? "Hide" : "Show"
            } hidden properties`}
            checked={!!props.showHidden}
            onChange={() => props.setShowHidden((prev) => !prev)}
          />
          <label htmlFor="toggleHidden" className="self-center">
            <SvgIcon
              aria-hidden
              icon={props.showHidden ? "ri-eye-off-fill" : "ri-eye-fill"}
              width={24}
              height={24}
            />
          </label>
        </div>
      </fieldset>
    </form>
  );
};
