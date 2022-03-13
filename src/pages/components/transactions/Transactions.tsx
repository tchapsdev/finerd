import useSWR from 'swr';
import { useContext } from 'react';

import { Chart } from './chart/Chart';
import { TransactionList } from './list/TransactionList';

import { Context } from '../../context/Context';

export const Transactions = ({ type }) => {
    const {
        state: { transactionService },
        // dispatch,
    } = useContext(Context);

    const { data } = useSWR('transactions', transactionService.getAll);
    const transactions = data?.filter((transaction) => transaction.type === type);

    return (
        <>
            <Chart />
            <TransactionList transactions={transactions}/>
        </>
    );
};
