import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import OrderToFargo from './OrderToFargo'
import Table from './common/Table'
import Button from './common/Button'
import { ORDER_PRODUCT_LIST } from '../urls'
import { useLoad } from '../hooks/request'
import useTrans from '../hooks/trans'
import { currencies, currency } from '../utils/currency'


export default function OrderDetail({ onCancel, order, shop }) {
    const url = ORDER_PRODUCT_LIST.replace('{id}', order.id).replace('{shopId}', shop.id)
    const orderProduct = useLoad({ url })

    const [orderToFargo, setOrderToFargo] = useState(false)
    const t = useTrans()

    const cur = currencies.map((items) => ({ name: t(items.name), value: items.value }))

    return !orderToFargo ? (
        <Formik initialValues={{ status: order.status }}>
            <Form>
                <table className="table is-striped is-fullwidth">
                    <tbody>
                        <tr>
                            <td>{t('nameUser')}:</td>
                            <td><b>{order.person.name}</b></td>
                        </tr>

                        <tr>
                            <td>{t('phone')}:</td>
                            <td>{order.person.phone}</td>
                        </tr>

                        {order.promoCode.code ? (
                            <tr>
                                <td>{t('usedPromocode')}:</td>
                                <td>{order.promoCode.code}</td>
                            </tr>
                        ) : null}

                        {order.address ? (
                            <tr>
                                <td>{t('address')}:</td>
                                <td className="has-text-info">{order.address}</td>
                            </tr>
                        ) : null}

                        {order.address ? (
                            <tr>
                                <td>{t('deliveryPrice')}:</td>
                                <td>
                                    {order.deliveryPrice ? (
                                        `${order.deliveryPrice} ${currency(cur, shop.currency)}`
                                    ) : (t('freeDelivery'))}
                                </td>
                            </tr>
                        ) : null}

                        <tr>
                            <td>{t('paymentType')}:</td>
                            <td>{order.paymentType}</td>
                        </tr>
                    </tbody>
                </table>

                <Table
                    items={orderProduct.response ? orderProduct.response.results : []}
                    columns={{
                        product: t('product'),
                        price: t('price'),
                        description: t('description'),
                        count: t('amount'),
                        actions: '',
                    }}
                    loading={orderProduct.loading}
                    renderItem={(item) => (
                        <tr key={item.id}>
                            <td>{item.product.name}</td>
                            <td>{item.price}</td>
                            <td>{item.product.description}</td>
                            <td>{item.count}</td>
                        </tr>
                    )} /><br />

                <div className="columns">
                    <div className="column">
                        <Button
                            onClick={onCancel}
                            icon="close-outline"
                            className="is-danger"
                            text={t('close')} /> &nbsp;
                    </div>

                    <div className="column is-narrow">
                        <Button
                            onClick={() => setOrderToFargo(true)}
                            icon="boat-outline"
                            className="is-link"
                            text={t('transferFargo')} />
                    </div>
                </div>
            </Form>
        </Formik>
    ) : <OrderToFargo order={order} shop={shop} onCancel={() => setOrderToFargo(false)} />
}
