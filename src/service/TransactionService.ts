import { LocalStorageService } from './LocalStorageService';
import { Transaction } from '../../types/@finerd';

export class TransactionService extends LocalStorageService<Transaction> {
    protected key = 'transactions';

    public readonly save = (model: Transaction): Transaction => this.createOrUpdate(model);

    public readonly findAllByType = (type: Transaction['type']): Transaction[] =>
        this.findAll().filter(transaction => transaction.type === type);
}
