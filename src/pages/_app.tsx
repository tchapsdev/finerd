import '../../styles/globals.scss';

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	ImageList,
	ImageListItem,
} from '@mui/material';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import variables from '../../styles/variables.module.scss';

const WEB_PUSH_PUBLIC_KEY =
	'BMNs4Y5ccZ4fqqXyWRDF2kPJ25IXmxoFsHvdB5oZXj7kxBzil58gV4V1lT-HB2lp4L8Ugpgl4Dk6NKppzJeR82I' as const;
const WEP_PUSH_ENDPOINT = 'https://finerd-api.tchapssolution.com/api/PushNotifications/subscriptions' as const;

export const App = ({ Component, pageProps }: AppProps) => {
	const [isSubscribed, setIsSubscribed] = useState(false);
	const [subscription, setSubscription] = useState(null);
	const [registration, setRegistration] = useState(null);
	const [openSubscriptionDialog, setOpenSubscriptionDialog] = useState(isSubscribed);

	useEffect(() => {
		if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
			let hasSubscription = !!localStorage.getItem('isSubscribed');

			navigator.serviceWorker.ready.then(reg => {
				reg.pushManager.getSubscription().then(sub => {
					hasSubscription = hasSubscription || sub !== null;
					if (sub) {
						setSubscription(sub);
						setIsSubscribed(true);
					}
				});
				setRegistration(reg);
			});

			setOpenSubscriptionDialog(!hasSubscription);
		}
	}, []);

	const handleSubscribe = async event => {
		event.preventDefault();

		try {
			const sub = await registration.pushManager.subscribe({
				applicationServerKey: WEB_PUSH_PUBLIC_KEY,
				userVisibleOnly: true,
			});

			const res = await fetch(WEP_PUSH_ENDPOINT, {
				body: JSON.stringify(sub),
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
			});

			if (!res.ok) {
				throw new Error('Failed to store the Push Notifications subscription on server');
			}

			setSubscription(sub);
			setIsSubscribed(true);
			setOpenSubscriptionDialog(false);
			localStorage.setItem('isSubscribed', 'true');
		} catch (error) {
			console.error('Error subscribing to push notifications', error);
			await handleUnsubscribe(event);
		}
	};

	const handleUnsubscribe = async event => {
		event.preventDefault();

		if (!subscription) {
			setOpenSubscriptionDialog(false);
			return;
		}

		try {
			await subscription.unsubscribe();
			await fetch(WEP_PUSH_ENDPOINT + `?endpoint=${encodeURIComponent(subscription.endpoint)}`, {
				headers: { 'Content-Type': 'application/json' },
				method: 'DELETE',
			});

			setSubscription(null);
			setIsSubscribed(false);
		} catch (error) {
			console.error('Error unsubscribing from push notifications', error);
		} finally {
			setOpenSubscriptionDialog(false);
		}
	};

	const handleCloseSubscriptionDialog = () => {
		setOpenSubscriptionDialog(false);
	};

	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
				/>
				<meta name="description" content="Personal finance application" />
				<meta name="keywords" content="finerd,finance,budget" />
				<title>finerd</title>
				<link rel="manifest" href="/manifest.json" />
				<link href="/icons/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
				<link href="/icons/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
				<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"></link>
				<meta name="theme-color" content="#4eccc4" />
			</Head>
			<Component {...pageProps} />
			<Dialog
				open={openSubscriptionDialog}
				onClose={handleCloseSubscriptionDialog}
				aria-labelledby="subscription-dialog-title"
				aria-describedby="subscription-dialog-description"
			>
				<DialogTitle id="subscription-dialog-title">
					<IconButton edge="start" color="inherit" sx={{ fontSize: 'inherit', pt: 0 }}>
						<ImageList sx={{ minWidth: '70px', width: '70px' }} cols={1}>
							<ImageListItem>
								<img src={'/images/logo-cropped.svg'} alt="logo" loading="lazy" />
							</ImageListItem>
						</ImageList>
					</IconButton>
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="subscription-dialog-description">
						Please consider subscribing to push notifications.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button disableFocusRipple onClick={handleUnsubscribe} sx={{ color: variables.secondary }}>
						Cancel
					</Button>
					<Button
						autoFocus
						disableFocusRipple
						onClick={handleSubscribe}
						sx={{ color: variables.primaryDark }}
					>
						Subscribe
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default App;
