/* eslint-disable no-nested-ternary */
import React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { domain } from '../urls'
import { getDateTime } from '../utils/date'
import { maxLength } from '../utils/string'
import { useModal } from '../hooks/modal'
import SmsMailingIinformation from './SmsMailingIinformation'
import useTrans from '../hooks/trans'


export default function SmsMailingItem({ item }) {
    const [showSmsModal, hideSmsModal] = useModal(
        <SmsMailingIinformation sms={item} onCancel={() => hideSmsModal()} />,
    )
    const t = useTrans()

    return (
        <tr>
            <td onClick={showSmsModal} className="pointer">{item.id}</td>
            <td onClick={showSmsModal} className="pointer">{getDateTime(item.createdAt)}</td>
            <td onClick={showSmsModal} className="pointer">{item.count}</td>
            <td onClick={showSmsModal} className="pointer">{maxLength(item.sms, 30)}</td>
            <td onClick={showSmsModal} className="pointer">
                {item.image ? (
                    <img
                        className={css(styles.image)}
                        src={domain + item.image}
                        alt="alt" />
                ) : t('noImage')}
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
})
