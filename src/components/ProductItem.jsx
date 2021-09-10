/* eslint-disable no-nested-ternary */
import React from 'react'
import { css, StyleSheet } from 'aphrodite'
import cn from 'classnames'
import { domain, PRODUCT_DETAIL } from '../urls'
import { useDeleteRequest } from '../hooks/request'
import { useModal } from '../hooks/modal'
import { useMessage } from '../hooks/message'
import ProductUpdate from './ProductUpdate'
import BarbersDetail from './BarbersDetail'
import { currencies, currency } from '../utils/currency'
import useTrans from '../hooks/trans'


export default function ProductItem({ item, onDelete, onUpdate, shop, loading }) {
    const productDelete = useDeleteRequest({
        url: PRODUCT_DETAIL.replace('{id}', item.id).replace('{shopId}', shop.id),
    })

    const t = useTrans()

    const [showMessage] = useMessage()

    const [updateProductModal, hideProductUpdateModal] = useModal(
        <ProductUpdate product={item} shopId={shop.id} onSuccess={() => {
            hideProductUpdateModal()
            onUpdate()
        }} onCancel={() => hideProductUpdateModal()} />,
    )

    const [showProductModal, hideProductModal] = useModal(
        <BarbersDetail
            onSuccess={() => {
                hideProductUpdateModal()
                onDelete()
            }}
            shop={shop}
            product={item}
            onCancel={() => hideProductModal()} />,
    )

    async function deleteProduct() {
        if (global.confirm(t('productDelete'))) {
            const { error } = await productDelete.request()

            if (error) {
                showMessage(error.data.detail, 'is-danger')
                return
            }

            onDelete()
        }
    }

    const cur = currencies.map((curc) => ({ name: t(curc.name), value: curc.value }))
    const attrPrice = item.attributes.map((attr) => (attr.price))

    return (
        <tr>
            <td onClick={showProductModal} className="pointer">{item.id}</td>
            <td onClick={showProductModal} className="pointer">{item.name}</td>
            <td className={cn('pointer', css(styles.text))} onClick={showProductModal}>
                {item.category.name}
            </td>

            <td className={cn('pointer', css(styles.text))} onClick={showProductModal}>
                {item.attributes.length > 1 ? Math.min(...attrPrice) - Math.max(...attrPrice) : attrPrice[0]}
                &nbsp;{currency(cur, shop.currency)}
            </td>

            <td className="pointer" onClick={showProductModal}>
                {item.image ? (
                    <img
                        className={cn('image is-128x128', css(styles.image))}
                        src={domain + item.image}
                        alt="alt" />
                ) : t('noImage')}
            </td>

            <td className="has-text-right">
                <span className="pointer"><ion-icon name="trash" onClick={deleteProduct} /></span>
                <span className="pointer"><ion-icon name="create" onClick={updateProductModal} /></span>
            </td>
        </tr>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100px',
        height: '122px',
        display: 'block',
    },
    text: {
        maxWidth: '200px',
    },
})
