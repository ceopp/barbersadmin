import React from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom'
import cn from 'classnames'
import useTrans from '../hooks/trans'

export default function OrderPromocodeTabs() {
    const t = useTrans()
    const { path } = useRouteMatch()

    return (
        <div className="tabs">
            <ul>
                <li className={cn({ 'is-active': path.endsWith('/order') })}>
                    <NavLink to="order">{t('order')}</NavLink>
                </li>

                <li className={cn({ 'is-active': path.endsWith('/promocodes') })}>
                    <NavLink to="promocodes">{t('promocode')}</NavLink>
                </li>
            </ul>
        </div>
    )
}
