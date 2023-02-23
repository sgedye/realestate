const fs = require("fs-extra");
const path = require("path");

const mergedData = require("../data/merged.json");
const newData = require("../data/scraped_data-2023_02_22.json");

(() => {
  const hasBackedUpData = backupPreMergeData();

  if (hasBackedUpData === false) {
    console.log("\n\nBackup fail... stopping!\n\n");
    return;
  }

  const sortedMergedData = getSortedMergeData();

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
})();

function backupPreMergeData() {
  let hasBackedUpData = false;
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
    hasBackedUpData = true;
  } catch (err) {
    console.error(err);
  }
  return hasBackedUpData;
}

function getSortedMergeData() {
  const preMergeProperties = mergedData.length;
  let uniquePropertiesAdded = 0;
  let identialPropertiesIgnored = 0;
  let existingPropertiesConflicts = [];
  let conflictingProps = [];

  let test2 = 0;
  newData.forEach((newProperty) => {
    const mergedDatum = mergedData.find(
      (n) => n.property_id === newProperty.property_id
    );

    if (test2 > 9) {
      return
    }
    test2++

    // New properties are just added to the list
    if (mergedDatum === undefined) {
      uniquePropertiesAdded++;
      mergedData.push(newProperty);
      return;
    }

    
    // Do nothing with idential properties
    if (JSON.stringify(mergedDatum) === JSON.stringify(newProperty)) {
      identialPropertiesIgnored++;
      return;
    }

    // Property already exists in merged data so we will merge it.

    // Add in switch if web-scraper... is different do nothing || might be easier to do the ones that are the same.

    const alteredNewProperty = { ...newProperty };
    const newPropertyProps = Object.entries(alteredNewProperty);

    let tempPropsConflictList = [];
    tempPropsConflictList.push(alteredNewProperty.property_id)
    let test = 0;
    newPropertyProps.forEach(([key, value]) => {
      if (mergedData[key] !== value && test < 10) {
        tempPropsConflictList.push(key)
      }
      test++;
    });

    console.log(tempPropsConflictList)
    
    
    existingPropertiesConflicts.push(newProperty.property_id);
    conflictingProps.push(tempPropsConflictList.join("|"));

    // Temporarily Changing the Property Id to be updated later.
    alteredNewProperty.property_id += "_CONFLICT";
    mergedData.push(alteredNewProperty);
    return;
    

  });

  const valuesToLog = {
    "Pre-merge properties": preMergeProperties,
    "+ Unique properties added": uniquePropertiesAdded,
    "+ Existing properties conflict": existingPropertiesConflicts.length,
    "= Post-merge properties": mergedData.length,
    "(Identical properties ignored)": identialPropertiesIgnored,
  };

  const conflictsToLog = existingPropertiesConflicts.map((n) => {
    return { "CONFLICT ID": n };
  });

  
  const conflictPropsToLog = conflictingProps.map((n) => {
    return { "Prop": n };
  });

  console.table(valuesToLog);
  // console.table(conflictsToLog);
  // console.table(conflictPropsToLog);

  return [...mergedData].sort((a, b) => a.property_id - b.property_id);;
}