/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react'
import { StyleSheet, css } from 'aphrodite'
import { usePostRequest } from '../hooks/request'
import { SHOP_LIST } from '../urls'
import GroupAccessDocumentation from './GroupAccessDocumentation'
import ShopForm from './ShopForm'
import BotFatherLogo from '../static/botFatherLogo.png'
import Button from './common/Button'
import useTrans from '../hooks/trans'

export default function ShopCreate({ onCancel, onSuccess }) {
    const shopCreate = usePostRequest({ url: SHOP_LIST })
    const t = useTrans()

    async function onSubmit(data) {
        const languages = [data.languages] // TODO make languages field multiselect
        await shopCreate.request({
            data: {
                ...data,
                languages: languages.join(),
            },
        })
    }

    return shopCreate.response ? (
        <Fragment>
            <GroupAccessDocumentation shop={shopCreate.response} />

            <Button
                onClick={onSuccess}
                icon="close-outline"
                className="is-success"
                text="Понятно" />
        </Fragment>
    ) : (
        <div>
            <p style={{ position: 'relative' }}>
                <i>
                    1. {t('openTelegram')}. <br />
                    2. {t('enterInSearch')}
                </i>

                <b><a href="https://telegram.me/BotFather" className={css(styles.link)}> @Botfather</a></b>,

                <i> {t('find')}
                    <a href="https://telegram.me/BotFather" className={css(styles.link)}> {t('botFather')} </a>
                    {t('and')} {t('enterPlural')}.
                    <a href="https://telegram.me/BotFather" target="blank">
                        <img className={css(styles.botFatherImg)} src={BotFatherLogo} alt="" />
                    </a>
                    <br />
                    3. {t('enterNewBot')}. <br />
                    4. {t('copyTokenApi')}. <br />
                    5. {t('enterBotToken')}. <br />
                </i>
            </p>
            <br />

            <ShopForm
                onSubmit={onSubmit}
                onCancel={onCancel}
                loading={shopCreate.loading}
                error={shopCreate.error} />
        </div>
    )
}

const styles = StyleSheet.create({
    botFatherImg: {
        width: '30px',
        position: 'absolute',
        top: '23px',
        cursor: 'pointer',
        transition: '.15s',
        ':hover': {
            transform: 'translateY(-5px)',
        },
    },
    link: {
        color: 'black',
        ':hover': {
            color: '#44bcda',
        },
    },
})
