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


// -- findAndSet, findAndPush, findAndPull ---

"test" :[
    {
      "userId": "2121",
      "values": [
        {
          "id": 1,
          "value": 122
        }
      ]
    }
  ]

await db.findAndPush("test.userId=2121.values", { id: 12, value: 1222 }) // in test array, finds element which userId is 2121  and pushes { id: 12, value: 1222 }
await db.findAndSet("test.userId=2121.values.id=1.value", 1222) // in test array, finds element which userId is 2121 and in values array finds element which id is 1 and sets value 1222
await db.findAndSet("test.userId=2121.userId", 1222) // in test array, finds element which userId is 2121 and sets userId 1222
await db.findAndPull("test.userId=2121") // in test array, finds element which userId is 2121 and removes it
await db.findAndPull("test.userId=2121.values.id=1") // in test array, finds element which userId is 2121 and in values array finds element which id is 1 and removes it



```

