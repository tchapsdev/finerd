export const supportedExpenses = [
    'clothing',
    'food',
    'transport',
    'entertainment',
    'utilities',
    'other',
] as const;

export const supportedSavingAccounts = [
    'tfsa',
    'rrsp',
    'saving',
    'other',
] as const;

export const supportedIncomeSources = [
    'salary',
    'bonus',
    'commission',
    'dividend',
    'other',
] as const;

export const supportedTransactionTypes = [
    'expense',
    'saving',
    'income',
] as const;

export const supportedPaymentMethods = [
    'cash',
    'credit',
    'debit',
    'other',
] as const;

export type Expense = typeof supportedExpenses[number];
export type Saving = typeof supportedSavingAccounts[number];
export type Income = typeof supportedIncomeSources[number];

export type Category = Expense | Saving | Income;
export type TransactionType = typeof supportedTransactionTypes[number];
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
