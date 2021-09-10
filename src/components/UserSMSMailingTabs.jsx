import React from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom'
import cn from 'classnames'
import useTrans from '../hooks/trans'

export default function UserSMSMailingTabs() {
    const t = useTrans()
    const { path } = useRouteMatch()

    return (
        <div className="tabs">
            <ul>
                <li className={cn({ 'is-active': path.endsWith('/person') })}>
                    <NavLink to="person">{t('person')}</NavLink>
                </li>

                <li className={cn({ 'is-active': path.endsWith('/send-sms') })}>
                    <NavLink to="send-sms">{t('sms')}</NavLink>
                </li>
            </ul>
        </div>
    )
}
