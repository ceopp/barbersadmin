import { Form, Formik } from 'formik'
import React, { useContext } from 'react'
import map from 'lodash/map'
import Button from './common/Button'
import { usePutRequest } from '../hooks/request'
import { SHOP_DETAIL } from '../urls'
import { ShopContext } from './SidebarShop'
import { required } from '../utils/validators'
import useTrans from '../hooks/trans'
import MultiSelect from './common/MultiSelect'
import { languages, position } from '../utils/position'


export default function UpdateBotLanguage() {
    const { shop } = useContext(ShopContext)
    const shopUpdate = usePutRequest({ url: SHOP_DETAIL.replace('{shopId}', shop.id) })
    const t = useTrans()

    async function onSubmit(data) {
        await shopUpdate.request({
            data: {
                ...data,
                category: shop.category,
                languages: map(data.languages, 'value').toString(),
                name: shop.name,
            },
        })
    }
    const options = Object.entries(languages).map(([value, label]) => ({ label, value }))
    const language = shop.languages.slice(1, -1).replace(/['"]+/g, '').split(', ').map(
        (item) => ({ label: position(item), value: item }),
    )

    return (
        <Formik initialValues={{
            ...shop,
            languages: language,
            token: shop.bot.token,
            aboutUsImage: undefined,
        }} onSubmit={onSubmit}>
            <Form>
                <MultiSelect
                    options={options}
                    name="languages"
                    validate={required}
                    label={t('selectLang')} />

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
