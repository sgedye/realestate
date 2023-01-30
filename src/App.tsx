import { useEffect, useState } from "react";

import { Accordion, Filters, Property, PropertyDetails } from "./components";
import type { ScrapedPropertyType } from "./types";

import townhouses from "./data/townhouses.json";

function App() {
  const [showHidden, setShowHidden] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [hiddenProperties, setHiddenProperties] = useState<string[]>(() => {
    const jsonStorage = localStorage.getItem("hidden_properties");
    return jsonStorage ? JSON.parse(jsonStorage) : [];
  });
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
  }, [showHidden, searchFilter, hiddenProperties]);

  const handleShowHideProperty = (id: string) => {
    if (hiddenProperties.includes(id)) {
      setHiddenProperties((prev) => prev.filter((n) => n !== id));
    } else {
      setHiddenProperties((prev) => [...prev, id]);
    }
    localStorage.setItem("hidden_properties", JSON.stringify(hiddenProperties));
  };

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
            <Property
              key={n.property_id}
              {...n}
              searchFilter={searchFilter}
              showHidden={showHidden}
              onShowHideProperty={handleShowHideProperty}
            />
          ),
          hiddenContent: <PropertyDetails key={n.property_id} {...n} />,
        }))}
      />
    </div>
  );
}

export default App;
