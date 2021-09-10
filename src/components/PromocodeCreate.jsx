import React from 'react'
import { usePostRequest } from '../hooks/request'
import PromocodeForm from './PromocodeForm'
import { PROMOCODE_LIST } from '../urls'

export default function PromocodeCreate({ shopId, onSuccess, onCancel }) {
    const promocodeCreate = usePostRequest({
        url: PROMOCODE_LIST.replace('{shopId}', shopId),
    })

    async function onSubmit(data, actions) {
        const { success } = await promocodeCreate.request({ data })

        if (success) {
            actions.resetForm()
            onSuccess()
        }
    }

    return (
        <div>
            <PromocodeForm
                shopId={shopId}
                onSubmit={onSubmit}
                onCancel={onCancel}
                loading={promocodeCreate.loading} />
        </div>
    )
}
