import { useEffect, useState } from "react";

import { Accordion, Filters, Property, PropertyDetails } from "./components";
import type { ScrapedPropertyType } from "./types";

import townhouses from "./data/townhouses.json";

function App() {
  const [showHidden, setShowHidden] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [hiddenProperties, setHiddenProperties] = useState<string[]>([
    "140267667",
    "141240832",
  ]);
  const [filteredResults, setFilteredResults] = useState<ScrapedPropertyType[]>(
    townhouses.filter(
      (n) => hiddenProperties.includes(n.property_id) === showHidden
    )
  );

  useEffect(() => {
    if (searchFilter === "") {
      setFilteredResults(
        townhouses.filter(
          (n) => hiddenProperties.includes(n.property_id) === showHidden
        )
      );
    } else {
      setFilteredResults(
        townhouses.filter(
          (n) =>
            hiddenProperties.includes(n.property_id) === showHidden &&
            n.address.toLowerCase().includes(searchFilter.toLowerCase())
        )
      );
    }
  }, [showHidden, searchFilter]);

  return (
    <div className="container mx-auto my-8">
      <Filters
        results={[...townhouses].slice(0, 8)}
        showHidden={showHidden}
        searchFilter={searchFilter}
        onUpdateSearch={(e) => setSearchFilter(e.target.value)}
        onToggleHidden={() => setShowHidden((prev) => !prev)}
      />
      <Accordion
        list={[...filteredResults].slice(0, 8).map((n) => ({
          visibleContent: (
            <Property key={n.property_id} {...n} searchFilter={searchFilter} />
          ),
          hiddenContent: <PropertyDetails key={n.property_id} {...n} />,
        }))}
      />
    </div>
  );
}

export default App;
