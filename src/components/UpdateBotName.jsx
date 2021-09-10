import React, { useContext } from 'react'
import { Form, Formik } from 'formik'
import Input from './common/Input'
import Button from './common/Button'
import { ShopContext } from './SidebarShop'
import { usePutRequest } from '../hooks/request'
import { SHOP_DETAIL } from '../urls'
import useTrans from '../hooks/trans'

export default function UpdateBotName({ initialValues }) {
    const { shop, reloadShop } = useContext(ShopContext)
    const shopDetail = usePutRequest({ url: SHOP_DETAIL.replace('{shopId}', shop.id) })

    async function updateBotName(data) {
        await shopDetail.request({
            data: {
                ...data,
                languages: shop.languagesString,
            },
        })
        reloadShop()
    }
    const t = useTrans()

    return (
        <Formik onSubmit={updateBotName} initialValues={{ name: '', ...initialValues, aboutUsImage: undefined }}>
            <Form>
                <Input
                    br
                    name="name"
                    label={t('shopName')}
                    placeholder={t('newName')}
                    type="text" />

                <Button
                    text={t('update')}
                    icon="sync"
                    loading={shopDetail.loading}
                    type="submit"
                    className="is-success is-outlined" />
            </Form>
        </Formik>
    )
}
