/* eslint-disable no-undef */
const fs = require("fs");
const nutsLookup = require("../nutsLookup");

const readJSON = (path) => {
  const data = fs.readFileSync(path, "utf8");
  const json = JSON.parse(data);
  return json;
};

const json = readJSON("./nutsArraySorted.json");

// Selects 100 random elements from the json array
const randomElements = () => {
  const randomArray = [];
  for (let i = 0; i < 100; i += 1) {
    const randomIndex = Math.floor(Math.random() * json.length);
    randomArray.push(json[randomIndex]);
  }
  return randomArray;
};

const randomArray = randomElements();

describe("nutsLookup", () => {
  test.each(randomArray)(
    "returns an object with the correct location",
    (element) => nutsLookup(element.Code).then((result) => {
        expect(result).toBeInstanceOf(Object);
        expect(result.Region).toEqual(element.Region);
      })
  );
});
