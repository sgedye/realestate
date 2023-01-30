import { useState } from "react";

import { Accordion, Filters, Property, PropertyDetails } from "./components";
import type { ScrapedPropertyType } from "./types";

import townhouses from "./data/townhouses.json";

function App() {
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [filteredResults, setFilteredResults] =
    useState<ScrapedPropertyType[]>(townhouses);

  const handleUpdateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchInput = e.target.value;
    setSearchFilter(searchInput);
    if (searchInput === "") {
      setFilteredResults(townhouses);
    } else {
      setFilteredResults(
        townhouses.filter((n) => n.address.toLowerCase().includes(searchInput.toLowerCase()))
      );
    }
  };

  return (
    <div className="container mx-auto my-8">
      <Filters
        results={[...townhouses].slice(0, 8)}
        onUpdateSearch={handleUpdateSearch}
        searchFilter={searchFilter}
      />
      <Accordion
        list={[...filteredResults].slice(0, 8).map((n) => ({
          visibleContent: <Property key={n.property_id} {...n} searchFilter={searchFilter} />,
          hiddenContent: <PropertyDetails key={n.property_id} {...n} />,
        }))}
      />
    </div>
  );
}

export default App;
