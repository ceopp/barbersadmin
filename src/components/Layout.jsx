/* eslint-disable jsx-a11y/anchor-is-valid */
import { css, StyleSheet } from 'aphrodite'
import cn from 'classnames'
import { NavLink, useHistory, useRouteMatch } from 'react-router-dom'
import React, { useState } from 'react'
import logo from '../static/logo.jpg'
import { signOut } from '../utils/auth'
import { useModal } from '../hooks/modal'
import Button from './common/Button'

export default function Layout({ children, padding = true, className }) {
    const { path } = useRouteMatch()
    const history = useHistory()
    const [menu, setMenu] = useState(false)

    const [logOutModal, hideLogoutModal] = useModal(
        <div>
            <h1 className="is-size-5">
                Потдверждение выхода
            </h1><br />

            <Button
                text="Отмена"
                icon="close"
                onClick={() => hideLogoutModal()} />&nbsp;

            <Button
                className="is-info"
                text="Выйти"
                icon="log-out-outline"
                onClick={() => {
                    signOut(history)
                    hideLogoutModal()
                }} />
        </div>,
    )

    return (
        <div>
            <div className={css(styles.sidebar,
                menu ? styles.desktopSidebar : styles.mobileSidebar)}>
                <img src={logo} alt="logo" className={css(styles.logo)} />

                <ul className={css(styles.sideMenu)}>
                    <NavLink to="/barbers">
                        <li className={cn('columns is-mobile is-gapless', css(styles.link),
                            { [css(styles.active)]: path.startsWith('/barbers') })}>
                            <span className={cn('column is-narrow', css(styles.icon))}>
                                <ion-icon name="cart-outline" />
                            </span>

                            <span className={cn('column is-narrow', css(styles.text))}>
                                Barbers
                            </span>
                        </li>
                    </NavLink>

                    <NavLink to="/user">
                        <li className={cn('columns is-mobile is-gapless', css(styles.link),
                            { [css(styles.active)]: path.startsWith('/user') })}>
                            <span className={cn('column is-narrow', css(styles.icon))}>
                                <ion-icon name="megaphone-outline" />
                            </span>

                            <span className={cn('column is-narrow', css(styles.text))}>
                                Пользователь
                            </span>
                        </li>
                    </NavLink>

                    <NavLink to="/services">
                        <li className={cn('columns is-mobile is-gapless', css(styles.link),
                            { [css(styles.active)]: path.startsWith('/services') })}>
                            <span className={cn('column is-narrow', css(styles.icon))}>
                                <ion-icon name="chatbubble-ellipses-outline" />
                            </span>

                            <span className={cn('column is-narrow', css(styles.text))}>
                                Сервисы
                            </span>
                        </li>
                    </NavLink>

                    <a onClick={logOutModal}>
                        <li className={cn('columns is-mobile is-gapless', css(styles.link))}>
                            <span className={cn('column is-narrow', css(styles.icon))}>
                                <ion-icon name="log-out-outline" />
                            </span>

                            <span className={cn('column is-narrow', css(styles.text))}>
                                Выйти
                            </span>
                        </li>
                    </a>
                </ul>
            </div>

            <div className={cn(css(styles.container))}>
                <div className={cn(className, css(styles.content), { [css(styles.padding)]: padding })}>
                    <span onClick={() => setMenu(true)} className={css(styles.showerIcon)}>
                        <ion-icon size="large" name="menu-outline" />
                    </span>
                    {children}
                </div>
            </div>

            <div className={css(menu ? styles.background : null)} onClick={() => setMenu(false)} />
        </div>
    )
}

const styles = StyleSheet.create({
    content: {
        minHeight: '100vh',
        background: '#f2f6f7',
    },
    shopName: {
        position: 'absolute',
        marginTop: '2.8rem',
        marginLeft: '2rem',
        fontWeight: '400',
    },
    desktopSidebar: {
        '@media (max-width: 769px)': {
            transform: 'translateX(0)',
            transition: 'all 300ms',
        },
    },
    mobileSidebar: {
        '@media (max-width: 769px)': {
            transform: 'translateX(-14rem)',
            transition: 'all 300ms',
        },
    },
    showerIcon: {
        '@media (min-width: 769px)': {
            display: 'none',
        },
    },
    sidebar: {
        minHeight: '100%',
        position: 'fixed',
        width: '14.1rem',
        margin: '0',
        zIndex: '5',
        boxShadow: '0 0.5em 1em rgba(10, 10, 10, 0.1)',
        '::-webkit-scrollbar': {
            display: 'none',
        },
        '@media (max-height: 900px)': {
            height: 'calc(100vh - 100%)',
            background: 'white',
            overflowX: 'scroll',
        },
    },
    sideMenu: {
        marginTop: '3.3rem',
        marginLeft: '0rem',
    },
    padding: {
        padding: '1.8rem',
    },
    link: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontWeight: '400',
        marginBottom: '1rem',
    },
    icon: {
        margin: '0rem 1rem 0rem 2rem',
    },
    container: {
        margin: '0 0 0 14rem',
        '@media (max-width: 769px)': {
            margin: '0',
        },
    },
    logo: {
        marginTop: '6rem',
        marginLeft: '2.1rem',
        width: '8rem',
    },
    active: {
        fontWeight: '600',
        color: '#53a4c1',
        boxShadow: 'inset 4px 0px #53a4c1',
    },
    textButton: {
        background: 'gray',
    },
    hiderIcon: {
        transform: 'translate(9.6rem, -15rem)',
        color: 'white',
        '@media (min-width: 769px)': {
            display: 'none',
        },
    },
    text: {
        marginTop: '3px',
    },
    background: {
        '@media (max-width: 769px)': {
            bottom: 0,
            left: 0,
            position: 'fixed',
            right: 0,
            top: 0,
            background: 'RGBA(0, 0, 0, .5)',
            zIndex: 4,
        },
    },
})
