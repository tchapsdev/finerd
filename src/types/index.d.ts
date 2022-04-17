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

declare type Account = {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
	showPassword: boolean;
};

declare type AuthToken = {
	accessToken: string;
	refreshToken: string;
	createdAt: Date;
	updatedAt?: Date;
	deletedAt?: Date;
	id: number;
};

declare global {
	interface Window {
		access_token: any;
	}
}
