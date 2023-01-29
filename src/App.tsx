import { useState } from "react";

import { Accordion, Filters, Property, PropertyProps } from "./components";

import townhouses from "./data/townhouses.json";

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
      <Filters
        results={[...townhouses].slice(0, 8)}
        onUpdateSearch={handleUpdateSearch}
        searchFilter={searchFilter}
      />
      {[...filteredResults].slice(0, 8).map((n) => (
        <Property key={n.property_id} {...n} />
      ))}

      <Accordion
        list={[...townhouses].slice(0, 8).map((n) => {
          return {
            question: n.address,
            answer: n.description || "test desc",
          };
        })}
      />
    </div>
  );
}

export default App;
