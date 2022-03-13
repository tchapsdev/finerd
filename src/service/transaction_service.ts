import { Transaction } from '../model/transaction';
import { LocalService } from './local_service';

class TransactionService extends LocalService {
    transaction_key = 'transactions';
    category_key = 'categories';

    public save(model: Transaction) {
        this.save_Item(this.transaction_key, model);
    }

    public get(id: number) {
        return this.get_Item_by_id(this.transaction_key, id);
    }

    public getAll() {
        return [
            {
                "id": "1",
                "type": "expense",
                "category": "other",
                "description": "achat telephone",
                "amount": 1200,
                "photo": "photo 1",
                "paymentMethod": "cash"
            },
            {
                "id": "2",
                "type": "saving",
                "category": "other",
                "description": "achat Carburant",
                "amount": 60,
                "photo": "photo 1",
                "paymentMethod": "cash"
            },
            {
                "id": "3",
                "type": "expense",
                "category": "other",
                "description": "new fruit",
                "amount": 360,
                "photo": "photo 1",
                "paymentMethod": "cash"
            }
        ];
    }

    public delete(id: number) {
        this.delete_Item_by_id(this.transaction_key, id);
    }

}

export default TransactionService
