import React from 'react'
import { useModal } from '../hooks/modal'
import { getDateTime } from '../utils/date'
import InvoiceInfo from './InvoiceInfo'
import useTrans from '../hooks/trans'

export default function InvoiceItem({ item, onReload }) {
    const [showInvoiceModal, hideInvoiceModal] = useModal(
        <InvoiceInfo
            onSuccess={() => {
                hideInvoiceModal()
                onReload()
            }}
            onCancel={() => hideInvoiceModal()}
            item={item} />,
    )
    const t = useTrans()

    return (
        <tr>
            <td onClick={showInvoiceModal} className="pointer">{item.id}</td>
            <td onClick={showInvoiceModal} className="pointer">{getDateTime(item.createdAt)}</td>
            <td onClick={showInvoiceModal} className="pointer">${item.price}</td>

            <td className="has text-right">
                {!item.isPayed ? (
                    <a
                        className="button is-success"
                        href={item.payUrl}>
                        {t('pay')}
                    </a>
                ) : <p className="has-text-success">{t('paid')}</p>}
            </td>
        </tr>
    )
}
