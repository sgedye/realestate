import type { ScrapedPropertyType } from "../types";

interface FiltersProps {
  results: ScrapedPropertyType[];
  searchFilter: string;
  showHidden: boolean;
  onUpdateSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleHidden: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Filters = (props: FiltersProps) => {
  return (
    <section className="border p-4 text-center bg-gray-500 rounded-lg mb-6">
      TO DO - Add in more filters here.
      <input
        type="text"
        id="search-filter"
        name="search-filter"
        value={props.searchFilter}
        onChange={props.onUpdateSearch}
      />
      <input type="checkbox" id="toggleHidden" name="toggleHidden" checked={props.showHidden} onChange={props.onToggleHidden} />
    </section>
  );
}
