import React from 'react'
import { usePostRequest } from '../hooks/request'
import { CATEGORY_LIST } from '../urls'
import CategoryForm from './CategoryForm'
import { useMessage } from '../hooks/message'

export default function CategoryCreate({ onCancel, onSuccess, shopId }) {
    const categoryCreate = usePostRequest({ url: CATEGORY_LIST.replace('{shopId}', shopId) })
    const [showMessage] = useMessage()

    async function onSubmit(data, actions) {
        const { error } = await categoryCreate.request({ data })

        if (error && error.data && error.status < 500) {
            Object.keys(error.data).map((key) => showMessage(`${key}: ${error.data[key]}`, 'is-danger'))
        }
        actions.resetForm()
        onSuccess()
    }

    return (
        <div>
            <CategoryForm
                onSubmit={onSubmit}
                shopId={shopId}
                onCancel={onCancel}
                loading={categoryCreate.loading} />
        </div>
    )
}
