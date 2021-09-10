import React from 'react'
import { useMessage } from '../hooks/message'
import { ATTRIBUTE_LIST, PRODUCT_LIST } from '../urls'
import ProductForm from './ProductForm'
import { usePostRequest } from '../hooks/request'

export default function ProductCreate({ onCancel, onSuccess, shopId }) {
    const productCreate = usePostRequest({ url: PRODUCT_LIST.replace('{shopId}', shopId) })
    const [showMessage] = useMessage()
    const attributeCreate = usePostRequest({ url: ATTRIBUTE_LIST.replace('{shopId}', shopId) })


    async function onSubmit(data, actions, attributes) {
        const { success, error, response } = await productCreate.request({ data })

        if (response) {
            await attributeCreate.request({
                data: {
                    attributes,
                    product: response.id,
                },
            })
        }
        if (success) {
            onSuccess()
        } else if (error && error.data) {
            Object.keys(error.data).map((key) => showMessage(`${key}: ${error.data[key]}`, 'is-danger'))
        }
    }

    return (
        <div>
            <ProductForm
                shopId={shopId}
                onSubmit={onSubmit}
                onCancel={onCancel}
                loading={productCreate.loading} />
        </div>
    )
}
