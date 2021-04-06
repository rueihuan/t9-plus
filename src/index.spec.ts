import { T9Search } from "./";
const words = require("an-array-of-english-words");

describe("T9 Search", () => {
  it("should predict words", () => {
    const words = ["animal", "baseball", "capital", "elephant", "morning"];
    const wordsPrioritized = ["apple", "banana", "moon"];
    const t9 = new T9Search();
    t9.setDict(words);
    t9.setDictPrioritized(wordsPrioritized);

    const prediction = t9.predict("66");
    expect(prediction.slice(0, 2)).toEqual(["moon", "morning"]);
  });

  it("should prioritize the results from Prioritized Dict", () => {
    const wordsPrioritized = ["apple", "banana", "moon"];
    const t9 = new T9Search();
    t9.setDict(words);
    t9.setDictPrioritized(wordsPrioritized);

    const prediction = t9.predict("66");
    expect(prediction.slice(0, 1)).toEqual(["moon"]);
  });
});
