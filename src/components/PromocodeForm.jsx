import React from 'react'
import { Form, Formik } from 'formik'
import moment from 'moment'
import { required } from '../utils/validators'
import useTrans from '../hooks/trans'

import Button from './common/Button'
import Input from './common/Input'
import Select from './common/Select'

export default function PromocodeForm({ onSubmit, onCancel, loading, initialValues }) {
    const values = {
        code: Math.random().toString(35).substring(5),
        percent: 0,
        limit: '',
        type: '',
        ...initialValues,
        startsAt: initialValues ? (
            initialValues.startsAt.slice(0, -4)
        ) : (
            moment(Date.now()).format(moment.HTML5_FMT.DATETIME_LOCAL)
        ),
        endsAt: initialValues ? (
            initialValues.endsAt.slice(0, -4)
        ) : (
            moment(Date.now()).add(1, 'month').format(moment.HTML5_FMT.DATETIME_LOCAL)
        ),
    }
    const t = useTrans()

    const typeOption = [
        {
            name: t('freeDelivery'),
            id: 'free_delivery',
        },
        {
            name: t('percent'),
            id: 'discount',
        },
    ]

    return (
        <Formik initialValues={values} onSubmit={onSubmit}>
            {({ values: { type } }) => (
                <Form>
                    <Select
                        label={t('type')}
                        validate={required}
                        name="type"
                        options={typeOption} />

                    {type === 'discount' ? (
                        <Input
                            label={t('percent')}
                            name="percent"
                            placeholder="15%"
                            type="number"
                            validate={required} />
                    ) : null}

                    <Input
                        label={t('enterPromocode')}
                        name="code"
                        placeholder="mrbeast"
                        validate={required} />

                    <Input
                        label={t('useAmount')}
                        type="number"
                        validate={required}
                        name="limit" />

                    <Input
                        label={t('promocodeStart')}
                        type="datetime-local"
                        validate={required}
                        name="startsAt" />

                    <Input
                        label={t('promocodeEnd')}
                        type="datetime-local"
                        validate={required}
                        name="endsAt" />

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
