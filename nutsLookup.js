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
    if (array[mid].Code === x) {
      return array[mid];
    }
    if (array[mid].Code > x) {
      return nutsBinarySearch(array, l, mid - 1, x);
    }
    return nutsBinarySearch(array, mid + 1, r, x);
  }
  return -1;
};

const nutsLookup = async (query) => {
  const json = await readFile("./nutsArraySorted.json");
  let queryToUse = query;
  if (!query) {
    return null;
  }
  let result;
  if (query.startsWith("TL") || query.startsWith("tl")) {
    queryToUse = `UK${query.slice(2)}`;
    queryToUse = `UK${queryToUse.slice(2)}`;
    result = await nutsBinarySearch(json, 0, json.length - 1, queryToUse);
    if (result === -1) {
      return null;
    }
    return { Code: query, Region: result.Region };
  }
  result = await nutsBinarySearch(json, 0, json.length - 1, queryToUse);
  if (result === -1) {
    return null;
  }
  return result;
};

module.exports = nutsLookup;
