import { Transaction } from '../types';
import { LocalStorageService } from './LocalStorageService';

export class TransactionService extends LocalStorageService<Transaction> {
	protected key = 'transactions';

	public readonly save = (model: Transaction): Transaction => this.createOrUpdate(model);

	public readonly findAllByType = (type: Transaction['type']): Transaction[] => {
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
	};

	public readonly getBalanceByType = (type: Transaction['type']): number =>
		this.findAllByType(type).reduce((acc, transaction) => acc + transaction.amount, 0);
}
