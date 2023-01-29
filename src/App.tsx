import { useState } from "react";

import { Filters, Property, PropertyProps } from "./components";

import townhouses from "./data/townhouses.json";
import { Property } from "./components";

function App() {
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [filteredResults, setFilteredResults] =
    useState<PropertyProps[]>(townhouses);

  const handleUpdateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(e.target.value);
    if (e.target.value === "") {
      setFilteredResults(townhouses);
    } else {
      setFilteredResults(
        townhouses.filter((n) => n.address.includes(e.target.value))
      );
    }
  };

  return (
    <div className="container mx-auto my-8">
      <div className="border p-4 text-center bg-gray-500 rounded-lg mb-6">
        TO DO - Add in a search / filter here.
      </div>
      {townhouses.map((n) => (
      <Filters
        results={[...townhouses].slice(0, 8)}
        onUpdateSearch={handleUpdateSearch}
        searchFilter={searchFilter}
      />
      {[...filteredResults].slice(0, 8).map((n) => (
        <Property key={n.property_id} {...n} />
      ))}
    </div>
  );
}

export default App;
