const fs = require("fs-extra");
const path = require("path");

const mergedData = require("../data/merged.json");
// const newData = require("../data/scraped_data-2023_02_22.json");
const newData = require("../data/test.json");

const MAX_CHAR_LIMIT = 19000;

const init = () => {
  createBackupPreMergeData();

  const newPropertiesToAdd = getNewPropertiesToMerge();
  console.log(newPropertiesToAdd[0]);
  const sortedMergedData = getSortedMergeData(newPropertiesToAdd);

  fs.writeFile(
    path.resolve(__dirname, "../data/merged.json"),
    JSON.stringify(sortedMergedData, null, 2),
    (err) => {
      if (err) {
        console.log("Error while writing JSON: ", err);
      } else {
        console.log("JSON file successfully written");
      }
    }
  );
};


function createBackupPreMergeData() {
  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, 0);
    const date = now.getDate().toString().padStart(2, 0);
    const dateString = `${year}_${month}_${date}`;

    fs.copySync(
      path.resolve(__dirname, "../data/merged.json"),
      path.resolve(__dirname, `../data/_bak/merged_${dateString}.json`)
    );

    console.log("Previous merged data saved in `_bak` folder");
  } catch (err) {
    console.error("Error: ", err);
    throw new Error("Pre-merge backup fail... stopping merge.");
  }
}

function getNewPropertiesToMerge() {
  return newData.map((newDatum) => {
    delete newDatum["web-scraper-order"];
    delete newDatum["web-scraper-start-url"];
    if (newDatum.description?.length > MAX_CHAR_LIMIT) {
      newDatum.description =
        newDatum.description?.substring(0, MAX_CHAR_LIMIT) + "...";
    }
    return newDatum;
  });
}

function getSortedMergeData(newPropertiesToAdd) {
  const preMergeNumberOfProperties = mergedData.length;
  let uniquePropertiesAdded = 0;
  let identialPropertiesIgnored = 0;
  let existingPropertiesConflicts = [];
  let conflictingProps = [];

  // If mergedData is empty copy everything, but make title and subtitles into arrays of strings.
  // if (preMergeNumberOfProperties === 0) {
  //   return newPropertiesToAdd.map((n) => ({
  //     ...n,
  //     title: n.title ? [n.title] : [],
  //     subtitle: n.substring ? [n.subtitle] : [],
  //   }));
  // }

  const updatedMergedData = JSON.parse(JSON.stringify(mergedData));

  newPropertiesToAdd.forEach((newProperty, idx) => {
    const mergedDatum =
      mergedData.find((n) => n.property_id === newProperty.property_id) || null;

    console.log(idx, mergedDatum?.title || "new", mergedDatum);
    console.log("MERGED", mergedData.length);

    // New properties are just added to the list
    if (mergedDatum === null) {
      console.log("Adding to updatedMergedData...");
      uniquePropertiesAdded++;
      updatedMergedData.push({
        ...newProperty,
        title: newProperty.title ? [newProperty.title] : [],
        subtitle: newProperty.substring ? [newProperty.subtitle] : [],
      });
      return;
    }

    // existingPropertiesConflicts.push(newProperty.property_id);

    if (!mergedDatum.title?.includes(newProperty.title)) {
      console.log("titles different... pushhing title")
      mergedDatum.title.push(newProperty.title);
    }

    // Update merged datum
    // console.log(newProperty)
    // console.log(mergedDatum?.title, newProperty.title)

    // console.log("test", newProperty);
    // console.log('no mergedDatum title', mergedDatum?.property_id)
    // mergedDatum.title.push(newProperty.title)
    // if (mergedDatum?.title && mergedData.title.contains(newProperty.title)) {
    //   mergedDatum.title.push(newProperty.title)
    // }
    // if (mergedDatum.title[0] !== newProperty.title) {
    //   mergedDatum.title.push(newProperty.title)
    // }
    // if (mergedDatum.subtitle[0] !== newProperty.subtitle) {
    //   mergedDatum.subtitle.push(newProperty.subtitle)
    // }

    // // Temporarily Changing the Property Id to be updated later.
    // alteredNewProperty.property_id += "_CONFLICT";
    // mergedData.push(alteredNewProperty);
  });

  const valuesToLog = {
    "Pre-merge properties": preMergeNumberOfProperties,
    "+ Unique properties added": uniquePropertiesAdded,
    "+ Existing properties conflict": existingPropertiesConflicts.length,
    "= Post-merge properties": mergedData.length,
    "(Identical properties ignored)": identialPropertiesIgnored,
  };

  const conflictsToLog = existingPropertiesConflicts.map((n) => {
    return { "CONFLICT ID": n };
  });

  const conflictPropsToLog = conflictingProps.map((n) => {
    return { Prop: n };
  });

  console.table(valuesToLog);
  console.table(conflictsToLog);
  // console.table(conflictPropsToLog);
  console.log(conflictingProps);

  return [...updatedMergedData].sort((a, b) => a.property_id - b.property_id);
}

// function getNewValueArray()

init();
