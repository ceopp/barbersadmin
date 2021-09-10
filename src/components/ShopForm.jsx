import cn from 'classnames'
import debounce from 'lodash/debounce'
import { Form, Formik } from 'formik'
import isEmpty from 'lodash/isEmpty'
import React, { useCallback, useState } from 'react'
import { useMessage } from '../hooks/message'
import { useGetRequest } from '../hooks/request'
import { currencies } from '../utils/currency'
import Select from './common/Select'
import { required } from '../utils/validators'
import Input from './common/Input'
import Button from './common/Button'
import ServerError from './common/ServerError'
import { readableName } from '../utils/string'
import useTrans from '../hooks/trans'


export default function ShopForm({ onSubmit, onCancel, loading, error }) {
    const [showToken, setShowToken] = useState(true)
    const [showCategory, setShowCategory] = useState(false)
    const [showLanguage, setShowLanguage] = useState(false)
    const bot = useGetRequest({ baseURL: 'https://api.telegram.org/' })
    const [value, setValue] = useState('')
    const [errorMessage, setErrorMessage] = useState(false)
    const t = useTrans()

    const categories = [
        { name: t('clothing'), id: 'clothing' },
        { name: t('electronics'), id: 'electronics' },
        { name: t('booksFilmsMusic'), id: 'books' },
        { name: t('cosmetics'), id: 'cosmetics' },
        { name: t('bags'), id: 'bags' },
        { name: t('foodDrink'), id: 'food' },
        { name: t('appliances'), id: 'household' },
        { name: t('furniture'), id: 'furniture' },
        { name: t('sports'), id: 'sports' },
        { name: t('toys'), id: 'toys' },
        { name: t('stationary'), id: 'stationary' },
        { name: t('pets'), id: 'pets' },
        { name: t('other'), id: 'other' },
    ]

    const [showMessage] = useMessage()

    const onTokenChange = useCallback(debounce(async (token, setFieldValue) => {
        const { success, response } = await bot.request({ url: `bot${token}/getMe` })

        if (success) {
            setFieldValue('name', readableName(response.result.username))
            setErrorMessage(false)
        } else {
            showMessage(t('wrongToken'), 'is-danger')
            setErrorMessage(true)
        }
        setFieldValue('token', token)
    }, 500), [])

    const language = [
        { name: "O'zbekcha", id: 'uz' },
        { name: 'Русский', id: 'ru' },
        { name: 'English', id: 'en' },
    ]

    const initialValues = { name: '', token: '', languages: '', paymeBusinessToken: '', currency: '' }

    const currency = currencies.map((item) => ({ name: t(item.name), value: item.value }))

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ setFieldValue }) => (
                <Form>
                    <ServerError error={error} />

                    {showToken ? (
                        <div>
                            <label className="label">{t('token')}</label>

                            <div className={cn('control ', { 'is-loading': bot.loading })}>
                                <Input
                                    help={t('enterTokenWithoutError')}
                                    className={cn('is-success is-italic', { 'is-danger': errorMessage })}
                                    name="token"
                                    value={value}
                                    onChange={(event) => {
                                        setValue(event.target.value)
                                        event.persist()
                                        onTokenChange(event.target.value, setFieldValue)
                                    }}
                                    placeholder="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11" /><br />
                            </div>
                            <Input
                                label={t('name')}
                                disabled={isEmpty(bot.response) || errorMessage}
                                help=""
                                name="name"
                                validate={required}
                                placeholder={t('enterBotName')} />

                            <Button
                                text={t('cancel')}
                                icon="close-outline"
                                className="is-danger"
                                onClick={onCancel} />&nbsp;

                            <Button
                                text={t('next')}
                                disabled={isEmpty(bot.response) || errorMessage}
                                icon="arrow-forward-outline"
                                className="is-success"
                                onClick={() => {
                                    setShowCategory(true)
                                    setShowToken(false)
                                }} />
                        </div>
                    ) : null}

                    {showCategory ? (
                        <div>
                            <Select
                                disabled={isEmpty(bot.response) || errorMessage}
                                name="category"
                                validate={required}
                                options={categories}
                                label={t('categorySingular')} /> <br />

                            <Button
                                onClick={onCancel}
                                icon="close-circle"
                                text={t('cancel')}
                                className="is-danger" />&nbsp;

                            <Button
                                text={t('back')}
                                icon="arrow-back-outline"
                                className="is-link"
                                onClick={() => {
                                    setShowCategory(false)
                                    setShowToken(true)
                                }} />&nbsp;

                            <Button
                                text={t('next')}
                                icon="arrow-forward-outline"
                                className="is-success"
                                onClick={() => {
                                    setShowCategory(false)
                                    setShowLanguage(true)
                                }} />

                        </div>
                    ) : null}

                    {showLanguage ? (
                        <div>
                            <Select
                                disabled={isEmpty(bot.response) || errorMessage}
                                name="languages"
                                validate={required}
                                options={language}
                                label={t('selectLang')} />

                            <Select
                                name="currency"
                                label={t('currency')}
                                optionValue="value"
                                options={currency}
                                type="text" />

                            <Button
                                onClick={onCancel}
                                icon="close-circle"
                                text={t('exit')}
                                className="is-danger" />&nbsp;

                            <Button
                                text={t('back')}
                                icon="arrow-back-outline"
                                className="is-link"
                                onClick={() => {
                                    setShowCategory(true)
                                    setShowLanguage(false)
                                }} />&nbsp;

                            <Button
                                loading={loading}
                                text={t('create2')}
                                disabled={errorMessage}
                                type="submit"
                                icon="checkmark-circle"
                                className="is-success" />&nbsp;
                        </div>
                    ) : null}
                </Form>
            )}
        </Formik>
    )
}
