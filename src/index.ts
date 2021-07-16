const product = require("cartesian-product");
const TrieSearch = require("trie-search");

import { sort } from "fast-sort";

export class T9Search {
  private trie = new TrieSearch();
  private map = new Map<string, number | string>();
  private numbers = new Map<string, string[]>();
  private maxLength = 0;
  private threshold = 10;

  constructor() {
    this.numbers.set("2", ["a", "b", "c"]);
    this.numbers.set("3", ["d", "e", "f"]);
    this.numbers.set("4", ["g", "h", "i"]);
    this.numbers.set("5", ["j", "k", "l"]);
    this.numbers.set("6", ["m", "n", "o"]);
    this.numbers.set("7", ["p", "q", "r", "s"]);
    this.numbers.set("8", ["t", "u", "v"]);
    this.numbers.set("9", ["w", "x", "y", "z"]);
  }

  private generateCombos(prefix: string) {
    const pLetters = prefix.split("");
    const letters: string[][] = [];
    pLetters.forEach((p) => {
      if (!this.numbers.get(p)) throw new Error("Invalid Prefix");
      letters.push(this.numbers.get(p) as string[]);
    });

    const combos: string[][] = product(letters);

    return combos.map((combo) => combo.join(""));
  }

  predict(prefix: string) {
    if (prefix.length > this.maxLength) return [];
    if (prefix.length > this.threshold) return this.predictLong(prefix);

    const combos = this.generateCombos(prefix);

    const words: string[] = this.trie
      .get(combos)
      .map((prediction: any) => prediction.value);

    if (!this.map.size) return words;

    const predictions = sort(words).by([
      { desc: (word) => Number(this.map.get(word)) },
      { asc: (word) => word },
    ]);

    return predictions;
  }

  private predictLong(prefix: string): string[] {
    const first10 = prefix.slice(0, this.threshold);
    const candidates = this.predict(first10);

    prefix.split("").forEach((p) => {
      if (!this.numbers.get(p)) throw new Error("Invalid Prefix");
    });

    candidates.filter((word) => {
      for (let i = this.threshold; i < prefix.length; i++) {
        const char = word[i];

        if (!this.numbers.get(prefix[i])!.includes(char)) return false;
      }

      return true;
    });

    return candidates;
  }

  setDict(words: string[]) {
    this.trie = new TrieSearch();
    let maxLength = 0;

    const wordsObj: { [key: string]: string } = {};
    words.forEach((word) => {
      wordsObj[word] = word;
      maxLength = Math.max(maxLength, word.length);
    });

    this.trie.addFromObject(wordsObj);
    this.map = new Map();
    this.maxLength = maxLength;
  }

  setDictWithWeight(weightMap: Map<string, string | number>) {
    this.setDict(Array.from(weightMap.keys()));
    this.map = weightMap;
  }
}
