import React, { useContext, useState } from 'react'
import { Form, Formik } from 'formik'
import Input from './common/Input'
import Button from './common/Button'
import { ShopContext } from './SidebarShop'
import { useDeleteRequest, useGetRequest, usePostRequest } from '../hooks/request'
import { PAYMENT_DETAIL, PAYMENT_LIST } from '../urls'
import payme from '../static/payme.png'
import click from '../static/click.jpg'
import liqpay from '../static/liqpay.jpg'
import sberbank from '../static/sberbank.jpg'
import stripe from '../static/stripe.jpg'
import tranzzo from '../static/tranzzo.jpg'
import rave from '../static/brave.jpg'
import yandexMoney from '../static/yandex_money.jpg'
import Select from './common/Select'
import { required } from '../utils/validators'
import Card from './common/Card'
import useTrans from '../hooks/trans'

export default function UpdateShopPaymentToken({ onSuccess, onDelete }) {
    const [value, setValue] = useState('stripe')
    const { shop } = useContext(ShopContext)
    const paymentToken = usePostRequest({ url: PAYMENT_LIST.replace('{shopId}', shop.id) })
    const paymentTokenDetail = useGetRequest()
    const paymentDelete = useDeleteRequest()
    const t = useTrans()

    const payments = [
        { name: 'Stripe', id: 'stripe' },
        { name: 'Rave by Flutterwave', id: 'rave_by_flutterwave' },
        { name: 'Yandex.Money', id: 'yandex_money' },
        { name: 'Sberbank', id: 'sberbank' },
        { name: 'Tranzzo', id: 'tranzzo' },
        { name: 'Payme', id: 'payme' },
        { name: 'Click', id: 'click' },
        { name: 'LiqPay', id: 'liqpay' },
    ]

    const paymentImage = {
        stripe,
        rave_by_flutterwave: rave,
        yandex_money: yandexMoney,
        sberbank,
        tranzzo,
        payme,
        click,
        liqpay,
    }

    const paymentLabel = {
        stripe: `Stripe ${t('token')}`,
        rave_by_flutterwave: `Rave by Flutterwave ${t('token')}`,
        yandex_money: `Yandex.Money ${t('token')}`,
        sberbank: `Sberbank ${t('token')}`,
        tranzzo: `Tranzzo ${t('token')}`,
        payme: `Payme ${t('token')}`,
        click: `Click ${t('token')}`,
        liqpay: `LiqPay ${t('token')}`,
    }

    async function updateBotName(data) {
        await paymentToken.request({ data })
        onSuccess()
    }

    async function changeImage(payment, setFieldValue) {
        const paymentResponse = await paymentTokenDetail.request({
            url: PAYMENT_DETAIL.replace('{shopId}', shop.id).replace(
                '{payment}', payment,
            ),
        })
        setFieldValue('name', payment)
        setFieldValue('token', paymentResponse.response ? paymentResponse.response.token : '')
        setValue(payment)
    }

    async function deletePayment() {
        await paymentDelete.request({
            url: PAYMENT_DETAIL.replace('{payment}', value).replace('{shopId}', shop.id),
        })
        onDelete()
    }

    return (
        <Formik onSubmit={updateBotName} initialValues={{ token: '', name: '' }}>
            {({ setFieldValue }) => (
                <Form>
                    <Card>
                        <Select
                            name="name"
                            validate={required}
                            onChange={({ target }) => changeImage(target.value, setFieldValue)}
                            options={payments}
                            label={t('choosePaymentSystem')} />

                        <Input
                            imgSrc={paymentImage[value]}
                            name="token"
                            label={paymentLabel[value]}
                            placeholder={t('newToken')}
                            type="text" />

                        <Button
                            text={t('update')}
                            icon="sync"
                            loading={paymentToken.loading}
                            type="submit"
                            className="is-success is-outlined" />&nbsp;

                        <Button
                            text={t('delete')}
                            icon="trash-outline"
                            loading={paymentDelete.loading}
                            onClick={deletePayment}
                            className="is-danger is-outlined" />
                    </Card>
                </Form>
            )}
        </Formik>
    )
}
