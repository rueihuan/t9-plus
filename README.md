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

```sh
yarn add unigram
```

```ts
const { T9Search } = require("t9-plus");
const { unigram } = require("unigram");

const t9 = new T9Search();

const wordsWithWeight = unigram.slice(0, 20000);

const map = new Map();

for (let i = 0; i < wordsWithWeight.length; i++) {
  map.set(wordsWithWeight[i]["word"], wordsWithWeight[i]["freq"]);
}

t9.setDictWithWeight(map);

console.log(t9.predict("6666"));
```
