import cn from 'classnames'
import React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { NavLink } from 'react-router-dom'
import moment from 'moment'
import { icons } from '../utils/icons'
import useTrans from '../hooks/trans'


export default function ShopItem({ shop }) {
    const t = useTrans()
    return (
        <NavLink to={`/my-shops/${shop.id}/category`} className="column is-4-widescreen is-6-desktop is-12-tablet">
            <div className={cn(css(styles.height), 'box')}>
                <div className="columns is-mobile">
                    <div className="column is-narrow">
                        <div className={cn(
                            css(styles.icon),
                        )}>
                            <ion-icon name={icons[shop.category]} />
                        </div>
                    </div>

                    <div className={cn('column', css(styles.blockLeftPadding))}>

                        <div>
                            <div className={cn(
                                css(styles.iconShopItemName),
                            )}>
                                <ion-icon name="business-outline" />
                                <span className={css(styles.shopName)}>{shop.name}</span>
                            </div>
                        </div>


                        <div className={cn(css(styles.description))}>
                            <div className={cn('columns is-mobile')}>
                                <div className={cn(
                                    css(styles.column),
                                    'column is-6',
                                )}>
                                    <div className="columns is-mobile is-variable is-1">
                                        <span className="column is-narrow"><ion-icon name="bulb-outline" /></span>
                                        <span className={cn('column is-narrow', css(styles.shopItemAttrText))}>
                                            {t('status')}:
                                        </span>
                                    </div>
                                </div>

                                {moment(shop.expiresAt).diff(moment(Date.now()), 'days') < 0 ? (
                                    <div className={cn('has-text-danger column is-6', css(styles.textColumn))}>{t('notPaid')}</div>
                                ) : (
                                    <div className={cn('column is-6', css(styles.textColumn),
                                        shop.status === 'active' ? 'has-text-success' : 'has-text-danger')}>
                                        {shop.shopStatusReadable}
                                    </div>
                                )}

                            </div>

                            <div className="columns is-mobile">

                                <div className={cn(
                                    css(styles.column),
                                    'column is-6',
                                )}>
                                    <div className="columns is-mobile is-variable is-1">
                                        <span className="column is-narrow"><ion-icon name="layers-outline" /></span>
                                        <span className={cn('column is-narrow', css(styles.shopItemAttrText))}>
                                            {t('order')}:
                                        </span>
                                    </div>
                                </div>

                                <div className={cn(css(styles.textColumn), 'column has-text-info is-6')}>
                                    <span>
                                        {shop.shopOrdersCount}
                                    </span>
                                </div>

                            </div>

                            <div className="columns is-mobile">

                                <div className={cn(
                                    css(styles.column),
                                    'column is-6',
                                )}>
                                    <div className="columns is-mobile is-variable is-1">
                                        <span className="column is-narrow"><ion-icon name="people-outline" /></span>
                                        <span className={cn('column is-narrow', css(styles.shopItemAttrText))}>
                                            {t('person')}:
                                        </span>
                                    </div>
                                </div>

                                <div className={cn(css(styles.textColumn), 'column has-text-info is-6')}>
                                    <span>
                                        {shop.shopClientsCount}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </NavLink>
    )
}

const styles = StyleSheet.create({
    icon: {
        fontSize: '2.7em',
        marginTop: '1rem',
        marginLeft: '0.3rem',
    },
    iconShopItemName: {
        fontSize: '1em',
    },
    shopItemAttrText: {
        marginTop: '0.2rem',
    },
    iconFrame: {
        width: '80px',
    },
    blockLeftPadding: {
        marginLeft: '0.1rem',
    },
    shopName: {
        fontWeight: '600',
        marginLeft: '0.8rem',
    },
    height: {
        height: '100%',
        ':hover': {
            boxShadow: '0 2px 8px 0 #b6c0d1, 0 6px 8px 0 #b6c0d1',
        },
    },
    column: {
        padding: '0 .75rem',
    },
    description: {
        margin: '1rem 0',
    },
    textColumn: {
        padding: '0 .75rem',
        marginTop: '5px',
        marginLeft: '1.5rem',
    },
})
