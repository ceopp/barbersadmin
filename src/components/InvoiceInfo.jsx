import React from 'react'
import { useLoad } from '../hooks/request'
import { SHOP_INVOICE } from '../urls'
import { getDateTime } from '../utils/date'
import Button from './common/Button'
import Table from './common/Table'
import useTrans from '../hooks/trans'

export default function InvoiceInfo({ onCancel, item }) {
    const shopInvoice = useLoad({
        url: SHOP_INVOICE,
        params: { invoice: item.id },
    })
    const t = useTrans()

    return (
        <div>
            <table className="table is-striped is-fullwidth">
                <tbody>
                    <tr>
                        <td>ID:</td>
                        <td>{item.id}</td>
                    </tr>
                    <tr>
                        <td>{t('createAt')}:</td>
                        <td>{getDateTime(item.createdAt)}</td>
                    </tr>
                    <tr>
                        <td>{t('price')}:</td>
                        <td>${item.price}</td>
                    </tr>
                </tbody>
            </table>

            <Table
                items={shopInvoice.response ? shopInvoice.response.results : []}
                columns={{
                    id: 'ID',
                    shop: t('shopSingular'),
                    period: t('period'),
                }}
                loading={shopInvoice.loading}
                renderItem={(shopInvoiceItem) => (
                    <tr key={shopInvoiceItem.id}>
                        <td>{shopInvoiceItem.id}</td>
                        <td>{shopInvoiceItem.shop}</td>
                        <td>{shopInvoiceItem.period}</td>
                    </tr>
                )} />

            <Button
                onClick={onCancel}
                icon="close-outline"
                className="is-danger"
                text={t('close')} /> &nbsp;

        </div>
    )
}
