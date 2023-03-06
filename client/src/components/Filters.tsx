import { FavoriteLevelEnum, ScrapedPropertyType } from "@shared/types";
import { SvgIcon } from "~/components";

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
    <section className="border flex flex-row flex-wrap content-center gap-4 p-4 text-center bg-gray-500 rounded-lg mb-6">
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
          style={{ minWidth: 368 }}
          value={props.searchFilter}
          placeholder="Search for an address"
          onChange={(e) => props.setSearchFilter(e.target.value)}
        />
      </div>
      <div className="flex flex-row gap-1">
        <button
          type="button"
          className="py-2 px-2.5 rounded-lg dark:text-red-200 dark:border-red-200
        hover:bg-red-900 dark:hover:bg-red-900 hover:bg-opacity-50 dark:hover:bg-opacity-50"
          onClick={() => props.setFavouriteLevel((prev) => (prev + 1) % 3)}
          title="Change the favourite level filter"
          aria-label="Change the favourite level filter"
        >
          <SvgIcon
            aria-hidden
            icon="ri-hearts-fill"
            width={24}
            height={24}
            fill={heartColor}
          />
        </button>

        <button
          type="button"
          className="py-2 px-2.5 rounded-lg dark:text-red-200 dark:border-red-200
        hover:bg-red-900 dark:hover:bg-red-900 hover:bg-opacity-50 dark:hover:bg-opacity-50"
          onClick={() => props.setShowHidden((prev) => !prev)}
          title={`${props.showHidden ? "Hide" : "Show"} hidden properties`}
          aria-label={`${props.showHidden ? "Hide" : "Show"} hidden properties`}
        >
          <SvgIcon
            aria-hidden
            icon={props.showHidden ? "ri-eye-off-fill" : "ri-eye-fill"}
            width={24}
            height={24}
          />
        </button>
      </div>
    </section>
  );
};
