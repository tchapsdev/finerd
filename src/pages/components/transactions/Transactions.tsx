import useSWR from 'swr';
import { useContext } from 'react';

import { Context } from '../../context/Context';
import { Cards } from './cards/Cards';
import { Chart } from './chart/Chart';

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
            <Cards transactions={transactions}/>
        </>
    );
};
