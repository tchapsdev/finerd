import { Props } from 'react-apexcharts';

import variables from '../../../../styles/variables.module.scss';

const formatter = (val: number): string =>
	new Intl.NumberFormat('en-CA', {
		currency: 'CAD',
		style: 'currency',
	}).format(val);

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
			background: {
				dropShadow: {
					enabled: false,
				},
				enabled: false,
			},
			distributed: true,
			enabled: true,
			formatter,
			offsetY: -5,
			textAnchor: 'start',
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
				formatter,
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

export const emptyChartConfig: Props = {
	height: '150%',
	options: {
		chart: {
			id: 'empty-transactions-chart',
			sparkline: {
				enabled: true,
			},
		},
		colors: [variables.primaryFaded2, variables.primaryFaded3],
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: 'smooth',
			width: 1,
		},
		subtitle: {
			align: 'center',
			floating: true,
			offsetY: 200,
			style: {
				color: variables.alertFaded1,
				fontSize: variables.baseFontSize,
			},
			text: 'add your first transaction',
		},
		tooltip: {
			enabled: false,
		},
	},
	series: [
		{
			data: [0, 0.05, 0.1, 0.12, 0.15, 0.12, 0.1, 0.05, 0],
			name: 'dummy',
		},
	],
	type: 'area',
};
