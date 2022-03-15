import {
    supportedExpenses,
    supportedIncomeSources,
    supportedPaymentMethods,
    supportedSavingAccounts,
    supportedTransactions
} from 'src/constants';

export type Expense = typeof supportedExpenses[number];
export type Saving = typeof supportedSavingAccounts[number];
export type Income = typeof supportedIncomeSources[number];

export type Category = Expense | Saving | Income;
export type TransactionType = typeof supportedTransactions[number];
export type PaymentMethod = typeof supportedPaymentMethods[number];

declare type Transaction = {
    id: number;
    amount: number;
    category: Category;
    description?: string;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    photo?: string;
    paymentMethod: PaymentMethod;
    type: TransactionType;
};

declare type User = {
    transactions: Transaction[];
};
