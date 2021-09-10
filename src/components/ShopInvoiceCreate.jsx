import { css, StyleSheet } from 'aphrodite'
import cn from 'classnames'

import { Form, Formik } from 'formik'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import debounce from 'lodash/debounce'
import { monthPrice } from '../utils/currency'

import Button from './common/Button'
import Loader from './common/Loader'
import Select from './common/Select'
import useTrans from '../hooks/trans'

import uzcard from '../static/uzcard.jpg'
import humo from '../static/humo.jpg'
import Table from './common/Table'
import Input from './common/Input'
import { useGetRequest } from '../hooks/request'
import { COUPON_DETAIL } from '../urls'
import { useMessage } from '../hooks/message'


export default function ShopInvoiceCreate({ shops, onSubmit, setPrice, price, loading }) {
    const t = useTrans()
    const coupon = useGetRequest()
    const [stock, setStock] = useState('')
    const [monthsCount, setMonthsCount] = useState(0)
    const [errorMessage, setErrorMessage] = useState(false)
    const [showMessage] = useMessage()

    function onChangeMonth(e, setFieldValue, values, shop) {
        setFieldValue(`${shop.id}`, e.target.value)
        let periods = 0

        // eslint-disable-next-line array-callback-return
        Object.entries(values).map((item) => {
            if (Number(item[0]) === shop.id) {
                periods += Number(e.target.value > 0 ? e.target.value : 0)
            } else {
                periods += Number(item[1] > 0 ? item[1] : 0)
            }
        })

        setPrice(periods * monthPrice)
        setMonthsCount(periods)
    }

    useEffect(() => {
        setPrice(monthsCount * monthPrice)
        if (stock) {
            if (stock.type === 'fixed') {
                setPrice(price - stock.value)
            } else {
                setPrice(price - (price * stock.value) / 100)
            }
        }
        // eslint-disable-next-line
    }, [stock, monthsCount])


    const onCodeCheck = useCallback(debounce(async (code) => {
        const { success, response } = await coupon.request({ url: COUPON_DETAIL.replace('{code}', code) })
        if (success) {
            setStock(response)
            setErrorMessage(false)
        } else {
            showMessage(t('wrongCouponCode'), 'is-danger')
            setErrorMessage(true)
            setStock('')
        }
    }, 1000), [])

    const options = [
        { name: `0 ${t('month')}`, id: 0 },
        { name: `1 ${t('monthSingular')}`, id: 1 },
        { name: `2 ${t('monthPlural')}`, id: 2 },
        { name: `3 ${t('monthPlural')}`, id: 3 },
        { name: `6 ${t('months')}`, id: 6 },
        { name: `12 ${t('months')}`, id: 12 },
    ]

    return (
        <div className="box">
            {shops.response ? (
                <Formik initialValues={{ code: '' }} onSubmit={onSubmit}>
                    {({ setFieldValue, values }) => (
                        <Form>
                            <Table
                                items={shops.response ? shops.response.results : []}
                                columns={{
                                    shopName: t('createShop'),
                                    remaining: t('remaining'),
                                    period: t('period'),
                                }}
                                renderItem={(item) => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>

                                        <td>
                                            {moment(item.expiresAt).diff(moment(Date.now()), 'days') > 0 ? (
                                                moment(item.expiresAt).diff(moment(Date.now()), 'days')
                                            ) : 0} {t('days')}
                                        </td>

                                        <td className={css(styles.invoiceSelect)}>
                                            <Select
                                                name={`${item.id}`}
                                                onChange={(e) => onChangeMonth(e, setFieldValue, values, item)}
                                                options={options}
                                                className={css(styles.invoiceSelect)} />
                                        </td>
                                    </tr>
                                )} /><br />

                            <div className="column columns is-mobile is-pulled-right">
                                <figure className="image is-64x64">
                                    <img src={uzcard} alt="uzcard" />
                                </figure> &nbsp;
                                <figure className={cn('image', css(styles.imageHumo))}>
                                    <img src={humo} alt="humo" />
                                </figure> &nbsp;

                                <Input
                                    type="text"
                                    className={cn({ 'is-danger': errorMessage })}
                                    name="code"
                                    onChange={(event) => {
                                        setFieldValue('code', event.target.value)
                                        event.persist()
                                        onCodeCheck(event.target.value)
                                    }}
                                    placeholder={t('couponCode')} />&nbsp;

                                <Button
                                    type="submit"
                                    text={`${price.toFixed(2)}$ ${t('pay')}`}
                                    className="is-info"
                                    loading={loading} />
                            </div><br /><br />
                        </Form>
                    )}
                </Formik>
            ) : null}

            <Loader show={shops.loading} large center />
        </div>
    )
}

const styles = StyleSheet.create({
    imageHumo: {
        width: '69px',
    },
    invoiceSelect: {
        minWidth: '7rem',
    },
})
