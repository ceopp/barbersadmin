/* eslint-disable no-nested-ternary */
import React from 'react'
import { readableDate } from '../utils/date'
import Button from './common/Button'
import { useModal } from '../hooks/modal'
import BarbersDetail from './BarbersDetail'


export default function BarbersItem({ item, onDelete, onUpdate }) {
    // const [updateBarbersModal, hideBarbersUpdateModal] = useModal(
    //     <BarbersUpdate item={item} onSuccess={() => {
    //         hideBarbersUpdateModal()
    //         onUpdate()
    //     }} onCancel={() => hideBarbersUpdateModal()} />,
    // )

    // const [showBarbersImage, hideShowBarbersImage] = useModal(
    //     <BarbersImage
    //         shop={shop}
    //         product={item}
    //         onSuccess={() => {
    //             hideShowProductImage()
    //             onUpdate()
    //         }}
    //         onCancel={() => hideShowProductImage()} />,
    // )

    const [showBarbersModal, hideBarbersModal] = useModal(
        <BarbersDetail
            onUpdate={onUpdate}
            item={item}
            onCancel={() => hideBarbersModal()} />,
    )

    // async function deleteProduct() {
    //     if (global.confirm(t('productDelete'))) {
    //         const { error } = await productDelete.request()
    //
    //         if (error) {
    //             showMessage(error.data.detail, 'is-danger')
    //             return
    //         }
    //
    //         onDelete()
    //     }
    // }


    return (
        <tr>
            <td className="pointer" onClick={showBarbersModal}>
                {item.user.name}
            </td>

            <td className="pointer" onClick={showBarbersModal}>
                {item.user.phone}
            </td>

            <td className="pointer" onClick={showBarbersModal}>
                {item.about}
            </td>

            <td className="pointer" onClick={showBarbersModal}>
                {readableDate(item.createdAt)}
            </td>

            <td className="pointer" onClick={showBarbersModal}>
                {readableDate(item.updatedAt)}
            </td>

            <td className="has-text-right">
                <Button className="pointer is-white" icon="trash-outline" />
                <Button className="pointer is-white" icon="create-outline" />
            </td>
        </tr>
    )
}
