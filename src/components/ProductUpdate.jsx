import React from 'react'
import { ATTRIBUTE_LIST, PRODUCT_DETAIL } from '../urls'
import { usePostRequest, usePutRequest } from '../hooks/request'

import ProductForm from './ProductForm'

export default function ProductUpdate({ onSuccess, onCancel, product, shopId }) {
    const productUpdate = usePutRequest({ url: PRODUCT_DETAIL.replace('{id}', product.id).replace('{shopId}', shopId) })
    const attributeCreate = usePostRequest({ url: ATTRIBUTE_LIST.replace('{shopId}', shopId) })

    async function onSubmit(data, actions, attributes) {
        const { success, response } = await productUpdate.request({ data })
        if (response) {
            await attributeCreate.request({
                data: {
                    attributes,
                    product: response.id,
                },
            })
        }

        if (success) {
            actions.resetForm()
            onSuccess()
        }
    }

    return (
        <div>
            <ProductForm
                loading={productUpdate.loading}
                onCancel={onCancel}
                shopId={shopId}
                initialValues={{ ...product }}
                onSuccess={onSuccess}
                onSubmit={onSubmit} />
        </div>
    )
}
