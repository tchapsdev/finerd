import { useEffect, useState } from 'react';

import { Chart } from './chart/Chart';
import { TransactionList } from './list/TransactionList';

import { TransactionService } from '../../../service/TransactionService';

export const Transactions = ({ type }) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const transactionService = new TransactionService();
        setTransactions(transactionService.findAllByType(type));
    }, [type]);

    return (
        <>
            <Chart/>
            <TransactionList transactions={transactions}/>
        </>
    );
};
