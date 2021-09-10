import React from 'react'
import map from 'lodash/map'
import Chart from './common/Chart'
import { colors } from '../utils/colors'
import StatisticsEmptyPieChart from './StatisticsEmptyPieChart'

export default function StatisticsOrderProductLine({ data, field, loading }) {
    if (!data.some((item) => item[field] !== 0) && !loading) {
        return <StatisticsEmptyPieChart />
    }

    return (
        <Chart
            loading={loading}
            type="doughnut"
            height="500px"
            data={{
                labels: data ? map(data, 'name') : [],
                datasets: [{
                    data: data ? map(data, field) : [],
                    backgroundColor: colors,
                }],
            }}
            options={{
                legend: { position: 'bottom' },
                animation: {
                    animateScale: true,
                    animateRotate: true,
                },
                plugins: {
                    datalabels: {
                        color: '#fff',
                        font: { weight: 'bold' },
                    },
                },
            }} />
    )
}
