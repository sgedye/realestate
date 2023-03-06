import fs from "fs-extra";

const MAX_CHAR_LIMIT = 19000;

type BasePropertyDatum = {
  link: string;
  'link-href': string;
  address: string;
  type: string;
  'image-src': string;
  description: string;
  property_id: string;
  building_size?: string;
  bedrooms?: string;
  bathrooms?: string;
  carbays?: string;
}

type ScrapedPropertyDatum = BasePropertyDatum & {
  title: string;
  subtitle: string;
  "web-scraper-order"?: string;
  "web-scraper-start-url"?: string;
}

type MergedPropertyDatum = BasePropertyDatum & {
  title: string[];
  subtitle: string[];
}

const mergedData: MergedPropertyDatum[] = JSON.parse(fs.readFileSync('./data/merged.json', 'utf8')) || [];
const newData: ScrapedPropertyDatum[] = JSON.parse(fs.readFileSync('./data/test.json', 'utf8')) || [];

const init = () => {
  createBackupPreMergeData();

  const newPropertiesToAdd = getNewPropertiesToMerge();
  const sortedMergedData = getSortedMergeData(newPropertiesToAdd);

  fs.writeFile(
    "./data/merged.json",
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
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const date = now.getDate().toString().padStart(2, "0");
    const dateString = `${year}_${month}_${date}`;

    fs.copySync(
      "./data/merged.json",
      `./data/_bak/merged_${dateString}.json`
    );

    console.log("Previous merged data saved in `_bak` folder");
  } catch (err) {
    console.error("Error: ", err);
    throw new Error("Pre-merge backup fail... stopping merge.");
  }
}

function getNewPropertiesToMerge() {
  return (newData as ScrapedPropertyDatum[]).map((newDatum) => {
    delete newDatum["web-scraper-order"];
    delete newDatum["web-scraper-start-url"];
    if (newDatum.description?.length > MAX_CHAR_LIMIT) {
      newDatum.description =
        newDatum.description?.substring(0, MAX_CHAR_LIMIT) + "...";
    }
    return newDatum;
  });
}

function getSortedMergeData(newPropertiesToAdd: ScrapedPropertyDatum[]) {
  const preMergeNumberOfProperties = mergedData.length;
  let uniquePropertiesAdded = 0;
  let identialPropertiesIgnored = 0;
  let existingPropertiesUpdated = 0

  const updatedMergedData: MergedPropertyDatum[] = JSON.parse(JSON.stringify(mergedData));

  newPropertiesToAdd.forEach((newProperty) => {
    const mergedDatum = updatedMergedData.find((n) => n.property_id === newProperty.property_id) || null;

    // New properties are just added to the list
    if (mergedDatum === null) {
      uniquePropertiesAdded++;
      updatedMergedData.push({
        ...newProperty,
        title: newProperty.title ? [newProperty.title] : [],
        subtitle: newProperty.subtitle ? [newProperty.subtitle] : [],
      });
      return;
    }

    let haveTitlesChanged = false;

    // If the title or subtitle has changes, add it to the array
    if (!mergedDatum.title.includes(newProperty.title)) {
      mergedDatum.title.push(newProperty.title);
      haveTitlesChanged = true;
    }

    if (!mergedDatum.subtitle.includes(newProperty.subtitle)) {
      mergedDatum.subtitle.push(newProperty.subtitle);
      haveTitlesChanged = true;
    }

    if (haveTitlesChanged) {
      existingPropertiesUpdated++;
    }
  });

  console.table(
    {
      "Pre-merge properties": preMergeNumberOfProperties,
      "+ Unique properties added": uniquePropertiesAdded,
      "= Post-merge properties": updatedMergedData.length,
      "(Existing properties updated)": existingPropertiesUpdated,
    }
  );

  return [...updatedMergedData].sort((a, b) => Number(a.property_id) - Number(b.property_id));
}

init();
