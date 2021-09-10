import cn from 'classnames'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDeleteRequest } from '../hooks/request'
import { SHOP_DETAIL } from '../urls'
import { required } from '../utils/validators'
import Input from './common/Input'
import Button from './common/Button'

export default function ShopDelete({ shop, onDelete, onCancel }) {
    const shopDeleteRequest = useDeleteRequest({ url: SHOP_DETAIL.replace('{shopId}', shop.id) })
    const [errorMessage, setErrorMessage] = useState(false)
    const history = useHistory()

    const shopName = shop ? shop.name : null

    async function shopDelete(data) {
        if (shopName !== data.shopName) {
            setErrorMessage(true)
            return
        }

        setErrorMessage(false)
        await shopDeleteRequest.request()
        onDelete()
        history.push('/')
    }

    return (
        <Formik onSubmit={shopDelete} initialValues={{ shopName: '' }}>
            <Form>
                <h1>
                    Все данные магазина будут удалены безвозвратно, включая продуктов,
                    заказов, пользователей, вы уверены продолжить?
                    Чтобы удалить магазин, введите полное название магазина в нижнюю форму.<br />
                    Название вашего магазина: <b>{shop.name}</b>
                </h1><br />

                <Input
                    name="shopName"
                    type="text"
                    label="Название магазина"
                    className={cn('input', { 'is-danger': errorMessage })}
                    help={errorMessage ? 'Введите название магазина без ошибок.' : ''}
                    placeholder="Название магазина"
                    validate={required} />

                <Button
                    icon="trash"
                    loading={shopDeleteRequest.loading}
                    type="submit"
                    text="Удалить"
                    className="is-danger"
                    onClick={shopDelete} />&nbsp;

                <Button
                    icon="close"
                    text="Выйти"
                    className="is-info"
                    onClick={onCancel} />
            </Form>
        </Formik>
    )
}
