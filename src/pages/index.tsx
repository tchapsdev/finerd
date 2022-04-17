import { Box, Container, Grid } from '@mui/material';
import React, { useReducer } from 'react';

import { SignInModal } from '../components/account/modal/SignInModal';
import { SignUpModal } from '../components/account/modal/SignUpModal';
import { Navbar } from '../components/navbar/Navbar';
import { Panel } from '../components/panels/Panel';
import { TransactionModal } from '../components/transactions/modal/TransactionModal';
import { Transactions } from '../components/transactions/Transactions';
import { ContextProvider, contextReducer, initialState } from '../context/Context';
import { AuthorizationService } from '../service/AuthorizationService';

export const Main = () => {
	const [state, dispatch] = useReducer<any>(contextReducer, initialState);
	const isLoading: boolean = (state as any).isLoading;

	const currentPanel: number = (state as any).currentPanel;
	const supportedTransactions = (state as any).supportedTransactions;
	// Set token globally for app
	const authService = new AuthorizationService();
	authService.getToken();

	return (
		<ContextProvider value={{ dispatch, state }}>
			<Container maxWidth={false} disableGutters={true}>
				<Box sx={{ flexGrow: 1 }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Navbar />
						</Grid>
						<Grid item xs={12}>
							<Panel value={currentPanel} index={currentPanel}>
								<Transactions type={supportedTransactions[currentPanel]} isLoading={isLoading} />
							</Panel>
						</Grid>
						<Grid item xs={12}>
							<TransactionModal isLoading={isLoading} />
						</Grid>
						<Grid item xs={12}>
							<SignInModal />
						</Grid>
						<Grid item xs={12}>
							<SignUpModal />
						</Grid>
					</Grid>
				</Box>
			</Container>
		</ContextProvider>
	);
};

export default Main;

// Push notification
const connection = new signalR.HubConnectionBuilder()
	.withUrl('https://finerd-api.tchapssolution.com/finerdHub', {
		accessTokenFactory: () => window.access_token,
		withCredentials: false,
	})
	.build();

connection.on('ReceiveMessage', (user: string, message: string) => {
	console.log(`${user}:  ${message}`);
	console.log(window.navigator.onLine);
});

connection.start().catch(err => console.log(err));


