import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Paper, styled, Typography } from '@mui/material';
import { lowerCase, truncate, upperCase } from 'lodash';
import { useContext } from 'react';

import variables from '../../../../styles/variables.module.scss';
import { actions, Context, setCurrentTransaction } from '../../../context/Context';
import { Transaction } from '../../../types';

const EmptyCard = styled(Paper)({
	backgroundColor: variables.secondaryFaded4,
	height: 100,
	textAlign: 'center',
});

export const TransactionList = ({ transactions }: { transactions: Transaction[] }) => {
	if (!transactions.length) {
		return (
			<Grid container alignItems="center" justifyContent="space-between" sx={{ pb: 13, px: 1, rowGap: 2 }}>
				<Grid item xs={12} sm={12} md={12}>
					<EmptyCard variant="outlined" elevation={0}>
						<Typography component="div" variant="subtitle1" sx={{ p: 0, pt: 4 }}>
							no transactions added yet
						</Typography>
					</EmptyCard>
				</Grid>
			</Grid>
		);
	}

	const { dispatch } = useContext(Context);

	const openTransactionModal = (transaction: Transaction) => {
		dispatch({ data: true, type: actions.SET_IS_TRANSACTION_MODAL_OPENED });
		dispatch(setCurrentTransaction(transaction));
	};

	return (
		<Grid container spacing={2} alignItems="center" justifyContent="flex-start" sx={{ px: 1 }}>
			{transactions.map(transaction => (
				<Grid
					item
					xs={12}
					sm={6}
					md={6}
					lg={4}
					xl={3}
					key={`${transaction.type}-transaction-${transaction.id}`}
				>
					<CardActionArea
						onClick={() => {
							openTransactionModal(transaction);
						}}
					>
						<Card variant="outlined" sx={{ display: 'flex', flexDirection: 'row', width: 'inherit' }}>
							<CardMedia
								component="img"
								sx={{ height: '16%', mb: 1, ml: 1, mt: 1.3, width: '16%' }}
								image={`/images/${transaction.category}.svg`}
								alt={transaction.category}
							/>
							<Box sx={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
								<CardContent sx={{ flex: '1 0 auto' }}>
									<Typography component="div" variant="subtitle1">
										{upperCase(transaction.category)}
									</Typography>
									{transaction.description && (
										<Typography variant="subtitle2" color="text.secondary" component="div">
											{lowerCase(truncate(transaction.description, { length: 15 }))}
										</Typography>
									)}
								</CardContent>
							</Box>
							<Box sx={{ flexGrow: 1 }} />
							<Box sx={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
								<CardContent sx={{ textAlign: 'right' }}>
									<Typography component="div" sx={{ fontWeight: 'bold' }}>
										{new Intl.NumberFormat('en-CA', {
											currency: 'CAD',
											style: 'currency',
										}).format(transaction.amount)}
									</Typography>
									<Typography variant="subtitle2" color="text.secondary" component="div">
										{new Intl.DateTimeFormat('en-CA').format(new Date(transaction.createdAt))}
									</Typography>
								</CardContent>
							</Box>
						</Card>
					</CardActionArea>
				</Grid>
			))}
		</Grid>
	);
};
