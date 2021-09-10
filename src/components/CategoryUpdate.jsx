import React from 'react'
import { CATEGORY_DETAIL } from '../urls'
import { usePutRequest } from '../hooks/request'
import CategoryForm from './CategoryForm'

export default function CategoryUpdate({ onSuccess, onCancel, category, shopId }) {
    const url = CATEGORY_DETAIL.replace('{id}', category.id).replace('{shopId}', shopId)
    const categoryUpdate = usePutRequest({ url })

    async function onSubmit(data, actions) {
        await categoryUpdate.request({ data })
        actions.resetForm()
        onSuccess()
    }

    return (
        <div>
            <CategoryForm
                category={category}
                loading={categoryUpdate.loading}
                onCancel={onCancel}
                shopId={shopId}
                initialValues={{ ...category, parent: category.parent ? category.parent.id : '' }}
                onSuccess={onSuccess}
                onSubmit={onSubmit} />
        </div>
    )
}
