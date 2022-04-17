import { Paper, Typography } from '@mui/material';
import dynamic from 'next/dynamic';

import { Transaction, TransactionType } from '../../../types';
import { config, emptyChartConfig } from './Config';

/**
 * By default, Next.js pre-renders every page.
 * This means that Next.js generates HTML for each page in advance, instead of having it all done by client-side JavaScript.
 * Pre-rendering can result in better performance and SEO.
 *
 * Each generated HTML is associated with minimal JavaScript code necessary for that page.
 * When a page is loaded by the browser, its JavaScript code runs and makes the page fully interactive.
 * (This process is called hydration.)
 *
 * Next.js supports ES2020 dynamic import() for JavaScript.
 * With it, you can import JavaScript modules dynamically and work with them.
 *
 * React components can also be imported using dynamic imports,
 * but in this case we use it in conjunction with next/dynamic to make sure it works like any other React Component.
 *
 * In this instance, dynamic import is used with ssr disable to prevent next js from pre-rendering the component.
 * Thus allows its execution by the client.
 *
 * @link https://nextjs.org/docs/basic-features/pages#pre-rendering
 * @link https://nextjs.org/docs/advanced-features/dynamic-import
 */
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export const Chart = ({ transactions, type: name }: { transactions: Transaction[]; type: TransactionType }) => {
	const data = transactions.map((transaction: Transaction) => ({
		x: transaction.createdAt.toISOString(),
		y: transaction.amount,
	}));

	const balance = transactions.length ? transactions.reduce((acc, transaction) => acc + transaction.amount, 0) : 0;
	config.series = [{ data, name }];

	return (
		<>
			<Typography variant="h2" align="center" sx={{ fontWeight: 'bold' }}>
				{new Intl.NumberFormat('en-CA', { currency: 'CAD', style: 'currency' }).format(balance)}
			</Typography>
			<Paper elevation={0}>
				{!transactions.length && <ReactApexChart {...emptyChartConfig} />}
				{transactions.length > 0 && <ReactApexChart {...config} />}
			</Paper>
		</>
	);
};
