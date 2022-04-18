import { Transaction } from '../types';
import { TokenManager } from './Auth/TokenManager';
import { createHttpClient, HttpClient } from './Http/Client';
import { ModelRepository } from './Repository/ModelRepository';

export class TransactionService<T extends Transaction> {
	protected key = 'transactions';

	protected isSignedIn: boolean;
	protected isOnline: boolean;

	protected client: HttpClient;
	protected repository: ModelRepository<T>;
	protected client: HttpClient;
	protected tokenManager: TokenManager;
	protected isAppOnline = window.navigator.onLine;

	constructor() {
		const tokenManager = new TokenManager();

		this.isSignedIn = tokenManager.hasToken();
		this.isOnline = navigator.onLine;

		this.client = createHttpClient(tokenManager);
		this.repository = new ModelRepository<T>(this.key);
		this.tokenManager = new TokenManager();
		this.client = createHttpClient(this.tokenManager);
	}

	public readonly save = async (model: T): Promise<T> => {
		let data = model;

		if (this.isSignedIn && this.isOnline) {
			data = await this.saveRemotely(model);
		}

		return this.saveLocally(data);
	};

	private readonly saveLocally = (model: T): T => this.repository.createOrUpdate(model);

	private readonly saveRemotely = async (model: T): Promise<T> => {
		if (model.id) {
			const res = await this.client.put(`/Transactions/${model.id}`, model);
			return res.data as T;
		}

		const res = await this.client.post('/Transactions', model);
		return res.data as T;
	};

	public readonly findAllByType = async (type: T['type']): Promise<T[]> => {
		if (this.isSignedIn && this.isOnline) {
			return this.findAllByTypeRemotely(type);
		}

		return this.findAllByTypeLocally(type);
	};

	private readonly findAllByTypeLocally = (type: T['type']): T[] => {
		const transactions = this.repository
			.findAll()
			.filter(transaction => transaction.type.toLowerCase() === type.toLowerCase());
		return this.formatDates(transactions);
	};

	private readonly findAllByTypeRemotely = async (type: T['type']): Promise<T[]> => {
		const res = await this.client.get(`/Transactions/findAllByType/${type}`);
		return this.formatDates(res.data as T[]);
	};

	public readonly deleteById = async (id: number): Promise<void> => {
		if (this.isSignedIn && this.isOnline) {
			return this.deleteByIdRemotely(id);
		}

		return this.deleteByIdLocally(id);
	};

	private readonly deleteByIdLocally = (id: number): void => this.repository.deleteById(id);

	private readonly deleteByIdRemotely = async (id: number): Promise<void> => {
		await this.client.delete(`/Transactions/${id}`);
	};

	public readonly syncTransactions = async (): Promise<void[]> => {
		const transactions = this.repository.findAll();

		return Promise.all(
			transactions.map(transaction => {
				delete transaction.id;
				this.client.post('/Transactions', transaction);
			})
		);
	};

	private readonly formatDates = (transactions: T[]): T[] => {
		transactions.forEach(transaction => {
			if (transaction.updatedAt) {
				transaction.updatedAt = new Date(transaction.updatedAt);
			}

			if (transaction.deletedAt) {
				transaction.deletedAt = new Date(transaction.deletedAt);
			}

			transaction.createdAt = new Date(transaction.createdAt);
		});

		return transactions;
	};
}
