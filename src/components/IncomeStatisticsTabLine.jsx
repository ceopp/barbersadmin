import React from 'react'
import map from 'lodash/map'
import Line from './common/Line'
import { getDay } from '../utils/date'

export default function IncomeStatisticsTabLine({ orderData, loading }) {
    return (
        <div>
            <Line
                loading={loading}
                type="line"
                height="25rem"
                data={{
                    labels: orderData ? orderData.map((item) => getDay(item.day)) : [],
                    datasets: [
                        {
                            data: orderData ? map(orderData, 'incomeAmount') : [],
                            backgroundColor: '#fff000',
                            fill: false,
                            borderColor: '#fff000',
                            label: 'Доход',
                        },
                        {
                            data: orderData ? map(orderData, 'averagePrice') : [],
                            backgroundColor: '#FF3333',
                            fill: false,
                            borderColor: '#FF3333',
                            label: 'Средняя цена заказа',
                        },
                    ],
                }}
                options={{
                    legend: { position: 'bottom' },
                    animation: {
                        animateScale: true,
                        animateRotate: true,
                    },
                    plugins: {
                        datalabels: {
                            color: 'black',
                            font: { weight: 'bold' },
                        },
                    },
                }} />
        </div>
    )
}
