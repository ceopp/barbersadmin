import React from 'react'
import Card from './common/Card'
import Button from './common/Button'
import useTrans from '../hooks/trans'

export default function SmsMailingIinformation({ sms, onCancel }) {
    const t = useTrans()
    return (
        <div>
            <b>ID: </b><b>{sms.id}</b><br />

            <b>{t('countPerson')}: </b><b>{sms.count}</b><br />

            <b>{t('description')}: </b><br />
            <Card>
                {sms.sms}
            </Card><br />

            <Button
                icon="close-outline"
                text={t('cancel')}
                className="is-danger"
                onClick={onCancel} />
        </div>
    )
}
