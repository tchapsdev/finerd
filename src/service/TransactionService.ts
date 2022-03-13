import { LocalService } from './LocalService';
import { Transaction } from '../../types/@finerd';

export class TransactionService extends LocalService<Transaction> {
    protected key = 'transactions';

    public readonly save = (model: Transaction): Transaction => this.createOrUpdate(model);

    public readonly findAllByType = (type: Transaction['type']): Transaction[] =>
        this.findAll().filter(transaction => transaction.type === type);
}
