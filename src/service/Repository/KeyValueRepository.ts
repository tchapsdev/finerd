export class KeyValueRepository<T = any> {
	protected key: string;

	constructor(key: string) {
		this.key = key;
	}

	public readonly createOrUpdate = (value: T): T => {
		if (value) {
			this.store(this.key, value);
		}

		return value;
	};

	public readonly delete = (): void => localStorage.removeItem(this.key);

	public readonly find = (): T | null => this.fetch(this.key) || null;

	public readonly store = (key: string, value: T): void => localStorage.setItem(key, JSON.stringify(value));

	private readonly fetch = (key: string): T | null => JSON.parse(localStorage.getItem(key));
}
