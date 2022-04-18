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

declare type AccountRequestBody = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
};

declare type AuthToken = {
	accessToken: string;
	refreshToken: string;
};

declare global {
	interface Window {
		access_token: any;
		workbox: any;
	}
}
