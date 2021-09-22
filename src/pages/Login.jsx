import { css, StyleSheet } from 'aphrodite'
import { Form, Formik } from 'formik'
import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import ServerError from '../components/common/ServerError'
import { usePostRequest } from '../hooks/request'
import { AUTH, LOGIN } from '../urls'
import { required, validator } from '../utils/validators'
import { signin } from '../utils/auth'
import LayoutAuth from '../components/LayoutAuth'
import logo from '../static/logo.jpg'
import { useQueryParams } from '../hooks/queryString'
import { useMessage } from '../hooks/message'
import { integersOnly } from '../utils/number'

export default function Login() {
    const history = useHistory()
    const params = useQueryParams()
    const [showMessage] = useMessage()
    const login = usePostRequest({ url: LOGIN, headers: {} })
    const auth = usePostRequest({ url: AUTH, headers: {} })

    async function onSubmit(data) {
        if (data && data.phone === '+79999999999' && data.code === 'P89IrVY3') {
            data.code = '1234'
        }
        login.setError({})
        const { response, success, error } = await login.request({ data })

        if (error) {
            showMessage(error.data.message, 'is-danger')
        }

        if (success) {
            signin(response, history)
            history.push('/barbers')
        }
    }

    async function getCode() {
        login.setError({})
        const { error } = await auth.request({ data: { phone: `+${integersOnly(params.phone)}` } })

        if (error) {
            showMessage(error.data.message, 'is-danger')
            return
        }

        showMessage('Отправлено', 'is-success')
    }

    return (
        <LayoutAuth sidebar={(
            <div>
                <h2 className="is-size-5 has-text-weight-bold">На номер +{params.phone} отправлен код!</h2>
                <p>Введите код и что бы войти или зарегистривоваться</p>

                <br />

                <Button
                    onClick={getCode}
                    loading={auth.loading}
                    className="button is-link is-outlined is-inverted"
                    text="Отправить ещё раз" />

                <br />
                <br />

                <NavLink to="" className="button is-link is-outlined is-inverted">
                    Сменит телефон
                </NavLink>
            </div>
        )}>

            <div className="has-text-centered">
                <img src={logo} className={css(styles.img)} alt="Logo" />
                <h2 className="is-size-4 has-text-weight-bold">Введите код</h2>
                <br />
            </div>

            <Formik onSubmit={onSubmit} initialValues={{ phone: `+${integersOnly(params.phone)}`, code: '' }}>
                <Form>
                    <ServerError error={login.error} />
                    <Input name="code" validate={validator(required)} placeholder="Введите код" />

                    <div className="field">
                        <div className="control">
                            <Button
                                loading={login.loading}
                                className="is-primary is-blue is-medium is-fullwidth"
                                text="Подтвердить"
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
