import React from 'react'
import map from 'lodash/map'
import Line from './common/Line'
import { getDay } from '../utils/date'

export default function StatisticsTabLine({ orderData, loading, chatData }) {
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
                            data: orderData ? map(orderData, 'orderCount') : [],
                            backgroundColor: '#48c774',
                            fill: false,
                            borderColor: '#48c774',
                            label: 'Кол-во заказов',
                        },
                        {
                            data: chatData ? map(chatData, 'chatCount') : [],
                            backgroundColor: '#33BAFF',
                            fill: false,
                            borderColor: '#33BAFF',
                            label: 'Кол-во новых пользователей',
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
