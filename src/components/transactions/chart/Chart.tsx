import { Paper, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { Props } from 'react-apexcharts';

import variables from '../../../../styles/variables.module.scss';
import { Transaction, TransactionType } from '../../../types';

export const config: Props = {
	height: '150%',
	options: {
		chart: {
			id: 'transactions-chart',
			selection: {
				enabled: true,
			},
			sparkline: {
				enabled: false,
			},
			toolbar: {
				show: false,
			},
			width: '100%',
			zoom: {
				enabled: true,
			},
		},
		colors: ['#16dae0', '#4eccc4', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
		dataLabels: {
			enabled: false,
		},
		grid: {
			padding: {
				bottom: 0,
				left: 0,
				right: 0,
				top: 0,
			},
			position: 'back',
			show: false,
		},
		stroke: {
			curve: 'smooth',
			width: 1,
		},
		tooltip: {
			x: {
				show: false,
			},
			y: {
				formatter: (val: number): string =>
					new Intl.NumberFormat('en-CA', {
						currency: 'CAD',
						style: 'currency',
					}).format(val),
			},
		},
		xaxis: {
			type: 'datetime',
		},
		yaxis: {
			show: false,
		},
	},
	series: [],
	type: 'area',
};

const emptyChartConfig: Props = JSON.parse(JSON.stringify(config));

emptyChartConfig.options.chart.id = 'empty-transactions-chart';
emptyChartConfig.options.chart.sparkline.enabled = true;

emptyChartConfig.options.colors = [variables.primaryFaded2, variables.primaryFaded3];
emptyChartConfig.options.xaxis = undefined;

emptyChartConfig.series = [
	{
		data: [0, 0.05, 0.1, 0.12, 0.15, 0.12, 0.1, 0.05, 0],
		name: 'dummy',
	},
];

emptyChartConfig.options.subtitle = {
	align: 'center',
	floating: true,
	offsetY: 200,
	style: {
		color: variables.alertFaded1,
		fontSize: variables.baseFontSize,
	},
	text: 'add your first transaction',
};

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
