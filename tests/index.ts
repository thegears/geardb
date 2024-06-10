import geardb from '../index';

const db = new geardb("test.json");
await db.set("testFind", [
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




console.log(await db.find("testFind.userId=2121.values.id=2"))
