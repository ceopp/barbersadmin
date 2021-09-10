import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import find from 'lodash/find'
import range from 'lodash/range'
import { css, StyleSheet } from 'aphrodite'
import cn from 'classnames'
import { useLoad } from '../hooks/request'
import { CATEGORY_LIST } from '../urls'
import { limitFileSize, max, required, validator } from '../utils/validators'
import useTrans from '../hooks/trans'

import Input from './common/Input'
import Button from './common/Button'
import Select from './common/Select'

export default function ProductForm({ onSubmit, onCancel, loading, initialValues, shopId }) {
    const [showAttribute, setShowAttribute] = useState(false)

    function addKey() {
        if (initialValues && initialValues.attributes) {
            let key = 0
            return initialValues.attributes.map((initial) => {
                key += 1
                return { key, price: initial.price, name: initial.name }
            })
        }
        return [{ name: 'Стандарт', key: 1 }]
    }

    const [attributesCount, setAttributesCount] = useState(
        initialValues ? range(1, initialValues.attributes.length + 1) : [1],
    )

    useEffect(() => {
        if (initialValues) {
            setShowAttribute(true)
        }
        // eslint-disable-next-line
    }, [])

    const [attributes, setAttributes] = useState(addKey())
    const categories = useLoad({
        url: CATEGORY_LIST.replace('{shopId}', shopId),
        params: { for_create: true, size: 999 },
    }, [])
    const t = useTrans()
    const [image, setImage] = useState(null)

    let values = {
        name: '',
        category: '',
        description: '',
        price: '',
        ...initialValues,
        attributePrice1: '',
        attributeName1: 'Стандарт',
        image: '',
    }

    if (initialValues) {
        let key = 1
        initialValues.attributes.map((item) => {
            values = {
                ...values,
                [`attributeName${key}`]: item.name,
                [`attributePrice${key}`]: item.price,
                [`inStock${key}`]: item.inStock.toString(),
            }
            key += 1
            return { name: item.name, price: item.price, key }
        })
    }

    function handleSubmit(data, actions) {
        const newData = new FormData()

        if (image) {
            newData.append('image', image, image.name)
        }
        newData.append('name', data.name)
        newData.append('category', data.category.id ? data.category.id : data.category)
        newData.append('description', data.description)
        newData.append('shopId', shopId)

        onSubmit(newData, actions, attributes)
    }

    function addAttribute(setFieldValue) {
        const key = attributesCount[attributesCount.length - 1] + 1
        setFieldValue(`attributeName${key}`, '')
        setFieldValue(`attributePrice${key}`, '')
        setAttributesCount([...attributesCount, key])
    }

    function onChangeAttribute(value, name, key) {
        if (!find(attributes, { key })) {
            setAttributes([...attributes, { [name]: value, key }])
            return
        }
        // eslint-disable-next-line array-callback-return,consistent-return
        const attr = attributes.map((i) => {
            if (key === i.key) {
                return { ...i, [name]: value }
            }

            return i
        })
        setAttributes(attr)
    }

    function removeAttribute(key) {
        const newAttribute = attributes.filter((attr) => attr.key !== key)
        setAttributes(newAttribute)
        const newAttributeCount = attributesCount.filter((count) => count !== key)
        setAttributesCount(newAttributeCount)
    }

    function removeAllAttribute() {
        setAttributes([attributes[0]])
    }

    const statusPaid = [
        { name: t('available'), id: true },
        { name: t('notAvailable'), id: false },
    ]

    return (
        <Formik initialValues={values} onSubmit={handleSubmit}>
            {({ setFieldValue }) => (
                <Form>
                    <Input
                        label={t('enterName')}
                        name="name"
                        placeholder={t('whiskas')}
                        validate={required} />

                    <Select
                        label={t('categorySingular')}
                        validate={required}
                        name="category"
                        options={categories.response ? categories.response.results : []} />

                    {!showAttribute ? (
                        <Input
                            label={t('price')}
                            name="attributePrice1"
                            placeholder="8900"
                            onChange={({ target }) => {
                                onChangeAttribute(target.value, 'price', 1)
                                setFieldValue('attributePrice1', target.value)
                            }}
                            type="number"
                            validate={validator(required, max(99999999))} />
                    ) : null}

                    <Input
                        label={t('description')}
                        type="text"
                        validate={required}
                        component="textarea"
                        name="description" />

                    <Input
                        label={t('image')}
                        type="file"
                        help={t('dontUploadImage')}
                        onChange={(e) => {
                            setFieldValue('image', e.target.value)
                            setImage(e.target.files[0])
                        }}
                        validate={limitFileSize(1, image)}
                        name="image" />

                    {!showAttribute ? (
                        <span onClick={() => setShowAttribute(!showAttribute)}
                            className="pointer">
                            {t('createAttribute')}
                            <br /><br />
                        </span>
                    ) : null}

                    {showAttribute ? (
                        (attributesCount.map((item) => (
                            <div key={item}>
                                <div className="field is-horizontal" key={item}>
                                    <div className="field-body">
                                        <Input
                                            label={t('attribute')}
                                            placeholder={t('attribute')}
                                            name={`attributeName${item}`}
                                            onChange={({ target }) => {
                                                onChangeAttribute(target.value, 'name', item, setFieldValue)
                                                setFieldValue(`attributeName${item}`, target.value)
                                            }}
                                            type="text"
                                            validate={required} />

                                        <Input
                                            label={t('price')}
                                            name={`attributePrice${item}`}
                                            placeholder="8900"
                                            onChange={({ target }) => {
                                                onChangeAttribute(target.value, 'price', item)
                                                setFieldValue(`attributePrice${item}`, target.value)
                                            }}
                                            type="number"
                                            validate={validator(required, max(99999999))} />

                                        <Select
                                            name={`inStock${item}`}
                                            label={t('inStock')}
                                            onChange={(e) => {
                                                onChangeAttribute(e.target.value, 'in_stock', item)
                                                setFieldValue(`inStock${item}`, e.target.value)
                                            }}
                                            options={statusPaid} />

                                        <div>
                                            {attributesCount.length !== 1 ? (
                                                <Button
                                                    className={cn('is-link', css(styles.removeAttribute))}
                                                    icon="trash-outline"
                                                    onClick={() => removeAttribute(item)}
                                                />
                                            ) : null}
                                        </div><br />

                                    </div>
                                </div>
                            </div>
                        )))
                    ) : null}

                    {showAttribute ? (
                        <div className="columns">
                            <span onClick={() => addAttribute(setFieldValue)}
                                className={cn('pointer column is-narrow', css(styles.attributeCreate))}>
                                {t('createAttribute')}
                            </span><br /><br />

                            <span
                                className={cn('pointer column', css(styles.attributeDelete))}
                                onClick={() => {
                                    setShowAttribute(false)
                                    removeAllAttribute()
                                }}>
                                {t('deleteAttribute')}
                            </span>
                        </div>
                    ) : null}

                    <Button
                        loading={loading}
                        text={t('save')}
                        type="submit"
                        icon="checkmark"
                        className="is-success" /> &nbsp;

                    <Button
                        onClick={onCancel}
                        icon="close"
                        text={t('cancel')}
                        className="is-danger" />
                </Form>
            )}
        </Formik>
    )
}

const styles = StyleSheet.create({
    removeAttribute: {
        marginTop: '24px',
    },
    attributeCreate: {
        marginTop: '3px',
        color: '#1ABC9C',
    },
    attributeDelete: {
        marginTop: '3px',
        color: 'red',
    },
})
