import React, {useState} from 'react'
import Button from './common/Button'
import { readableDate } from '../utils/date'
import Table from './common/Table'
import {useGetRequest} from "../hooks/request";
import {BARBER_ACTIVATE} from "../urls";

export default function BarbersDetail({ item, onCancel, onUpdate }) {
    const barberActive = useGetRequest({ url: BARBER_ACTIVATE.replace('{id}', item.id) })
    const [isActive, setActive] = useState(item.isActive);

    const activateBarber = () => {
        barberActive.request();
        setActive(true)
        onUpdate();
    }

    return (
        <div>
            <div className="columns">
                <div className="column is-narrow">
                    {item.user.photo ? (
                        // eslint-disable-next-line react/jsx-no-target-blank
                        <a href={item.user.photo} target="_blank" className="has-text-black">
                            Фото
                            <img className="image is-128x128" src={item.user.photo} alt="alt" />
                        </a>
                    ) : (
                        <img className="image is-128x128" alt="alt" />
                    )}
                </div>

                <div className="column">
                    <table className="table is-striped is-fullwidth">
                        <tbody>
                            <tr>
                                <td className="is-size-5">Ползователь</td>
                                <td className="is-size-5" />
                            </tr>

                            <tr>
                                <td>Имя: </td>
                                <td><b>{item.user.name}</b></td>
                            </tr>

                            <tr>
                                <td>Телефон:</td>
                                <td>{item.user.phone}</td>
                            </tr>

                            <tr>
                                <td>Город:</td>
                                <td>{item.user.city.name}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
            <hr />

            <div className="columns">
                <div className="column is-narrow">
                    {item.portfolio[0] ? (
                        // eslint-disable-next-line react/jsx-no-target-blank
                        <a href={item.portfolio[0]} target="_blank" className="has-text-black">
                            Фото
                            <img className="image is-128x128" src={item.portfolio[0]} alt="alt" />
                        </a>
                    ) : (
                        <img className="image is-128x128" alt="alt" />
                    )}
                </div>

                <div className="column">
                    <table className="table is-striped is-fullwidth">
                        <tbody>
                            <tr>
                                <td className="is-size-5">Барбер</td>
                                <td className="is-size-5" />
                            </tr>

                            <tr>
                                <td>Дата создание: </td>
                                <td><b>{readableDate(item.createdAt)}</b></td>
                            </tr>

                            <tr>
                                <td>Последное изменение:</td>
                                <td>{readableDate(item.updatedAt)}</td>
                            </tr>

                            <tr>
                                <td>Активно:</td>
                                <td>{isActive ? 'Да' : 'Нет'}</td>
                            </tr>

                            <tr>
                                <td>Рейтинг:</td>
                                <td>{item.rating}</td>
                            </tr>

                            <tr>
                                <td>Код телефона:</td>
                                <td>{item.phoneCode}</td>
                            </tr>

                            <tr>
                                <td>Места:</td>
                                <td>
                                    {item.orderPlace.map((orderPlace) => <div key={orderPlace}>{orderPlace}</div>)}
                                </td>
                            </tr>

                            <tr>
                                <td>Описание:</td>
                                <td>{item.about}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <hr />

            <h1 className="is-size-4">Услуги</h1>

            <Table
                items={item.services ? item.services : []}
                columns={{ name: 'Название', price: 'Цена' }}
                renderItem={(service) => (
                    <tr key={service.id}>
                        <td>{service.title}</td>
                        <td>{service.price}</td>
                    </tr>
                )} /><br />

            {!isActive
                ? <Button
                    text="Активировать"
                    icon="pencil-outline"
                    onClick={() => activateBarber()}
                    className="is-link is-pulled-right ml-1"
                />
                : null
            }

            <Button
                text="Закрыть"
                icon="close-outline"
                onClick={onCancel}
                className="is-danger is-pulled-right" /> &nbsp;
        </div>
    )
}
