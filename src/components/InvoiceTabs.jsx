import cn from 'classnames'
import React from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom'
import useTrans from '../hooks/trans'

export default function InvoiceTabs() {
    const { path } = useRouteMatch()
    const t = useTrans()

    return (
        <div className="tabs">
            <ul>
                <li className={cn({ 'is-active': path.startsWith('/invoice') })}>
                    <NavLink to="invoice">{t('pay')}</NavLink>
                </li>

                <li className={cn({ 'is-active': path.startsWith('/shop-invoice') })}>
                    <NavLink to="shop-invoice">{t('invoiceHostory')}</NavLink>
                </li>

                <li className={cn({ 'is-active': path.startsWith('/coupon') })}>
                    <NavLink to="coupon">{t('coupon')}</NavLink>
                </li>
            </ul>
        </div>
    )
}
