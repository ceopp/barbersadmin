import { Form, Formik } from 'formik'
import React, { useContext } from 'react'
import Input from './common/Input'
import Button from './common/Button'
import { useGetRequest, usePutRequest } from '../hooks/request'
import { SHOP_DETAIL } from '../urls'
import { ShopContext } from './SidebarShop'
import { useMessage } from '../hooks/message'
import BotFatherLogo from '../static/botFatherLogo.png'
import useTrans from '../hooks/trans'


export default function UpdateBotToken({ initialValues }) {
    const bot = useGetRequest({ baseURL: 'https://api.telegram.org/' })
    const { shop, reloadShop } = useContext(ShopContext)
    const shopDetail = usePutRequest({ url: SHOP_DETAIL.replace('{shopId}', shop.id) })
    const [showMessage] = useMessage()
    const t = useTrans()

    async function updateBotToken(data) {
        const { success } = await bot.request({ url: `bot${data.token}/getMe` })

        if (!success) {
            showMessage(t('wrongToken'), 'is-danger')
            return
        }

        const { error } = await shopDetail.request({
            data: {
                ...data,
                category: shop.category,
                languages: shop.languagesString,
                name: shop.name,
                token: data.token,
            },
        })

        if (error) {
            showMessage(t('botInSystem'), 'is-danger')
            return
        }

        reloadShop()
    }

    return (
        <Formik onSubmit={updateBotToken} initialValues={{ token: '', ...initialValues, aboutUsImage: undefined }}>
            <Form>
                <Input
                    br
                    imgSrc={BotFatherLogo}
                    name="token"
                    label="BotFather Telegram API Token"
                    placeholder={t('newToken')}
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
