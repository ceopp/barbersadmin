/* eslint-disable no-nested-ternary */
import React from 'react'
import Button from './common/Button'
import {Form, Formik} from "formik";
import {required, validator} from "../utils/validators";
import Input from "./common/Input";
import {integersOnly} from "../utils/number";


export default function CreateBarber({onClick, onCancel, loadServices}) {

  return (
    <div>
      <span className="is-size-5">Введите Имя барбера</span>
      <div className="column">

      </div>
      <Formik
        initialValues={{
          name: '',
          phone: '',
          about: '',
        }}
        onSubmit={(values) => {
          onClick({
            data: {
              ...values,
              phone: `+${integersOnly(values.phone)}`,
              countryId: "3159",
              cityId: "4400"
            }
          });
        }}
      >
        {() => (
          <Form>
            <Input name="name" placeholder="Введите имя" validate={validator(required)}/>
            <Input name="phone" placeholder="Введите номер телефона" validate={validator(required)}/>
            <Input name="about" placeholder="Введите информацию о барбере" validate={validator(required)}/>
            <div className="has-text-right">
              <Button
                text="Создать"
                type="submit"
                className="is-link is-pulled-right ml-1"/> &nbsp;

              <Button
                text="Закрыть"
                icon="close-outline"
                onClick={onCancel}
                className="is-danger is-pulled-right"/> &nbsp;
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
