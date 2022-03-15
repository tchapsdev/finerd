import { Transaction } from '../../types/@finerd';
import { LocalStorageService } from './LocalStorageService';

export class TransactionService extends LocalStorageService<Transaction> {
	protected key = 'transactions';

	public readonly save = (model: Transaction): Transaction => this.createOrUpdate(model);

	public readonly findAllByType = (type: Transaction['type']): Transaction[] =>
		this.findAll().filter(transaction => transaction.type === type);

	public readonly getBalanceByType = (type: Transaction['type']): number =>
		this.findAllByType(type).reduce((acc, transaction) => acc + transaction.amount, 0);
}
