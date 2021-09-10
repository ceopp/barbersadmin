import { css, StyleSheet } from 'aphrodite'
import cn from 'classnames'
import { NavLink, useHistory, useLocation, useParams } from 'react-router-dom'
import React, { createContext, useState } from 'react'
import logo from '../static/logo.svg'
import { useLoad } from '../hooks/request'
import { SHOP_DETAIL } from '../urls'
import Loader from './common/Loader'
import useTrans from '../hooks/trans'

export const ShopContext = createContext()

export function SidebarShop({ children, padding = true, className }) {
    const t = useTrans()
    const { pathname } = useLocation()
    const { shopId: shop } = useParams()
    const history = useHistory()
    const [menu, setMenu] = useState(false)
    const shopDetail = useLoad({ url: SHOP_DETAIL.replace('{shopId}', shop) })

    const shopName = shopDetail.response ? shopDetail.response.name : ''
    const shopOrderCount = shopDetail.response ? shopDetail.response.shopIsSeenOrdersCount : 0

    async function reload() {
        await shopDetail.request()
    }

    return (
        <ShopContext.Provider value={{
            shop: shopDetail.response ? shopDetail.response : {},
            reloadShop: reload,
        }}>
            <div className={css(styles.sidebar,
                menu ? styles.desktopSidebar : styles.mobileSidebar)}>
                <div>
                    <span className={cn('return-left pointer', css(styles.backIcon))}
                        onClick={() => history.push('/my-shops')}>
                        <ion-icon name="chevron-back-outline" />
                    </span>

                    <p className={cn('is-size-6 pointer return-left', css(styles.shopName))}
                        onClick={() => history.push('/my-shops')}>
                        {shopName}
                    </p>
                </div>

                <img src={logo} alt="logo" className={css(styles.logo)} />

                <ul>
                    <NavLink to={`/my-shops/${shop}/category`}>
                        <li className={cn('columns is-mobile is-gapless', css(styles.link),
                            { [css(styles.active)]: pathname.endsWith('category') })}>
                            <span className={cn('column is-narrow', css(styles.icon))}>
                                <ion-icon name="grid-outline" />
                            </span>

                            <span className={cn('column is-narrow', css(styles.text))}>
                                {t('category')}
                            </span>
                        </li>
                    </NavLink>

                    <NavLink to={`/my-shops/${shop}/product`}>
                        <li className={cn('columns is-mobile is-gapless', css(styles.link),
                            { [css(styles.active)]: pathname.endsWith('/product') })}>
                            <span className={cn('column is-narrow', css(styles.icon))}>
                                <ion-icon name="apps-outline" />
                            </span>

                            <span className={cn('column is-narrow', css(styles.text))}>
                                {t('product')}
                            </span>
                        </li>
                    </NavLink>

                    <NavLink to={`/my-shops/${shop}/order`}>
                        <li className={cn('columns is-mobile is-gapless', css(styles.link),
                            { [css(styles.active)]: pathname.endsWith('/order') || pathname.endsWith('/promocodes') })}>
                            <span className={cn('column is-narrow', css(styles.icon))}>
                                <ion-icon name="layers-outline" />
                            </span>

                            <span className={cn('column is-narrow', css(styles.text))}>
                                {t('order')} &nbsp;
                                <b className={cn({ 'has-text-success': shopOrderCount })}>
                                    {shopOrderCount || ''}
                                </b>
                            </span>
                        </li>
                    </NavLink>

                    <NavLink to={`/my-shops/${shop}/person`}>
                        <li className={cn('columns is-mobile is-gapless', css(styles.link),
                            { [css(styles.active)]: pathname.endsWith('/person') || pathname.endsWith('/send-sms') })}>
                            <span className={cn('column is-narrow', css(styles.icon))}>
                                <ion-icon name="people-outline" />
                            </span>

                            <span className={cn('column is-narrow', css(styles.text))}>
                                {t('person')}
                            </span>
                        </li>
                    </NavLink>

                    <NavLink to={`/my-shops/${shop}/analytics`}>
                        <li className={cn('columns is-mobile is-gapless', css(styles.link),
                            { [css(styles.active)]: pathname.endsWith('/analytics') })}>
                            <span className={cn('column is-narrow', css(styles.icon))}>
                                <ion-icon name="stats-chart-outline" />
                            </span>

                            <span className={cn('column is-narrow', css(styles.text))}>
                                {t('analytics')}
                            </span>
                        </li>
                    </NavLink>

                    <NavLink to={`/my-shops/${shop}/services`}>
                        <li className={cn('columns is-mobile is-gapless', css(styles.link),
                            { [css(styles.active)]: pathname.endsWith('/services') })}>
                            <span className={cn('column is-narrow', css(styles.icon))}>
                                <ion-icon name="card-outline" />
                            </span>

                            <span className={cn('column is-narrow', css(styles.text))}>
                                {t('services')}
                            </span>
                        </li>
                    </NavLink>

                    <NavLink to={`/my-shops/${shop}/settings/main`}>
                        <li className={cn('columns is-mobile is-gapless', css(styles.link),
                            { [css(styles.active)]:
                                pathname.endsWith('/main')
                                || pathname.endsWith('/currency')
                                || pathname.endsWith('/additional')
                                || pathname.endsWith('/about') })}>
                            <span className={cn('column is-narrow', css(styles.icon))}>
                                <ion-icon name="settings-outline" />
                            </span>

                            <span className={cn('column is-narrow', css(styles.text))}>
                                {t('settings')}
                            </span>
                        </li>
                    </NavLink>
                </ul>
            </div>

            <div className={cn(css(styles.container))}>
                <div className={cn(className, css(styles.content), { [css(styles.padding)]: padding })}>
                    <span onClick={() => setMenu(true)} className={css(styles.showerIcon)}>
                        <ion-icon size="large" name="menu-outline" />
                    </span>

                    {shopDetail.error && shopDetail.error.status === 404
                        ? <div className="has-text-danger">У Вас нет доступа в этот магазин!</div>
                        : null}

                    {!shopDetail.loading && shopDetail.response ? children : null}
                    <Loader large center show={shopDetail.loading} />
                </div>
            </div>

            <div className={css(menu ? styles.background : null)} onClick={() => setMenu(false)} />
        </ShopContext.Provider>
    )
}

const styles = StyleSheet.create({
    content: {
        minHeight: '100vh',
        background: '#f2f6f7',
    },
    backIcon: {
        position: 'absolute',
        marginTop: '1.5rem',
        marginLeft: '1.5rem',
        transform: 'scale(1.5)',
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
    shopName: {
        position: 'absolute',
        marginTop: '1.8rem',
        marginLeft: '3.2rem',
        fontWeight: '500',
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
    padding: {
        padding: '1.8rem',
    },
    link: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontWeight: '400',
        marginBottom: '1rem',
    },
    icon: {
        paddingLeft: '2rem',
        paddingRight: '1rem',
        margin: '0rem 1rem 0rem 2rem',
    },
    container: {
        margin: '0 0 0 14rem',
        '@media (max-width: 769px)': {
            margin: '0',
        },
    },
    hiderIcon: {
        transform: 'translate(9.6rem, -15rem)',
        color: 'white',
        '@media (min-width: 769px)': {
            display: 'none',
        },
    },
    logo: {
        marginTop: '7rem',
        marginLeft: '2rem',
        marginBottom: '4rem',
        width: '8rem',
    },
    active: {
        fontWeight: '500',
        color: '#53a4c1',
        boxShadow: 'inset 4px 0px #53a4c1',
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
