import { Transaction } from '../types';
import { HttpService } from './HttpService';
import { LocalStorageService } from './LocalStorageService';

export class TransactionService extends LocalStorageService<Transaction> {
	protected key = 'transactions';
	protected apiBaseUrl = 'transactions';
	protected isAppOnline = window.navigator.onLine;

	public readonly save = (model: Transaction): Transaction => {
		if (!this.isAppOnline) return this.createOrUpdate(model);

		const httpService = new HttpService();
		let result = httpService.post('/Transactions', model);
		result
			.then(res => {
				console.log('Transactions added successful.');
				console.log(res);
				this.createOrUpdate(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	};

	public readonly findAllByType = (type: Transaction['type']): Transaction[] => {
		if (!this.isAppOnline) {
			const transactions = this.findAll().filter(transaction => transaction.type === type);
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
			const httpService = new HttpService();
			let result = httpService.get(`/Transactions/findAllByType/${type}`);
			result
				.then(res => {
					console.log(res.data);
					const r = res.data as Transaction[];
					console.log(r);
					return r;
				})
				.catch(err => {
					console.log(err);
					return [];
				});
		}
	};

	public readonly getBalanceByType = (type: Transaction['type']): number =>
		this.findAllByType(type).reduce((acc, transaction) => acc + transaction.amount, 0);
}
