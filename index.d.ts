declare class GearDB {
	constructor(path: string);

	public get(key: string): Promise<any>;
	public set(key: string, value: any): Promise<void>;
	public push(key: string, value: any): Promise<void>;
	public pull(key: string, value: any): Promise<void>;
	public filter(key: string, func: (value: any, index: number, array: any[]) => boolean): Promise<void>;
	public find(key: string): Promise<any>;
	public findAndPush(key: string, value: any): Promise<void>;
	public findAndPull(key: string): Promise<void>;
	public findAndSet(key: string, value: any): Promise<void>;

	private fileData(key: string): Promise<void>;
}
