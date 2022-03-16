import '../../styles/globals.scss';

import { AppProps } from 'next/app';
import Head from 'next/head';

export const App = ({ Component, pageProps }: AppProps) => (
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
			<meta name="theme-color" content="#317EFB" />
		</Head>
		<Component {...pageProps} />
	</>
);

export default App;
