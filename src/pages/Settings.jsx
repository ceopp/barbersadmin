import React, { useContext } from 'react'
import Layout from '../components/Layout'
import useTrans from '../hooks/trans'

import { LanguageContext } from '../contexts/LanguageContext'

export default function Settings() {
    const { lang, setLang } = useContext(LanguageContext)
    const t = useTrans()

    function handleLanguageChange(event) {
        setLang(event.target.value)
    }

    const languageOptions = {
        en: '🇺🇸 English',
        ru: '🇷🇺 Русский',
        uz: '🇺🇿 O\'zbek',
    }
    return (
        <Layout>
            <h3 className="title is-6">{t('settings')}</h3>

            <div className="columns">
                <div className="box column is-5">
                    <label>{t('chooseLanguage')}</label><br /><br />

                    <div className="select">
                        <select className="is-pulled-right"
                            onChange={handleLanguageChange}
                            value={lang}>
                            {Object.entries(languageOptions).map(([id, name]) => (
                                <option key={id} value={id}>{name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
