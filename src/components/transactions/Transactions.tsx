import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';

import { TransactionType } from '../../../types/@finerd';
import { TransactionService } from '../../service/TransactionService';
import { Chart } from './chart/Chart';
import { TransactionList } from './list/TransactionList';

export const Transactions = ({ type, isLoading }: { type: TransactionType; isLoading: boolean }) => {
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		const transactionService = new TransactionService();
		setTransactions(transactionService.findAllByType(type));
	}, [type, isLoading]);

	return (
		<Grid container alignItems="flex-start" justifyContent="space-between" sx={{ rowGap: 3 }}>
			<Grid item xs={12} sm={12} md={12}>
				<Chart transactions={transactions} type={type} />
			</Grid>
			<Grid item xs={12} sm={12} md={12}>
				<TransactionList transactions={transactions} />
			</Grid>
		</Grid>
	);
};
