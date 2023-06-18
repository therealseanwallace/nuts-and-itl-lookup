const fs = require("fs").promises;
const path = require("path");

const readFile = async (fileLocation) => {
  const data = await fs.readFile(fileLocation, "utf8");
  const json = JSON.parse(data);
  return json;
};

const nutsBinarySearch = (array, l, r, x) => {
  if (r >= l) {
    const mid = Math.floor(l + (r - l) / 2);
    if (array[mid].code === x) {
      return array[mid];
    }
    if (array[mid].code > x) {
      return nutsBinarySearch(array, l, mid - 1, x);
    }
    return nutsBinarySearch(array, mid + 1, r, x);
  }
  return null;
};

const nutsLookup = async (query) => {
  if (!query) {
    return null;
  }

  let jsonFilePath;
  let json;
  try {
    jsonFilePath = path.join(__dirname, "nutsArraySorted.json");
    json = await readFile(jsonFilePath);
  } catch (error) {
    console.error("Error reading JSON file:", error);  
  }
  
  let queryToUse = query.toUpperCase();

  let result;

  // If this is an ITL query
  if (queryToUse.startsWith("TL")) {

    // Handle the edge case of Timor Leste
    if (queryToUse === "TL") {
      result = await nutsBinarySearch(json, 0, json.length - 1, "TL");
      return { code: query.toUpperCase(), region: result.region };
    };

    // Convert the query to the correct format for the binary search
    queryToUse = `UK${queryToUse.slice(2)}`;
  }

  result = await nutsBinarySearch(json, 0, json.length - 1, queryToUse);
  if (result === -1) {
    return null;
  }
  if (query.toUpperCase().startsWith("TL")) {
    return { code: query.toUpperCase(), region: result.region };
  }
  return result;
};

module.exports = nutsLookup;
