import { Paper } from '@mui/material';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Props } from 'react-apexcharts';

import { Transaction, TransactionType } from '../../../../types/@finerd';
import { TransactionService } from '../../../service/TransactionService';

export const config: Props = {
    options: {
        chart: {
            id: 'transactions-chart',
            sparkline: {
                enabled: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: 1,
        },
        tooltip: {
            fixed: {
                enabled: false,
            },
            marker: {
                show: false,
            },
            x: {
                show: false,
            },
            y: {
                title: {
                    formatter: (name: string) => name,
                },
            },
        },
    },
    series: [],
    type: 'area',
};

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const map: Record<TransactionType, TransactionType> = {
    expense: 'income',
    income: 'saving',
    saving: 'expense',
};

export const Chart = ({ transactions, type }: { transactions: Transaction[]; type: TransactionType }) => {
    const [targetTransactions, setTargetTransactions] = useState([]);

    useEffect(() => {
        const transactionService = new TransactionService();
        setTargetTransactions(transactionService.findAllByType(map[type]));
    }, [type, map]);

    config.series = [
        {
            data: transactions.map(transaction => transaction.amount),
            name: type,
        },
        {
            data: targetTransactions.map(transaction => transaction.amount),
            name: map[type],
        },
    ];

    return (
        <Paper elevation={0}>
            <ReactApexChart {...config} />
        </Paper>
    );
};
