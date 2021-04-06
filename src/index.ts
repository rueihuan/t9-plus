const product = require("cartesian-product");
const TrieSearch = require("trie-search");

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
  private triePrioritized = new TrieSearch();

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

    const predictions = [
      ...this.triePrioritized.get(combos),
      ...this.trie.get(combos),
    ];

    return predictions.map((prediction) => prediction.value);
  }

  setDict(words: string[]) {
    this.trie = new TrieSearch();

    const wordObj: { [key: string]: string } = {};
    words.map((word) => {
      wordObj[word] = word;
    });

    this.trie.addFromObject(wordObj);
  }

  setDictPrioritized(words: string[]) {
    this.triePrioritized = new TrieSearch();

    const wordObj: { [key: string]: string } = {};
    words.map((word) => {
      wordObj[word] = word;
    });

    this.triePrioritized.addFromObject(wordObj);
  }
}
