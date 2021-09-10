import { Form, Formik } from 'formik'
import React, { useContext } from 'react'
import { currencies } from '../utils/currency'
import Button from './common/Button'
import { usePutRequest } from '../hooks/request'
import { SHOP_DETAIL } from '../urls'
import { ShopContext } from './SidebarShop'
import Select from './common/Select'
import useTrans from '../hooks/trans'


export default function UpdateBotCurrency({ initialValues }) {
    const { shop } = useContext(ShopContext)
    const shopUpdate = usePutRequest({ url: SHOP_DETAIL.replace('{shopId}', shop.id) })
    const t = useTrans()

    async function onSubmit(data) {
        await shopUpdate.request({
            data: {
                ...data,
                category: shop.category,
                languages: shop.languagesString,
                name: shop.name,
                currency: data.currency,
            },
        })
    }

    const currency = currencies.map((item) => ({ name: t(item.name), value: item.value }))

    return (
        <Formik onSubmit={onSubmit} initialValues={{ currency: '', ...initialValues, aboutUsImage: undefined }}>
            <Form>
                <Select
                    name="currency"
                    label={t('currency')}
                    optionValue="value"
                    options={currency}
                    type="text" />

                <Button
                    text={t('update')}
                    icon="sync"
                    loading={shopUpdate.loading}
                    type="submit"
                    className="is-success is-outlined" />
            </Form>
        </Formik>
    )
}
