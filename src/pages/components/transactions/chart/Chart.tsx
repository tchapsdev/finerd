import { Props } from 'react-apexcharts';
import { Card } from '@mui/material';
import dynamic from 'next/dynamic';

export const config: Props = {
    type: 'area',
    height: 150,
    options: {
        chart: {
            id: 'transactions-chart',
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 1
        },
        tooltip: {
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: (seriesName: string) => `Transactions ${seriesName} `
                }
            },
            marker: {
                show: false
            }
        }
    },
    series: [
        {
            data: [0, 15, 10, 50, 30, 40, 25]
        },
        {
            data: [2, 13, 4, 35, 13, 45, 35]
        }
    ]
};

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export const Chart = () => {
    // todo: add chart data from props
    return (
        <Card>
            <ReactApexChart {...config} />
        </Card>
    );
};
