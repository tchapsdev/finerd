import { Transaction } from '../types';
import { ModelRepository } from './Repository/ModelRepository';

export class TransactionService<T extends Transaction> {
	protected key = 'transactions';
	protected repository: ModelRepository<T>;

	constructor() {
		this.repository = new ModelRepository<T>(this.key);
	}

	public readonly save = (model: T): T => this.repository.createOrUpdate(model);

	public readonly findAllByType = (type: T['type']): T[] => {
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
	};

	public readonly getBalanceByType = (type: T['type']): number =>
		this.findAllByType(type).reduce((acc, transaction) => acc + transaction.amount, 0);

	public readonly deleteById = (id: number): void => this.repository.deleteById(id);
}
