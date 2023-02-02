import { useEffect, useState, createContext } from "react";

import {
  Accordion,
  Filters,
  Property,
  PropertyDetails,
  Todos,
} from "./components";

import { FavoriteLevelEnum } from "./types";
import type {
  ExtendedScrapedPropertyType,
  FavouriteProperty,
  ScrapedPropertyType,
} from "./types";

import townhouses from "./data/townhouses.json";
import { EditPropertyModal } from "./components/EditPropertyModal";
import { useModal } from "./hooks/useModal";

export const Context = createContext({
  selectedId: "",
  setSelectedId: (() => {}) as React.Dispatch<React.SetStateAction<string>>,
  showEditModal: () => {},
});

function App() {
  const [selectedId, setSelectedId] = useState("");
  const editPropertyModal = useModal();
  const contextState = {
    selectedId,
    setSelectedId,
    showEditModal: editPropertyModal.onShow,
  };

  useEffect(() => {
    if (editPropertyModal.show) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [editPropertyModal.show]);

  const [showHidden, setShowHidden] = useState<boolean>(false);
  const [favouriteLevel, setFavouriteLevel] = useState<FavoriteLevelEnum>(
    FavoriteLevelEnum.None
  );
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [hiddenProperties, setHiddenProperties] = useState<string[]>(() => {
    const jsonStorage = localStorage.getItem("hidden_properties");
    return jsonStorage ? JSON.parse(jsonStorage) : [];
  });

  const [favouritedProperties, setFavouritedProperties] = useState<
    FavouriteProperty[]
  >(() => {
    const jsonStorage = localStorage.getItem("favourited_properties");
    return jsonStorage ? JSON.parse(jsonStorage) : [];
  });
  const [filteredResults, setFilteredResults] = useState<ScrapedPropertyType[]>(
    townhouses.filter(
      (n) => hiddenProperties.includes(n.property_id) === showHidden
    )
  );

  // Split this useEffect up to get a mergedPropertyList, then work with that.
  useEffect(() => {
    const favouritedList = Object.values(favouritedProperties);
    const extendedPropertyList: ExtendedScrapedPropertyType[] = [
      ...townhouses,
    ].map((n) => {
      return {
        ...n,
        favouriteLevel:
          favouritedList.find((x) => x.id === n.property_id)?.level ||
          FavoriteLevelEnum.None,
      };
    });

    let myFilteredList: ExtendedScrapedPropertyType[] = [];
    switch (favouriteLevel) {
      case FavoriteLevelEnum.Love: {
        myFilteredList = [...extendedPropertyList].filter(
          (n) => n.favouriteLevel >= FavoriteLevelEnum.Love
        );
        break;
      }
      case FavoriteLevelEnum.Like: {
        myFilteredList = [...extendedPropertyList].filter(
          (n) => n.favouriteLevel >= FavoriteLevelEnum.Like
        );
        break;
      }
      default: {
        myFilteredList = [...extendedPropertyList];
        break;
      }
    }

    if (searchFilter === "") {
      setFilteredResults(
        myFilteredList.filter(
          (n) => hiddenProperties.includes(n.property_id) === showHidden
        )
      );
    } else {
      setFilteredResults(
        myFilteredList.filter(
          (n) =>
            hiddenProperties.includes(n.property_id) === showHidden &&
            n.address.toLowerCase().includes(searchFilter.toLowerCase())
        )
      );
    }
  }, [
    showHidden,
    searchFilter,
    hiddenProperties,
    favouriteLevel,
    favouritedProperties,
  ]);

  const handleShowHideProperty = (id: string) => {
    if (hiddenProperties.includes(id)) {
      setHiddenProperties((prev) => prev.filter((n) => n !== id));
    } else {
      setHiddenProperties((prev) => [...prev, id]);
    }
    localStorage.setItem("hidden_properties", JSON.stringify(hiddenProperties));
  };

  const handleFavouriteProperty = (id: string) => {
    const prevProperty = favouritedProperties.find((n) => n.id === id) || null;
    if (prevProperty) {
      const level = ((prevProperty.level + 1) % 3) as FavoriteLevelEnum;
      const updatedList: FavouriteProperty[] = [...favouritedProperties].map(
        (n) => {
          return n.id === id ? { id, level } : n;
        }
      );
      setFavouritedProperties(updatedList);
    } else {
      setFavouritedProperties((prev) => [
        ...prev,
        {
          id,
          level: FavoriteLevelEnum.Like,
        },
      ]);
    }
    localStorage.setItem(
      "favourited_properties",
      JSON.stringify(favouritedProperties)
    );
  };

  return (
    <Context.Provider value={contextState}>
      <div className="container mx-auto my-8">
        <Todos />
        <Filters
          results={[...townhouses].slice(0, 8)}
          showHidden={showHidden}
          searchFilter={searchFilter}
          favouriteLevel={favouriteLevel}
          setSearchFilter={setSearchFilter}
          setShowHidden={setShowHidden}
          setFavouriteLevel={setFavouriteLevel}
        />
        <Accordion
          list={[...filteredResults].slice(0, 8).map((n) => ({
            visibleContent: (
              <Property
                key={n.property_id}
                {...n}
                searchFilter={searchFilter}
                showHidden={showHidden}
                favouriteLevel={
                  favouritedProperties.find((x) => x.id === n.property_id)
                    ?.level || FavoriteLevelEnum.None
                }
                onShowHideProperty={handleShowHideProperty}
                onFavouriteProperty={handleFavouriteProperty}
              />
            ),
            hiddenContent: <PropertyDetails key={n.property_id} {...n} />,
          }))}
        />
        <EditPropertyModal {...editPropertyModal} propertyId={selectedId} />
      </div>
    </Context.Provider>
  );
}

export default App;
