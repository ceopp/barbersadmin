import { Form, Formik } from 'formik'
import React from 'react'
import { usePostRequest } from '../hooks/request'
import { ORDER_TO_FARGO } from '../urls'
import { required } from '../utils/validators'
import Button from './common/Button'
import Input from './common/Input'
import useTrans from '../hooks/trans'

export default function OrderToFargo({ order, shop, onCancel }) {
    const t = useTrans()
    const orderToFargoUrl = ORDER_TO_FARGO.replace('{orderId}', order.id).replace('{shopId}', shop)
    const orderAddFargo = usePostRequest({ url: orderToFargoUrl })

    async function onSubmit(data) {
        await orderAddFargo.request({ data: {
            weight: data.weight,
            width: data.width || 0,
            height: data.height || 0,
            length: data.length || 0,
        } })
        onCancel()
    }

    return (
        <Formik initialValues={{ weight: '', width: '', height: '', length: '', fragile: false }} onSubmit={onSubmit}>
            <Form>
                <Input
                    label={t('fargoWeight')}
                    name="weight"
                    type="number"
                    placeholder="кг"
                    validate={required} />

                <Input
                    label={t('fargoWidth')}
                    name="width"
                    placeholder="см"
                    type="number" />

                <Input
                    label={t('fargoHeight')}
                    name="height"
                    placeholder="см"
                    type="number" />

                <Input
                    label={t('fargoLength')}
                    name="length"
                    placeholder="см"
                    type="number" />

                <div className="columns">
                    <div className="column is-narrow">{t('badProduct')}</div>

                    <div className="column">
                        <Input
                            name="fragile"
                            component=""
                            type="checkbox" />
                    </div>
                </div>

                <Button
                    loading={orderAddFargo.loading}
                    text={t('sendToFargo')}
                    type="submit"
                    icon="checkmark"
                    className="is-success" /> &nbsp;

                <Button
                    onClick={onCancel}
                    icon="close"
                    text={t('close')}
                    className="is-danger" />
            </Form>
        </Formik>
    )
}
