import React, { useContext, useState } from 'react'
import Table from '../components/common/Table'
import { useLoad } from '../hooks/request'
import { ORDER_LIST } from '../urls'
import OrderItem from '../components/OrderItem'
import OrderPromocodeTabs from '../components/OrderPromocodeTabs'
// eslint-disable-next-line import/named,import/no-cycle
import useTrans from '../hooks/trans'
import { ShopContext } from '../components/SidebarShop'


export default function Order() {
    const t = useTrans()
    const [page, setPage] = useState(1)
    const { shop } = useContext(ShopContext)
    const orders = useLoad({
        url: ORDER_LIST.replace('{shopId}', shop.id),
        params: { page },
    }, [page])

    return (
        <div>
            <OrderPromocodeTabs />

            <div className="box">
                <Table
                    totalCount={orders.response ? orders.response.count : 0}
                    onPageChange={setPage}
                    loading={orders.loading}
                    activePage={page}
                    emptyMessageColor={orders.error.data && orders.error.data.paid ? 'has-text-danger' : ''}
                    emptyMessage={orders.error.data && orders.error.data.paid ? t('notPayed') : t('noOrder')}
                    items={orders.response ? orders.response.results : []}
                    columns={{
                        id: 'ID',
                        date: t('createAt'),
                        person: t('person'),
                        status: t('status'),
                        price: t('sum'),
                        paid: t('statusType'),
                        paymentType: t('paymentType'),
                        actions: '',
                    }}
                    renderItem={(item) => (
                        <OrderItem
                            orders={orders.response ? orders.response.results : []}
                            key={item.id}
                            loading={orders.loading}
                            onSuccess={orders.request}
                            shop={shop}
                            onDelete={orders.request}
                            item={item} />
                    )} />
            </div>
        </div>
    )
}
