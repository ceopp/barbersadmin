import React, { useContext, useState } from 'react'
import { Form, Formik } from 'formik'
import Input from './common/Input'
import Button from './common/Button'
import { ShopContext } from './SidebarShop'
import { usePutRequest } from '../hooks/request'
import { domain, SHOP_DETAIL } from '../urls'
import useTrans from '../hooks/trans'

export default function UpdateBotAbout({ initialValues }) {
    const { shop, reloadShop } = useContext(ShopContext)
    const shopUpdate = usePutRequest({ url: SHOP_DETAIL.replace('{shopId}', shop.id) })
    const [image, setImage] = useState(null)
    const [updateImage, setUpdateImage] = useState(false)
    const t = useTrans()

    async function onSubmit(data) {
        const newData = new FormData()
        if (image) {
            newData.append('aboutUsImage', image, image.name)
        }

        newData.append('aboutUs', data.aboutUs)
        newData.append('category', initialValues.category)
        newData.append('currency', initialValues.currency)
        newData.append('name', initialValues.name)
        newData.append('token', initialValues.token)
        newData.append('languages', initialValues.languagesString)

        await shopUpdate.request({ data: newData })
        reloadShop()
    }

    return (
        <Formik onSubmit={onSubmit} initialValues={{ ...initialValues, aboutUsImage: '' }}>
            {({ setFieldValue }) => (
                <Form>
                    <Input
                        label={`ℹ️ ${t('aboutUs')}`}
                        type="text"
                        component="textarea"
                        name="aboutUs" />

                    {updateImage ? (
                        <Input
                            label={t('image')}
                            type="file"
                            onChange={(e) => {
                                setFieldValue('aboutUsImage', e.target.value)
                                setImage(e.target.files[0])
                            }}
                            name="aboutUsImage" />
                    ) : (
                        <div>
                            <p>{t('image')}</p>
                            <img width="300" src={domain + initialValues.aboutUsImage} alt="" />
                            <br />

                            <Button
                                onClick={() => setUpdateImage(true)}
                                icon="image-outline"
                                text={t('changeImage')} />
                        </div>
                    )}

                    <br />

                    <Button
                        text={t('update')}
                        icon="sync"
                        loading={shopUpdate.loading}
                        type="submit"
                        className="is-success is-outlined" />
                </Form>
            )}
        </Formik>
    )
}
