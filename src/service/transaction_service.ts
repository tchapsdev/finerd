import { Transaction } from '../model/transaction';
import { LocalService } from './local_service';

export class TransactionService extends LocalService {
    transaction_key = 'transactions';
    category_key = 'categories';

    public save(model: Transaction) {
        this.save_Item(this.transaction_key, model);
    }

    public get(id: number) {
        return this.get_Item_by_id(this.transaction_key, id);
    }

    public getAll() {
        return this.get_Items(this.transaction_key);
    }

    public delete(id: number) {
        this.delete_Item_by_id(this.transaction_key, id);
    }
}
