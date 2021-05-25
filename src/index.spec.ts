import { T9Search } from "./";

describe("T9 Search", () => {
  it("should predict words", () => {
    const words = ["animal", "baseball", "capital", "elephant", "morning"];
    const t9 = new T9Search();
    t9.setDict(words);

    const prediction = t9.predict("6");
    expect(prediction.slice(0, 2)).toEqual(["morning"]);
  });
});
