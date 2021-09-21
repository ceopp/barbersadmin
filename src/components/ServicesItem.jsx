/* eslint-disable no-nested-ternary */
import React from 'react'
import { readableDate } from '../utils/date'
import Button from './common/Button'
import { useModal } from '../hooks/modal'
import ServicesDetail from './ServicesDetail'


export default function ServiceItem({ item, onDelete, onUpdate }) {

    const [showBarbersModal, hideBarbersModal] = useModal(
        <ServicesDetail
            onUpdate={onUpdate}
            item={item}
            onCancel={() => hideBarbersModal()} />,
    )


    return (
        <tr>
            <td className="pointer">
                {item.title}
            </td>

            <td className="pointer">
                {readableDate(item.createdAt)}
            </td>

            <td className="pointer">
                {readableDate(item.updatedAt)}
            </td>

            <td className="has-text-right">
                <Button className="pointer is-white" icon="trash-outline" />
                <Button className="pointer is-white" icon="create-outline" />
            </td>
        </tr>
    )
}
