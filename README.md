# T9 Plus

Word prediction for T9 keyboard.

## Install

```sh
yarn add t9-plus
```

## Usage

### With Naive Dictionary

```ts
const { T9Search } = require("t9-plus");

const t9 = new T9Search();

const words = ["animal", "baseball", "capital", "elephant", "morning"];

t9.setDict(words);

console.log(t9.predict("6666"));
```

### With Unigram Language Model

```ts
const { T9Search } = require("t9-plus");

const t9 = new T9Search();

const unigram = require("unigram");
const wordsWithWeight = unigram.slice(0, 20000);

const map = new Map();

for (let i = 0; i < wordsWithWeight.length; i++) {
  map.set(wordsWithWeight[i]["word"], Number(wordsWithWeight[i]["freq"]));
}

t9.setDictWithWeight(map);

console.log(t9.predict("6666"));
```
