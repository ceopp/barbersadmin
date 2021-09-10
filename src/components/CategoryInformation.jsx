import React from 'react'
import isEmpty from 'lodash/isEmpty'
import { css, StyleSheet } from 'aphrodite'
import Card from './common/Card'
import Button from './common/Button'
import { CATEGORY_DELETE, domain } from '../urls'
import useTrans from '../hooks/trans'
import { usePutRequest } from '../hooks/request'

export default function CategoryInformation({ category, onSuccess, shopId, onCancel }) {
    const t = useTrans()
    const categoryUpdate = usePutRequest({
        url: CATEGORY_DELETE.replace('{shopId}', shopId).replace('{id}', category.id),
    })

    async function onSubmit() {
        await categoryUpdate.request()
        onSuccess()
    }

    return (
        <div>
            {category.image ? (
                <div>
                    <label>{t('image')}:</label>

                    <span className="pointer">
                        <ion-icon onClick={onSubmit} name="trash-outline" />
                    </span>

                    <div>
                        <img className={css(styles.image)} src={domain + category.image} alt="alt" />
                    </div>
                </div>
            ) : null}<br />

            {category.description ? (
                <div>
                    <label>{t('description')}:</label>

                    <div>
                        <Card>
                            {category.description}
                        </Card><br />
                    </div>
                </div>
            ) : null}

            {isEmpty(category.image) && isEmpty(category.description) ? (
                <h1 className="is-size-4 has-text-centered">{t('nothing')}</h1>
            ) : null}

            <Button
                icon="close-outline"
                text={t('cancel')}
                className="is-danger"
                onClick={onCancel} />
        </div>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100px',
        height: '100px',
    },
})
