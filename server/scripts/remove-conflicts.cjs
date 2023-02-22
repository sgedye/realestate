const fs = require("fs-extra");

const path = require("path");
const mergedData = require("../data/merged.json");

const filteredMergedData = mergedData.filter((n) => !n.property_id.endsWith("_CONFLICT"));

fs.writeFile(
  path.resolve(__dirname, "../data/merged.json"),
  JSON.stringify(filteredMergedData, null, 2),
  (err) => {
    if (err) {
      console.log("Error while writing JSON: ", err);
    } else {
      console.log("JSON file successfully written");
    }
  }
);