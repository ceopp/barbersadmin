import React from 'react'
import IncomeStatisticsTabLine from './IncomeStatisticsTabLine'
import Card from './common/Card'
import useTrans from '../hooks/trans'


export default function IncomeStatisticsTab({ order, loading }) {
    const t = useTrans()

    return (
        <Card>
            <div className="title is-5 has-text-centered">
                {t('analyticsIncome')}
            </div>

            <IncomeStatisticsTabLine
                orderData={order}
                loading={loading} />
        </Card>
    )
}
