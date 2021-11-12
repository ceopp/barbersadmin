import React from 'react'
import Button from './common/Button'
import { readableDate } from '../utils/date'


export default function ServiceDetail({ item, onCancel, onUpdate }) {

    return (
        <div>
            <div className="columns">
                <div className="column">
                    <table className="table is-striped is-fullwidth">
                        <tbody>
                            <tr>
                                <td className="is-size-5">Услуга</td>
                                <td className="is-size-5" />
                            </tr>

                            <tr>
                                <td>Название: </td>
                                <td><b>{item.title}</b></td>
                            </tr>

                            <tr>
                                <td>Дата создание:</td>
                                <td>{readableDate(item.createdAt)}</td>
                            </tr>

                            <tr>
                                <td>Последнее изменение:</td>
                                <td>{readableDate(item.updatedAt)}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
            <Button
                text="Изменить"
                icon="pencil-outline"
                onClick={onUpdate}
                className="is-link is-pulled-right ml-1" /> &nbsp;

            <Button
                text="Закрыть"
                icon="close-outline"
                onClick={onCancel}
                className="is-danger is-pulled-right" /> &nbsp;
        </div>
    )
}
