import { useEffect, useState } from 'react'
import { PropertyProps } from './Property';

interface FiltersProps {
  results: PropertyProps[];
  searchFilter: string;
  onUpdateSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Filters = (props: FiltersProps) => {

  return (
    <section className="border p-4 text-center bg-gray-500 rounded-lg mb-6">
      TO DO - Add in a search / filter here.
      <input
        type="text"
        id="suburb-filter"
        name="suburb-filter"
        value={props.searchFilter}
        onChange={props.onUpdateSearch}
      />
    </section>
  );
}
