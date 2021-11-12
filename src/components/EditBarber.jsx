/* eslint-disable no-nested-ternary */
import React from 'react'
import Button from './common/Button'
import {Form, Formik} from "formik";
import {required, validator} from "../utils/validators";
import Input from "./common/Input";
import {integersOnly} from "../utils/number";

export default function EditBarber({barber, onClick, onCancel}) {

  return (
    <div>
      <span className="is-size-5">Редактирование профиля барбера</span>
      <div className="column">

      </div>
      <Formik
        initialValues={{
          name: barber.user.name || '',
          phone: barber.user.phone || '',
          about: barber.about ||'',
          cityName: barber.user.cityName ||'',
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
            <Input name="name" label="Имя" placeholder="Введите имя" validate={validator(required)}/>
            <Input name="phone"  label="Телефон" placeholder="Введите номер телефона" validate={validator(required)}/>
            <Input name="about"label="Описание" placeholder="Введите информацию о барбере" validate={validator(required)}/>
            <Input name="cityName" label="Город" placeholder="Введите город" validate={validator(required)}/>
            <div className="has-text-right">
              <Button
                text="Сохранить"
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
