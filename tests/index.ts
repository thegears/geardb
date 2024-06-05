import geardb from '../index';

const db = new geardb("test.json");
await db.set("testFindAndSet", [
	{
		userId: "2121",
		values: [
			{
				"id": 1
			},
			{
				"id": 2
			},
			{
				"id": 3
			}
		]
	}
])

await db.findAndPush("testFindAndSet.userId=2121.values", { "id:": 4 })

await db.findAndPull("testFindAndSet.userId=2121.values.id=1")


console.log(db.get("testFindAndSet"))
