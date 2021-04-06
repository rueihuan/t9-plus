# T9 Plus

## Install

```sh
yarn add t9-plus
```

## Usage

```ts
const { T9Search } = require("t9-plus");

const t9 = new T9Search();

const words = ["animal", "baseball", "capital", "elephant", "morning"];
t9.setDict(words);

// Optional
const wordsPrioritized = ["apple", "banana", "moon"];
t9.setDictPrioritized(wordsPrioritized);

const prediction = t9.predict("6");
console.log(prediction); // ["moon", "morning"]
```
