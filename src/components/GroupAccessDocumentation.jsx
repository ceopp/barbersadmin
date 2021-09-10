import { css, StyleSheet } from 'aphrodite'
import React from 'react'
import useTrans from '../hooks/trans'

export default function GroupAccessDocumentation({ shop }) {
    const t = useTrans()
    return (
        <div>
            <lable className="label">{t('redirectOrder')}</lable>

            <div>
                {t('ifYouWantNotified')} <br />
                {t('ordersFromStore')} <br />
                {t('certainTelegramGroup')} <br /> <br />

                <b>1</b>. {t('disableGroupPrivacy')}
                <b><a href="https://telegram.me/BotFather" className={css(styles.link)}> @Botfather</a></b> <br />
                <b>2</b>. {t('botToAdmin')} <br />
                <b>3</b>. {t('copyToken')}: &nbsp;
                <b className={css(styles.link)}>{shop.bot.groupAccessToken}</b>&nbsp;
                {t('sendBotGroup')} <br />
                <b>4</b>. {t('botWillUnderdtand')} <br /> <br />

            </div>
        </div>
    )
}

const styles = StyleSheet.create({
    link: {
        color: 'black',
        ':hover': {
            color: '#44bcda',
        },
    },
})
