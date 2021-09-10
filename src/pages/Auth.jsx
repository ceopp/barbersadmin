import { css, StyleSheet } from 'aphrodite'
import { Form, Formik } from 'formik'
import React from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import ServerError from '../components/common/ServerError'
import { usePostRequest } from '../hooks/request'
import { AUTH } from '../urls'
import { required, validator } from '../utils/validators'
import { isAuthenticated } from '../utils/auth'
import LayoutAuth from '../components/LayoutAuth'
import logo from '../static/logo.jpg'
import { useMessage } from '../hooks/message'
import { integersOnly } from '../utils/number'

export default function Auth() {
    const history = useHistory()
    const [showMessage] = useMessage()
    const auth = usePostRequest({ url: AUTH, headers: {} })

    if (isAuthenticated()) {
        return <Redirect to="/home" />
    }

    async function onSubmit(data) {
        auth.setError({})
        const { success, error } = await auth.request({ data: { phone: `+${integersOnly(data.phone)}` } })

        if (success) {
            history.push(`/login?phone=${integersOnly(data.phone)}`)
            return
        }

        showMessage(error.data.message, 'is-danger')
    }

    return (
        <LayoutAuth sidebar={(
            <div>
                <h2 className="is-size-5 has-text-weight-bold">Как войти или зарегистривоваться?</h2>
                <p>Введите телефон номер и нажмите на кнопку получить код</p>
            </div>
        )}>

            <div className="has-text-centered">
                <img src={logo} className={css(styles.img)} alt="Logo" />
                <h2 className="is-size-4 has-text-weight-bold">Войдите в систему</h2>
                <br />
            </div>

            <Formik onSubmit={onSubmit} initialValues={{ phone: '' }}>
                <Form>
                    <ServerError error={auth.error} />
                    <Input name="phone" validate={validator(required)} placeholder="Введите телефон" />

                    <div className="field">
                        <div className="control">
                            <Button
                                loading={auth.loading}
                                className="is-primary is-blue is-medium is-fullwidth"
                                text="Получить код"
                                type="submit" />
                        </div>
                    </div>
                </Form>
            </Formik>
        </LayoutAuth>
    )
}

const styles = StyleSheet.create({
    img: {
        width: '10rem',
    },
})
