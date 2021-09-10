import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { css, StyleSheet } from 'aphrodite'
import cn from 'classnames'
import reject from 'lodash/reject'
import { useLoad } from '../hooks/request'
import { CATEGORY_LIST } from '../urls'
import { emojiValidate, limitFileSize, required, validator } from '../utils/validators'
import Input from './common/Input'
import Button from './common/Button'
import Select from './common/Select'
import EmojiPicker from './common/EmojiPicker'
import useTrans from '../hooks/trans'


export default function CategoryForm({ onSubmit, onCancel, loading, initialValues, shopId, category }) {
    const categories = useLoad({
        url: CATEGORY_LIST.replace('{shopId}', shopId),
        params: { size: 999 },
    }, [])
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [image, setImage] = useState(null)
    const t = useTrans()

    function handleSubmit(data, actions) {
        const newData = new FormData()

        if (image) {
            newData.append('image', image, image.name)
        }
        newData.append('name', data.name)
        newData.append('emoji', data.emoji)
        newData.append('parent', data.parent || '')
        newData.append('description', data.description)
        newData.append('shopId', shopId)

        onSubmit(newData, actions)
    }
    return (
        <Formik initialValues={{
            name: '',
            parent: '',
            description: '',
            emoji: '',
            ...initialValues,
            image: '',
        }} onSubmit={handleSubmit}>
            {({ values: { emoji }, setFieldValue }) => (
                <Form>
                    {showEmojiPicker ? (
                        <EmojiPicker name="emoji" onCancel={() => setShowEmojiPicker(false)} />
                    ) : (
                        <div>
                            <Input
                                label={t('enterName')}
                                name="name"
                                validate={validator(emojiValidate, required)}
                                placeholder={t('catFood')} />

                            <Select
                                empty
                                label={t('parent')}
                                help={t('optionalField')}
                                name="parent"
                                options={categories.response
                                    ? reject(categories.response.results, { id: category ? category.id : '' })
                                    : []} /><br />

                            <div className={cn('columns', css(styles.button))}>
                                <Input
                                    value={emoji ? `${t('chooseEmoji')}: ${emoji}` : t('chooseEmoji')}
                                    type="button"
                                    name="emoji"
                                    onClick={() => setShowEmojiPicker(true)} /><br />
                            </div>

                            <Input
                                label={t('description')}
                                type="text"
                                help={t('optionalField')}
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
                                validate={validator(() => {}, limitFileSize(1, image))}
                                name="image" />

                            <Button
                                loading={loading}
                                text={t('create')}
                                type="submit"
                                icon="checkmark-outline"
                                className="is-success" /> &nbsp;

                            <Button
                                onClick={onCancel}
                                icon="close-outline"
                                text={t('cancel')}
                                className="is-danger" />
                        </div>
                    )}
                </Form>
            )}
        </Formik>
    )
}

const styles = StyleSheet.create({
    button: {
        marginLeft: '1px',
    },
})
