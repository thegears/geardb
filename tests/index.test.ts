import geardb from '../index';

const testDb = new geardb("test.json");

test("set and get is working properly", async () => {
	await testDb.set("key", "value");
	expect(await testDb.get("key")).toBe("value");
});

test("push is working properly", async () => {
	await testDb.push("list", "value");
	expect(await testDb.get("list")).toContain("value");
});

test("pull is working properly", async () => {
	await testDb.pull("list", "value");
	expect(await testDb.get("list")).not.toContain("value");
})

test("filter is working properly", async () => {
	await testDb.push("list", "value");
	await testDb.filter("list", (value) => value != "value");
	expect(await testDb.get("list")).not.toContain("value");
})

test("find is working properly", async () => {
	await testDb.push("list2", {
		id: 1,
		name: "test",
		values: []
	});
	expect((await testDb.find("list2.id=1.name"))).toBe("test");
	expect((await testDb.find("list2.name=test.name"))).toBe("test");
})

test("findAndSet is working properly", async () => {
	await testDb.findAndSet("list2.id=1.name", "test2");
	expect((await testDb.find("list2.id=1.name"))).toBe("test2");
})

test("findAndPush is working properly", async () => {
	await testDb.findAndPush("list2.id=1.values", "value");
	expect((await testDb.find("list2.id=1.values"))).toContain("value");
})

test("findAndPull is working properly", async () => {
	await testDb.findAndPull("list2.id=1.values", "value");
	expect((await testDb.find("list2.id=1.values"))).not.toContain("value");

	await testDb.findAndPush("list2.id=1.values", {
		key: "value"
	});
	await testDb.findAndPull("list2.id=1.values", "key=value");
	expect((await testDb.find("list2.id=1.values.key=value"))).toBeUndefined();

	await testDb.findAndPull("list2", "id=1");
	expect((await testDb.find("list2.id=1"))).toBeUndefined();
})
