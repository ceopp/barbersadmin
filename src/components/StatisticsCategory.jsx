import React from 'react'
import { useParams } from 'react-router-dom'
import { useLoad } from '../hooks/request'
import { STATISTICS_CATEGORY, STATISTICS_ORDER_PRODUCT } from '../urls'
import StatisticsCategoryLine from './StatisticsCategoryLine'
import Card from './common/Card'
import StatisticsOrderProductLine from './StatisticsOrderProductLine'
import useTrans from '../hooks/trans'


export default function StatisticsCategory({ startDate, endDate, shop }) {
    const params = useParams()
    const t = useTrans()
    const category = useLoad({
        url: STATISTICS_CATEGORY.replace('{shopId}', shop),
        params: { startDate, endDate, shop: params.shopId, parent: params.parent },
    }, [startDate, endDate])

    const orderProduct = useLoad({
        url: STATISTICS_ORDER_PRODUCT.replace('{shopId}', shop),
        params: { startDate, endDate, shop: params.shopId },
    }, [startDate, endDate])

    return (
        <div className="columns is-mobile">
            <div className="column is-6">
                <Card>
                    <div className="title is-5 has-text-centered">
                        {t('category')}
                    </div>

                    <StatisticsCategoryLine
                        data={category.response ? category.response : []}
                        loading={category.loading}
                        field="productAmount" />
                </Card>
            </div>

            <div className="column is-6">
                <Card>
                    <div className="title is-5 has-text-centered">
                        {t('order')}
                    </div>

                    <StatisticsOrderProductLine
                        data={orderProduct.response ? orderProduct.response : []}
                        loading={orderProduct.loading}
                        field="orderProductCount" />
                </Card>
            </div>
        </div>
    )
}
