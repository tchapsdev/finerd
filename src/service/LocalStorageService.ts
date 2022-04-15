import { find } from 'lodash';

export abstract class LocalStorageService<T extends { id: number; createdAt?: Date; updatedAt?: Date }> {
	protected abstract key: string;

	protected readonly createOrUpdate = (model: T): T => {
		let data = this.findAll();

		if (!model.id) {
			model.id = data[0] ? data[0].id + 1 : 1;
			model.createdAt = new Date();
		} else {
			data = data.filter(item => item.id !== model.id);
			model.updatedAt = new Date();
		}

		data.push(model);
		this.store(this.key, data);

		return model;
	};

	public readonly deleteById = (id: number): void => {
		const data = this.findAll().filter(item => item.id != id);

		localStorage.removeItem(this.key);
		this.store(this.key, data);
	};

	public readonly findById = (id: number): T | null => find(this.findAll(), item => item.id === id) || null;

	public readonly findAll = (): T[] => this.fetch(this.key) || [];

	private readonly store = (key: string, data: T[]): void => {
		const sorted = data.sort((a, b) => b.id - a.id); // keep data sorted in desc order
		localStorage.setItem(key, JSON.stringify(sorted));
	};

	private readonly fetch = (key: string): T[] | null => JSON.parse(localStorage.getItem(key));

	public readonly fetchObject = (key: string): T | null => {
		if (typeof window !== 'undefined') {
			return JSON.parse(localStorage.getItem(key));
		} else {
			console.log(`LOcal storage not ready. Can not get '${key}' from STORE`);
		}
		return null;
	};

	public readonly storeObject = (key: string, data: T): void => localStorage.setItem(key, JSON.stringify(data));

	// public readonly fetchString = (key: string): string | null => {
	// 	if (typeof window !== 'undefined') {
	// 		return localStorage.getItem(key);
	// 	} else {
	// 		console.log(`LOcal storage not ready. Get not get '${key}'`);
	// 	}
	// };
	// public readonly storeString = (key: string, data: string): void => localStorage.setItem(key, data);
}
