const product = require("cartesian-product");
const TrieSearch = require("trie-search");

import { sort } from "fast-sort";

const numbers = new Map<string, string[]>();

numbers.set("2", ["a", "b", "c"]);
numbers.set("3", ["d", "e", "f"]);
numbers.set("4", ["g", "h", "i"]);
numbers.set("5", ["j", "k", "l"]);
numbers.set("6", ["m", "n", "o"]);
numbers.set("7", ["p", "q", "r", "s"]);
numbers.set("8", ["t", "u", "v"]);
numbers.set("9", ["w", "x", "y", "z"]);

export class T9Search {
  private trie = new TrieSearch();
  private map = new Map<string, number | string>();

  constructor() {}

  private generateCombos(prefix: string) {
    const pLetters = prefix.split("");
    const letters: string[][] = [];
    pLetters.forEach((p) => {
      if (!numbers.get(p)) throw new Error("Invalid Prefix");
      letters.push(numbers.get(p) as string[]);
    });

    const combos: string[][] = product(letters);

    return combos.map((combo) => combo.join(""));
  }

  predict(prefix: string) {
    const combos = this.generateCombos(prefix);

    const words: string[] = this.trie
      .get(combos)
      .map((prediction: any) => prediction.value);

    if (!this.map.size) return words;

    const predictions = sort(words).by([
      { desc: (word) => Number(this.map.get(word)) },
    ]);

    return predictions;
  }

  setDict(words: string[]) {
    this.trie = new TrieSearch();

    const wordsObj: { [key: string]: string } = {};
    words.forEach((word) => {
      wordsObj[word] = word;
    });

    this.trie.addFromObject(wordsObj);
    this.map = new Map();
  }

  setDictWithWeight(weightMap: Map<string, string | number>) {
    this.setDict(Array.from(weightMap.keys()));
    this.map = weightMap;
  }
}
