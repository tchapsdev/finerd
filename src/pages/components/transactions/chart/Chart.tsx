import dynamic from 'next/dynamic';
import { Paper } from '@mui/material';
import { Props } from 'react-apexcharts';
import { useEffect, useState } from 'react';

import { Transaction, TransactionType } from '../../../../../types/@finerd';
import { TransactionService } from '../../../../service/TransactionService';

export const config: Props = {
    type: 'area',
    options: {
        chart: {
            id: 'transactions-chart',
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 1
        },
        tooltip: {
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: (name: string) => name
                }
            },
            marker: {
                show: false
            }
        }
    },
    series: []
};

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const map: Record<TransactionType, TransactionType> = {
    expense: 'income',
    saving: 'expense',
    income: 'saving'
};

export const Chart = ({ transactions, type }: { transactions: Transaction[], type: TransactionType }) => {
    const [targetTransactions, setTargetTransactions] = useState([]);

    useEffect(() => {
        const transactionService = new TransactionService();
        setTargetTransactions(transactionService.findAllByType(map[type]));
    }, [type, map]);

    config.series = [
        {
            name: type,
            data: transactions.map(transaction => transaction.amount)
        },
        {
            name: map[type],
            data: targetTransactions.map(transaction => transaction.amount)
        }
    ];

    return (
        <Paper elevation={0}>
            <ReactApexChart {...config} />
        </Paper>
    );
};
