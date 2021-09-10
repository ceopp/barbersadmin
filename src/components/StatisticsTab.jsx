import React from 'react'
import StatisticsTabLine from './StatisticsTabLine'
import Card from './common/Card'
import useTrans from '../hooks/trans'


export default function StatisticsTab({ order, chat, loading }) {
    const t = useTrans()
    return (
        <Card>
            <div className="title is-5 has-text-centered">
                {t('countOrder')}
            </div>

            <StatisticsTabLine
                orderData={order}
                chatData={chat}
                loading={loading} />
        </Card>
    )
}
