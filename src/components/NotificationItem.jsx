import React from 'react'
import { getDateTime } from "../utils/date";

export default function CategoryItem({ item }) {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{getDateTime(item.createdAt)}</td>
            <td>
                {item.message}
            </td>
        </tr>
    )
}
