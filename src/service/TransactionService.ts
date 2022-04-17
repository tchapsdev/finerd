import { Transaction } from '../types';
import { TokenManager } from './Auth/TokenManager';
import { createHttpClient, HttpClient } from './Http/Client';
import { ModelRepository } from './Repository/ModelRepository';

export class TransactionService<T extends Transaction> {
	protected key = 'transactions';
	protected repository: ModelRepository<T>;
	protected client: HttpClient;
	protected tokenManager: TokenManager;
	protected isAppOnline = window.navigator.onLine;

	constructor() {
		this.repository = new ModelRepository<T>(this.key);
		this.tokenManager = new TokenManager();
		this.client = createHttpClient(this.tokenManager);
	}

	public readonly save = (model: Transaction): Transaction => {
		//if (!this.isAppOnline) return this.repository.createOrUpdate(model);

		let result = this.client.post('/Transactions', model);
		result
			.then(res => {
				console.log('Transactions added successful.');
				return this.repository.createOrUpdate(res.data);
			})
			.catch(err => {
				console.log(err);
			});
		return model;
	};
	//public readonly save = (model: T): T => this.repository.createOrUpdate(model);

	public readonly findAllByType = (type: T['type']): T[] => {
		if (!this.isAppOnline) {
			const transactions = this.repository.findAll().filter(transaction => transaction.type === type);
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
		} else {
			let result = this.client.get(`/Transactions/findAllByType/${type}`);
			result
				.then(res => {
					console.log(res.data);
					const r = res.data as Transaction[];
					return r;
				})
				.catch(err => {
					console.log(err);
					return [];
				});
		}
		return [];
	};

	public readonly getBalanceByType = (type: T['type']): number =>
		this.findAllByType(type).reduce((acc, transaction) => acc + transaction.amount, 0);

	public readonly deleteById = (id: number): void => this.repository.deleteById(id);
}
