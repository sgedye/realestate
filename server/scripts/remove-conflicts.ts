import { resolve } from "path";
import fs from "fs-extra"

import type { MergedPropertyDatum } from "@shared/types";

const mergedData: MergedPropertyDatum[] = JSON.parse(fs.readFileSync('./data/merged.json', 'utf8')) || [];

const filteredMergedData = mergedData.filter((n) => !n.property_id.endsWith("_CONFLICT"));

function init() {
  if (mergedData.length === filteredMergedData.length) {
    console.log("No conflicts to remove");
    return;
  };

  fs.writeFile(
    resolve(__dirname, "../data/merged.json"),
    JSON.stringify(filteredMergedData, null, 2)
  )
    .catch((err) => {
      if (err) {
        console.log("Error while writing JSON: ", err);
      } else {
        console.log("Conflicts successfully removed");
      }
    });
}

init();