// import * as signalR from '@microsoft/signalr';
import { Box, Container, Grid } from '@mui/material';
import React, { useReducer } from 'react';

import { SignInDialog } from '../components/account/SignInDialog';
import { SignUpDialog } from '../components/account/SignUpDialog';
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
							<SignInDialog />
						</Grid>
						<Grid item xs={12}>
							<SignUpDialog />
						</Grid>
					</Grid>
				</Box>
			</Container>
		</ContextProvider>
	);
};

export default Main;

setTimeout(() => {
	let pushServiceWorkerRegistration;

	function registerPushServiceWorker() {
		navigator.serviceWorker
			.register('/sw.js', { scope: './' })
			.then(function (serviceWorkerRegistration) {
				pushServiceWorkerRegistration = serviceWorkerRegistration;
				subscribe();

				console.log('Push Service Worker has been registered successfully');
			})
			.catch(function (error) {
				console.log('Push Service Worker registration has failed: ' + error);
			});
	}

	registerPushServiceWorker();

	function subscribe() {
		pushServiceWorkerRegistration.pushManager
			.subscribe({
				applicationServerKey:
					'BMNs4Y5ccZ4fqqXyWRDF2kPJ25IXmxoFsHvdB5oZXj7kxBzil58gV4V1lT-HB2lp4L8Ugpgl4Dk6NKppzJeR82I',
				userVisibleOnly: true,
			})
			.then(function (pushSubscription) {
				fetch('https://finerd-api.tchapssolution.com/api/PushNotifications/subscriptions', {
					method: 'POST',
					body: JSON.stringify(pushSubscription),
					headers: { 'Content-Type': 'application/json' },
				})
					.then(function (response) {
						if (response.ok) {
							console.log('Successfully subscribed for Push Notifications');
						} else {
							console.log('Failed to store the Push Notifications subscription on server');
						}
					})
					.catch(function (error) {
						console.log('Failed to store the Push Notifications subscription on server: ' + error);
					});
			})
			.catch(function (error) {
				if (Notification.permission === 'denied') {
					console.log('denied');
				} else {
					console.log('Failed to subscribe for Push Notifications: ' + error);
				}
			});
	}

	self.addEventListener('push', function (event) {
		event.waitUntil(
			self.registration.showNotification('Demo.AspNetCore.PushNotifications', {
				body: event.data.text(),
				icon: '/images/push-notification-icon.png',
			})
		);
	});

	function unsubscribeFromPushNotifications() {
		pushServiceWorkerRegistration.pushManager.getSubscription().then(function (pushSubscription) {
			if (pushSubscription) {
				pushSubscription
					.unsubscribe()
					.then(function () {
						fetch(
							'https://finerd-api.tchapssolution.com/api/PushNotifications/subscriptions?endpoint=' +
								encodeURIComponent(pushSubscription.endpoint),
							{ method: 'DELETE' }
						)
							.then(function (response) {
								if (response.ok) {
									console.log('Successfully unsubscribed from Push Notifications');
								} else {
									console.log('Failed to discard the Push Notifications subscription from server');
								}
							})
							.catch(function (error) {
								console.log(
									'Failed to discard the Push Notifications subscription from server: ' + error
								);
							});
					})
					.catch(function (error) {
						console.log('Failed to unsubscribe from Push Notifications: ' + error);
					});
			}
		});
	}
}, 3000);
