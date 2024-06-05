import geardb from '../index';

const db = new geardb("test.json");

await db.set("sa", "as");
await db.pull("list", 0);
console.log(db.get("list"))
