import { createContext } from 'react';
import { Transaction, User } from '../../types/@finerd';

export const actions = {
    SET_CURRENT_TRANSACTION: 'set-current-transaction',
    SET_CURRENT_USER: 'set-current-user',
    SET_CURRENT_PANEL: 'set-current-panel',
    SET_IS_LOADING: 'set-is-loading',
    SET_STATS_EXPANDED: 'set-stats-expanded',
} as const;

declare type ActionKeys = keyof typeof actions;
declare type ActionValues = typeof actions[ActionKeys];

declare type Action = {
    type: ActionValues;
    data: any;
};

declare type ContextStore = {
    currentTransaction?: Transaction;
    currentUser?: User;
    currentPanel?: number;
    isLoading?: boolean;
    isStatsExpanded?: boolean;
    readonly supportedTransactions: Transaction['type'][];
};

export const Context = createContext<any>({});

export const initialState: ContextStore = {
    currentPanel: 0,
    isLoading: false,
    isStatsExpanded: false,
    supportedTransactions: ['expense', 'saving', 'income'],
};

export const contextReducer = (state: ContextStore, action: Action) => {
    switch (action.type) {
        case actions.SET_CURRENT_TRANSACTION:
            return { ...state, currentTransaction: action.data };
        case actions.SET_CURRENT_USER:
            return { ...state, currentUser: action.data };
        case actions.SET_CURRENT_PANEL:
            return { ...state, currentPanel: action.data };
        case actions.SET_IS_LOADING:
            return { ...state, isLoading: action.data };
        case actions.SET_STATS_EXPANDED:
            return { ...state, isStatsExpanded: action.data };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

export const setCurrentTransaction = (data: Transaction) => ({
    type: actions.SET_CURRENT_TRANSACTION,
    data,
});

export const setCurrentUser = (data: User) => ({
    type: actions.SET_CURRENT_USER,
    data,
});

export const ContextProvider = Context.Provider;
export const ContextConsumer = Context.Consumer;
