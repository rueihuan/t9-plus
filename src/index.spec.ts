import { T9Search } from "./";
import { unigram } from "unigram";

describe("T9 Search", () => {
  it("should predict words", () => {
    const t9 = new T9Search();

    const words = ["morning", "mmmm", "mnom", "moon", "momn"];
    t9.setDict(words);

    const prediction = t9.predict("6666");
    expect(prediction).toEqual(["mmmm", "mnom", "momn", "moon"]);
  });

  it("should not predict words with invalid prefix", () => {
    const t9 = new T9Search();

    const words = ["morning", "moon"];
    t9.setDict(words);

    const prediction = t9.predict("661");
    expect(prediction).toEqual([]);
  });

  it("should predict words with unigram", () => {
    const t9 = new T9Search();

    const wordsWithWeight = unigram;

    const map = new Map();

    for (let i = 0; i < wordsWithWeight.length; i++) {
      map.set(wordsWithWeight[i]["word"], wordsWithWeight[i]["freq"]);
    }

    t9.setDictWithWeight(map);

    const p1 = t9.predict("732666363284667");
    expect(p1).toEqual(["recommendations"]);

    const p2 = t9.predict("777777777777");
    expect(p2).toEqual([]);
  });

  it("should recognize the prefix with too many length", () => {
    const t9 = new T9Search();

    const words = [
      "animal",
      "baseball",
      "capital",
      "moonmoonmoonmoonmoonmoon",
      "morning",
    ];
    t9.setDict(words);

    const prediction = t9.predict("66666666666666666666");
    expect(prediction).toEqual(["moonmoonmoonmoonmoonmoon"]);
  });
});
