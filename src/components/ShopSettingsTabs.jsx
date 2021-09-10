import React from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom'
import cn from 'classnames'
import useTrans from '../hooks/trans'

export default function ShopSettingsTabs() {
    const t = useTrans()
    const { path } = useRouteMatch()

    return (
        <div className="tabs">
            <ul>
                <li className={cn({ 'is-active': path.endsWith('/settings/main') })}>
                    <NavLink to="main">{t('mainSetting')}</NavLink>
                </li>

                <li className={cn({ 'is-active': path.endsWith('/settings/currency') })}>
                    <NavLink to="currency">{t('currencySetting')}</NavLink>
                </li>

                <li className={cn({ 'is-active': path.endsWith('/settings/about') })}>
                    <NavLink to="about">{t('aboutUs')}</NavLink>
                </li>

                <li className={cn({ 'is-active': path.endsWith('/settings/additional') })}>
                    <NavLink to="additional">{t('additionalSetting')}</NavLink>
                </li>
            </ul>
        </div>
    )
}
