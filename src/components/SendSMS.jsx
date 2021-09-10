import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import Input from './common/Input'
import { required } from '../utils/validators'
import Button from './common/Button'
import { usePostRequest } from '../hooks/request'
import { SEND_SMS } from '../urls'
import useTrans from '../hooks/trans'

export default function SendSMS({ onSuccess, onCancel, shopId }) {
    const sendSms = usePostRequest({ url: SEND_SMS.replace('{shopId}', shopId) })
    const [image, setImage] = useState(null)

    async function sendSMS(data, actions) {
        const { success } = await sendSms.request({ data })

        if (success) {
            actions.resetForm()
            onSuccess()
        }
    }

    function handleSubmit(data, actions) {
        const newData = new FormData()

        if (image) {
            newData.append('image', image, image.name)
        }
        newData.append('sms', data.sms)
        newData.append('shopId', shopId)

        sendSMS(newData, actions)
    }

    const t = useTrans()

    return (
        <Formik onSubmit={handleSubmit} initialValues={{ sms: '', image: '' }}>
            {({ setFieldValue }) => (
                <Form>
                    <Input
                        label={t('description')}
                        type="text"
                        validate={required}
                        component="textarea"
                        name="sms" />

                    <Input
                        label={t('image')}
                        type="file"
                        onChange={(e) => {
                            setFieldValue('image', e.target.value)
                            setImage(e.target.files[0])
                        }}
                        name="image" />

                    <Button
                        loading={sendSms.loading}
                        type="submit"
                        icon="send-outline"
                        className="is-success"
                        text={t('sendOut')} />&nbsp;

                    <Button
                        className="is-danger"
                        text={t('cancel')}
                        icon="close"
                        onClick={onCancel} />
                </Form>
            )}
        </Formik>
    )
}
