import React from 'react'
import { usePutRequest } from '../hooks/request'
import { PROMOCODE_DETAIL } from '../urls'
import PromocodeForm from './PromocodeForm'

export default function PromocodeUpdate({ promocode, shopId, onCancel, onSuccess }) {
    const promocodeUpdate = usePutRequest({
        url: PROMOCODE_DETAIL.replace('{id}', promocode.id).replace('{shopId}', shopId),
    })

    async function onSubmit(data, actions) {
        const { success } = await promocodeUpdate.request({ data })

        if (success) {
            actions.resetForm()
            onSuccess()
        }
    }

    return (
        <div>
            <PromocodeForm
                loading={promocodeUpdate.loading}
                onCancel={onCancel}
                shopId={shopId}
                initialValues={promocode}
                onSubmit={onSubmit}
                onSuccess={onSuccess}
            />
        </div>
    )
}
