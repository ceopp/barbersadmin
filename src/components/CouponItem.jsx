import React from 'react'
import cn from 'classnames'
import { getDateTime } from '../utils/date'


export default function CouponItem({ item }) {
    return (
        <tr className={cn({ 'has-text-grey': !item.isActive })}>
            <td>{item.type}</td>
            <td>{item.code}</td>
            <td>{item.value}</td>
            <td>{getDateTime(item.startsAt)}</td>
            <td>{getDateTime(item.endsAt)}</td>
        </tr>
    )
}
