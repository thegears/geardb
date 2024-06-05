Another Local JSON Database

![GitHub license](https://img.shields.io/github/license/thegears/geardb.svg?style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/thegears/geardb.svg?style=flat-square)
![GitHub forks](https://img.shields.io/github/forks/thegears/geardb.svg?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/thegears/geardb.svg?style=flat-square)
![GitHub pull requests](https://img.shields.io/github/issues-pr/thegears/geardb.svg?style=flat-square)

First of all, thank you for using thegears/geardb

## How to use

### Install

```bash
npm install geardb
```

### Usage

```ts
// ES6
import GearDB from 'geardb';
// CommonJS
const GearDB = require('geardb');

const db = new GearDB("db.json"); // path to db.

await db.set("key", "value");

console.log(db.get("key")); // log 'value'

await db.push("list", "value");

console.log(db.get("list")); // log ['value']

await db.pull("list", "value");

// -- OR --

await db.pull("list", 0);

console.log(db.get("list")); // log []

await db.filter("list",(value) => value !== "value");

console.log(db.get("list")); // log []

```

