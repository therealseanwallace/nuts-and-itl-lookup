/* eslint-disable no-undef */
const fs = require("fs");
const nutsLookup = require("../nutsLookup");

const readJSON = (path) => {
  const data = fs.readFileSync(path, "utf8");
  const json = JSON.parse(data);
  return json;
};

const json = readJSON("./nutsArraySorted.json");

describe("nutsLookup", () => {
  test("Works with lowercase letters", () =>
    nutsLookup("pl622").then((result) => {
      expect(result.code).toEqual("PL622");
      expect(result.region).toEqual("Olsztyński");
    }));

  test("Works with TL", () =>
    nutsLookup("TLN07").then((result) => {
      expect(result.code).toEqual("TLN07");
      expect(result.region).toEqual("Armagh City, Banbridge and Craigavon");
    }));

  test("Works with tl", () =>
    nutsLookup("tln07").then((result) => {
      expect(result.code).toEqual("TLN07");
      expect(result.region).toEqual("Armagh City, Banbridge and Craigavon");
    }));
  test("Works with 2-letter country code", () =>
    nutsLookup("FR101").then((result) => {
      expect(result.code).toEqual("FR101");
      expect(result.region).toEqual("Paris");
    }));
    test("Works with the edge-case of Timor-Leste", () =>
    nutsLookup("TL").then((result) => {
      expect(result.code).toEqual("TL");
      expect(result.region).toEqual("Timor-Leste");
    }));
    test.each.skip(json)(
      "checks that every location returns an object with the correct location",
      (element) =>
        nutsLookup(element.code).then((result) => {
          expect(result).toBeInstanceOf(Object);
          expect(result.region).toEqual(element.region);
        })
    );
});
