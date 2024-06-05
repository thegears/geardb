import fs from 'node:fs'
import * as steno from 'steno';

export default class {

	private path: fs.PathLike;
	private writer: steno.Writer;

	public constructor(path: fs.PathLike) {
		this.path = path;
		this.writer = new steno.Writer(path);

		if (!fs.existsSync(this.path)) {
			fs.writeFileSync(this.path, "{}", {
				encoding: "utf8", flag: "w"
			});
		};
	};


	public async set(key: string, value: any) {
		let data = this.fileData();

		data[key] = value;

		await this.writer.write(JSON.stringify(data, null, 2));
	};

	public get(key: string) {
		let data = this.fileData();

		return data[key];
	};

	public async push(key: string, value: any) {
		let data = this.fileData();

		if (!data[key]) {
			data[key] = [];
		} else if (!Array.isArray(data[key])) {
			throw new Error("Error on push. Key is not an array.");
		};

		data[key].push(value);

		await this.writer.write(JSON.stringify(data, null, 2));
	};

	public async pull(key: string, value: string | number) {
		let data = this.fileData();

		if (!data[key] || !Array.isArray(data[key])) {
			throw new Error("Key is not an array.");
		};

		if (typeof value !== "string" && typeof value !== "number") {
			throw new Error("Error on pull. Value is not a string or number.");
		};

		if (typeof value === "string") {
			data[key] = data[key].filter((item: any) => item !== value);
		} else if (typeof value === "number") {
			data[key] = data[key].filter((_: any, index: number) => index !== value);
		};

		await this.writer.write(JSON.stringify(data, null, 2));
	};

	public async filter(key: string, func: (value: any, index: number, array: any[]) => boolean) {
		let data = this.fileData();

		if (!data[key] || !Array.isArray(data[key])) {
			throw new Error("Key is not an array.");
		};

		if (typeof func !== "function") {
			throw new Error("Error on filter. Given function is invalid.");
		};

		data[key] = data[key].filter(func);

		await this.writer.write(JSON.stringify(data, null, 2));
	};

	public async findAndSet(key: string, value: any) {

		let data = this.fileData();

		const keyList = key.split(".");

		if (!data[keyList[0]]) {
			throw new Error("Key is not exist.");
		};

		if (keyList.length < 2) {
			throw new Error("Error on findAndSet. Given key is invalid.");
		};

		let evalString = "data";

		for (let i = 0; i < keyList.length; i++) {
			if (keyList[i].includes("=")) {
				evalString += `.find((item) => item.${keyList[i].split("=")[0]} == ${keyList[i].split("=")[1]})`;
			} else {
				evalString += `["${keyList[i]}"]`;
			}
		};

		evalString += `= value`;

		eval(evalString);

		await this.writer.write(JSON.stringify(data, null, 2));
	};

	public async findAndPush(key: string, value: any) {

		let data = this.fileData();

		const keyList = key.split(".");

		if (!data[keyList[0]]) {
			throw new Error("Key is not exist.");
		};

		if (keyList.length < 2) {
			throw new Error("Error on findAndPush. Given key is invalid.");
		};

		let evalString = "data";

		for (let i = 0; i < keyList.length; i++) {
			if (keyList[i].includes("=")) {
				evalString += `.find((item) => item.${keyList[i].split("=")[0]} == ${keyList[i].split("=")[1]})`;
			} else {
				evalString += `["${keyList[i]}"]`;
			}
		};

		evalString += `.push(value)`;

		eval(evalString);

		await this.writer.write(JSON.stringify(data, null, 2));
	};

	public async findAndPull(key: string) {

		let data = this.fileData();

		const keyList = key.split(".");

		if (!data[keyList[0]]) {
			throw new Error("Key is not exist.");
		};

		if (keyList.length < 2) {
			throw new Error("Error on findAndPull. Given key is invalid.");
		};

		//await db.findAndPull("testFindAndSet.userId=2121")


		let evalString = "data";

		for (let i = 0; i < keyList.length; i++) {
			if (i == keyList.length - 1) {
				evalString += ` = ${evalString}.filter((item) => item.${keyList[i].split("=")[0]} != ${keyList[i].split("=")[1]})`;
			}
			else {
				if (keyList[i].includes("=")) {
					evalString += `.find((item) => item.${keyList[i].split("=")[0]} == ${keyList[i].split("=")[1]})`;
				} else {
					evalString += `["${keyList[i]}"]`;
				}
			}
		};

		console.log(evalString)

		eval(evalString);

		await this.writer.write(JSON.stringify(data, null, 2));
	};

	private fileData() {
		let data = fs.readFileSync(this.path, {
			encoding: "utf8", flag: "r"
		});

		try {
			data = JSON.parse(data)
		} catch (error) {
			throw new Error("Invalid JSON data.")
		}

		return data;
	};

}
