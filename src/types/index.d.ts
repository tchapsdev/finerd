import {
	supportedExpenses,
	supportedIncomeSources,
	supportedSavingAccounts,
	supportedTransactions,
} from '../constants';

declare type Expense = typeof supportedExpenses[number];
declare type Saving = typeof supportedSavingAccounts[number];
declare type Income = typeof supportedIncomeSources[number];

declare type Category = Expense | Saving | Income;
declare type TransactionType = typeof supportedTransactions[number];

declare type Transaction = {
	id: number;
	amount: number;
	category: Category;
	description?: string;
	createdAt: Date;
	updatedAt?: Date;
	deletedAt?: Date;
	photo?: string;
	type: TransactionType;
};

declare type User = {
	transactions: Transaction[];
};
