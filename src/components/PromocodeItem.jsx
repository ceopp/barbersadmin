import cn from 'classnames'
import React from 'react'
import { useMessage } from '../hooks/message'
import { useModal } from '../hooks/modal'
import { useDeleteRequest } from '../hooks/request'
import { PROMOCODE_DETAIL } from '../urls'
import { getDate } from '../utils/date'
import PromocodeUpdate from './PromocodeUpdate'
import useTrans from '../hooks/trans'

export default function PromocodeItem({ shopId, item, onDelete, onUpdate }) {
    const [showMessage] = useMessage()
    const promocodeDelete = useDeleteRequest({
        url: PROMOCODE_DETAIL.replace('{shopId}', shopId).replace('{id}', item.id),
    })
    const t = useTrans()
    const typeStatus = {
        discount: t('percent'),
        free_delivery: t('freeDelivery'),
    }

    const [updatePromocodeModal, hidePromocodeUpdateModal] = useModal(
        <PromocodeUpdate promocode={item} shopId={shopId} onSuccess={() => {
            hidePromocodeUpdateModal()
            onUpdate()
        }} onCancel={() => hidePromocodeUpdateModal} />,
    )

    async function deletePromocode() {
        if (global.confirm(t('promocodeDelete'))) {
            const { error } = await promocodeDelete.request()

            if (error) {
                showMessage(error.data.detail, 'is-danger')
                return
            }

            onDelete()
        }
    }

    return (
        <tr className={cn({ 'has-text-grey': item.orderCount === item.limit })}>
            <td>{item.code}</td>
            {typeStatus[item.type] === t('percent') ? (
                <td>{`${item.percent}% ${t('discount')}`}</td>
            ) : (
                <td>{typeStatus[item.type]}</td>
            )}
            <td>{`${t('from')} ${getDate(item.startsAt)} ${t('until')} ${getDate(item.endsAt)}`}</td>
            <td>
                <span className={cn('has-text-success', { 'has-text-grey': item.orderCount === item.limit })}>
                    {item.orderCount}
                </span> {t('of')} {item.limit}
            </td>


            <td className="has-text-right">
                <span className="pointer"><ion-icon name="trash" onClick={deletePromocode} /></span>
                {item.active ? (
                    <span className="pointer"><ion-icon name="create" onClick={updatePromocodeModal} /></span>
                ) : null}
            </td>
        </tr>
    )
}
