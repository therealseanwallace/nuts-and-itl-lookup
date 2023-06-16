const fs = require("fs").promises;

const readFile = async (path) => {
  const data = await fs.readFile(path, "utf8");
  const json = JSON.parse(data);
  return json;
};

// A simple binary search which will search the sorted nuts array for the query's
const nutsBinarySearch = async (array, l, r, x) => {
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
  return -1;
};

const nutsLookup = async (query) => {
  const json = await readFile("./nutsArraySorted.json");
  
  let queryToSlice = query;

  if (!query) {
    return null;
  }

  if (
    queryToSlice.length >= 2 &&
    queryToSlice.slice(0, 2).toLowerCase() === queryToSlice.slice(0, 2)
  ) {
    queryToSlice =
    queryToSlice.charAt(0).toUpperCase() +
    queryToSlice.charAt(1).toUpperCase() +
    queryToSlice.slice(2);
  }

  let queryToUse = queryToSlice;

  let result;

  if (queryToUse.startsWith("TL")) {
    queryToUse = `UK${queryToUse.slice(2)}`; // Correct this line
    result = await nutsBinarySearch(json, 0, json.length - 1, queryToUse);
    if (result === -1) {
      return null;
    }
    return { code: queryToSlice, region: result.region };
  }

  result = await nutsBinarySearch(json, 0, json.length - 1, queryToUse);
  if (result === -1) {
    return null;
  }
  return result;
};

module.exports = nutsLookup;
