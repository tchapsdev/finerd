export const supportedExpenses = ['clothing', 'fun', 'food', 'transport', 'utilities', 'other'] as const;

export const supportedSavingAccounts = ['rrsp', 'saving', 'tfsa', 'other'] as const;

export const supportedIncomeSources = ['bonus', 'commission', 'dividend', 'salary', 'other'] as const;

export const supportedTransactions = ['expense', 'income', 'saving'] as const;

export const supportedCategories = {
	expense: supportedExpenses,
	income: supportedIncomeSources,
	saving: supportedSavingAccounts,
} as const;
