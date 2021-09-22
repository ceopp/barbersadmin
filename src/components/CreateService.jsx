/* eslint-disable no-nested-ternary */
import React from 'react'
import Button from './common/Button'
import {Form, Formik} from "formik";
import {required, validator} from "../utils/validators";
import Input from "./common/Input";


export default function CreateService({ onClick, onCancel, loadServices }) {

    return (
        <div>
            <span className="is-size-5">Введите название услуги</span>
            <div className="column">

            </div>
            <Formik
                initialValues={{
                    title: ''
                }}
                onSubmit={(values) => {onClick({data: values }); onCancel()}}
            >
                {() => (
                    <Form>
                        <Input name="title" placeholder="Введите название" validate={validator(required)}/>
                        <div className="has-text-right">
                            <Button
                                text="Создать"
                                type="submit"
                                className="is-link is-pulled-right ml-1" /> &nbsp;

                            <Button
                                text="Закрыть"
                                icon="close-outline"
                                onClick={onCancel}
                                className="is-danger is-pulled-right" /> &nbsp;
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
