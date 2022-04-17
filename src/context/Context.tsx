import { createContext } from 'react';

import { supportedTransactions } from '../constants';
import { Transaction } from '../types';

export const actions = {
	SET_CURRENT_PANEL: 'set-current-panel',
	SET_CURRENT_TRANSACTION: 'set-current-transaction',
	SET_IS_LOADING: 'set-is-loading',
	SET_IS_SIGNED_IN: 'set-is-signed-in',
	SET_IS_SIGN_IN_MODAL_OPENED: 'set-is-sign-in-modal-opened',
	SET_IS_SIGN_UP_MODAL_OPENED: 'set-is-sign-up-modal-opened',
	SET_IS_TRANSACTION_MODAL_OPENED: 'set-is-transaction-modal-opened',
} as const;

declare type ActionKeys = keyof typeof actions;
declare type ActionValues = typeof actions[ActionKeys];

declare type Action = {
	type: ActionValues;
	data: any;
};

declare type ContextStore = {
	currentTransaction?: Transaction;
	currentPanel?: number;
	isLoading?: boolean;
	isSignedIn?: boolean;
	isSignInModalOpened?: boolean;
	isSignUpModalOpened?: boolean;
	isTransactionModalOpened?: boolean;
	supportedTransactions: Readonly<Transaction['type'][]>;
};

export const Context = createContext<any>({});

export const initialState: ContextStore = {
	currentPanel: 0,
	isLoading: false,
	isSignInModalOpened: false,
	isSignUpModalOpened: false,
	isSignedIn: false,
	isTransactionModalOpened: false,
	supportedTransactions,
};

export const contextReducer = (state: ContextStore, action: Action) => {
	switch (action.type) {
		case actions.SET_CURRENT_TRANSACTION:
			return { ...state, currentTransaction: action.data };
		case actions.SET_CURRENT_PANEL:
			return { ...state, currentPanel: action.data };
		case actions.SET_IS_LOADING:
			return { ...state, isLoading: !!action.data };
		case actions.SET_IS_SIGNED_IN:
			return { ...state, isLoading: !state.isLoading, isSignedIn: !!action.data };
		case actions.SET_IS_SIGN_IN_MODAL_OPENED:
			return { ...state, isSignInModalOpened: !!action.data };
		case actions.SET_IS_SIGN_UP_MODAL_OPENED:
			return { ...state, isSignUpModalOpened: !!action.data };
		case actions.SET_IS_TRANSACTION_MODAL_OPENED:
			return { ...state, isTransactionModalOpened: !!action.data };
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};

export const setCurrentTransaction = (data: Transaction) => ({
	data,
	type: actions.SET_CURRENT_TRANSACTION,
});

export const ContextProvider = Context.Provider;
