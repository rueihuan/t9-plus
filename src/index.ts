const product = require("cartesian-product");
const TrieSearch = require("trie-search");

import { sort } from "fast-sort";

export class T9Search {
  private trie = new TrieSearch();
  private map = new Map<string, number | string>();
  private numbers = new Map<string, string[]>();
  private maxLength = 0;
  private thresholdLong = 8;
  private thresholdMid = 4;

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
      letters.push(this.numbers.get(p) as string[]);
    });

    const combos: string[][] = product(letters);

    return combos.map((combo) => combo.join(""));
  }

  predict(prefix: string): string[] {
    if (prefix.length > this.maxLength) return [];

    for (const p of prefix) {
      if (!this.numbers.get(p)) return [];
    }

    if (prefix.length > this.thresholdLong) return this.predictLong(prefix);

    if (prefix.length > this.thresholdMid) return this.predictMid(prefix);

    return this.predictShort(prefix);
  }

  private predictShort(prefix: string): string[] {
    const combos = this.generateCombos(prefix);

    const words: string[] = this.trie
      .get(combos)
      .map((prediction: any) => prediction.value);

    if (!this.map.size) return words;

    const predictions = sort(words).by([
      { desc: (word) => Number(this.map.get(word) || 0) },
    ]);

    return predictions;
  }

  private predictMid(prefix: string): string[] {
    let candidates: string[] = [];

    for (
      let i = this.thresholdMid;
      i < Math.min(this.thresholdLong, prefix.length);
      i++
    ) {
      const preceding = prefix.slice(0, i);
      candidates = this.predictShort(preceding);

      if (!candidates) break;
    }

    return candidates;
  }

  private predictLong(prefix: string): string[] {
    const preceding = prefix.slice(0, this.thresholdLong);
    const candidates = this.predictMid(preceding);

    if (!candidates) return [];

    return candidates.filter((word) => {
      if (word.length < prefix.length) return false;

      for (let i = this.thresholdLong; i < prefix.length; i++) {
        const char = word[i];

        if (!this.numbers.get(prefix[i])!.includes(char)) return false;
      }

      return true;
    });
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
