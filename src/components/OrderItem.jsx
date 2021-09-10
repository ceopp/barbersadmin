/* eslint-disable no-nested-ternary */
import React from 'react'
import cn from 'classnames'
import { useMessage } from '../hooks/message'
import { useModal } from '../hooks/modal'
import { paymentType } from '../utils/payment_type'
import OrderDetail from './OrderDetail'
import { getDateTime } from '../utils/date'
import Loader from './common/Loader'
import Dropdown, { DropdownItem } from './common/Dropdown'
import { useDeleteRequest, usePutRequest } from '../hooks/request'
import { ORDER_DETAIL } from '../urls'
import { currency, currencies } from '../utils/currency'
import useTrans from '../hooks/trans'


export default function OrderItem({ item, shop, onSuccess, onDelete }) {
    const [showMessage] = useMessage()
    const orderUpdate = usePutRequest({
        url: ORDER_DETAIL.replace('{shopId}', shop.id).replace('{id}', item.id),
    })

    const orderDelete = useDeleteRequest({
        url: ORDER_DETAIL.replace('{shopId}', shop.id).replace('{id}', item.id),
    })

    const t = useTrans()

    async function deleteOrder() {
        if (global.confirm(t('orderDelete'))) {
            const { error } = await orderDelete.request()

            if (error) {
                showMessage(error.data.detail, 'is-danger')
                return
            }
            onDelete()
        }
    }

    const statuses = [
        { name: t('processing'), id: 'in processing' },
        { name: t('confirmed'), id: 'confirmed' },
        { name: t('performing'), id: 'performing' },
        { name: t('performed'), id: 'success' },
    ]

    const statusIdToReadable = {
        'in processing': t('processing'),
        confirmed: t('confirmed'),
        performing: t('performing'),
        success: t('performed'),
    }

    const statusPaid = [
        { name: t('notPaid'), id: false },
        { name: t('paid'), id: true },
    ]

    const [showOrderProductModal, hideOrderProductModal] = useModal(
        <OrderDetail
            order={item}
            shop={shop}
            onSuccess={() => {
                onSuccess()
                hideOrderProductModal()
            }}
            onCancel={() => hideOrderProductModal()} />,
    )

    async function changeStatus(data) {
        const { success } = await orderUpdate.request({
            data: {
                address: item.address,
                paymentType: item.paymentType,
                person: item.person.id,
                totalPaid: item.totalPaid,
                status: data,
                paid: item.paid,
            },
        })

        if (success) {
            onSuccess()
        }
    }

    async function changeStatusPaid(data) {
        const { success } = await orderUpdate.request({
            data: {
                address: item.address,
                paymentType: item.paymentType,
                person: item.person.id,
                totalPaid: item.totalPaid,
                status: item.status,
                paid: data,
            },
        })

        if (success) {
            onSuccess()
        }
    }

    const cur = currencies.map((items) => ({ name: t(items.name), value: items.value }))

    return (
        <tr>
            <td className="pointer" onClick={showOrderProductModal}>
                {item.id}
            </td>

            <td className="pointer" onClick={showOrderProductModal}>
                {getDateTime(item.createdAt)}
            </td>

            <td className="pointer" onClick={showOrderProductModal}>
                {item.person ? item.person.name : ''}
            </td>

            <td>
                {orderUpdate.loading ? <Loader /> : (
                    <Dropdown trigger={(
                        <div
                            className={cn(
                                `tag has-text-white pointer ${item.status === 'confirmed'
                                    ? 'is-warning' : item.status === 'performing'
                                        ? 'is-link' : item.status === 'in processing'
                                            ? 'is-danger' : 'is-success'}`,
                            )}>
                            {statusIdToReadable[item.status]}
                            <ion-icon name="caret-down-outline" />
                        </div>
                    )}>
                        {statuses.map((statusItem) => (
                            <DropdownItem
                                onClick={() => changeStatus(statusItem.id)}
                                key={statusItem.id}
                                text={statusItem.name} />
                        ))}
                    </Dropdown>
                )}
            </td>

            <td className="pointer" onClick={showOrderProductModal}>
                {`${item.totalPrice ? item.totalPrice.toLocaleString('fr') : 0} ${currency(cur, shop.currency)}`}
            </td>

            <td>
                {orderUpdate.loading ? <Loader /> : (
                    <Dropdown trigger={(
                        <div className={cn('tag has-text-white pointer is-success',
                            { 'is-danger': !item.paid })}>
                            {item.paid ? t('paid') : t('notPaid')}
                            <ion-icon name="caret-down-outline" />
                        </div>
                    )}>
                        {statusPaid.map((statusItem) => (
                            <DropdownItem
                                onClick={() => changeStatusPaid(statusItem.id)}
                                key={statusItem.id}
                                text={statusItem.name} />
                        ))}
                    </Dropdown>
                )}
            </td>

            <td>
                {paymentType(item.paymentType)}
            </td>

            <td className="has-text-right">
                <span className="pointer"><ion-icon name="trash" onClick={deleteOrder} /></span>
            </td>
        </tr>
    )
}
