import { Box, Container, Grid } from '@mui/material';
import React, { useReducer } from 'react';

import { Navbar } from '../components/navbar/Navbar';
import { Panel } from '../components/panels/Panel';
import { TransactionModal } from '../components/transactions/modal/TransactionModal';
import { Transactions } from '../components/transactions/Transactions';
import { ContextProvider, contextReducer, initialState } from '../context/Context';

export const Main = () => {
	const [state, dispatch] = useReducer<any>(contextReducer, initialState);
	const isLoading: boolean = (state as any).isLoading;

	const currentPanel: number = (state as any).currentPanel;
	const supportedTransactions = (state as any).supportedTransactions;

	return (
		<ContextProvider value={{ dispatch, state }}>
			<Container maxWidth={false} disableGutters={true}>
				<Box sx={{ flexGrow: 1 }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Navbar isLoading={isLoading} />
						</Grid>
						<Grid item xs={12}>
							<Panel value={currentPanel} index={currentPanel}>
								<Transactions type={supportedTransactions[currentPanel]} isLoading={isLoading} />
							</Panel>
						</Grid>
						<Grid item xs={12}>
							<TransactionModal isLoading={isLoading} />
						</Grid>
					</Grid>
				</Box>
			</Container>
		</ContextProvider>
	);
};

export default Main;
