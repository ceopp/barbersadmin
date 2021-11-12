/* eslint-disable no-nested-ternary */
import React from 'react'
import {readableDate} from '../utils/date'
import Button from './common/Button'
import {useModal} from '../hooks/modal'
import BarbersDetail from './BarbersDetail'
import {useDeleteRequest, usePostRequest} from "../hooks/request";
import EditBarber from "./EditBarber";
import {BARBER_DELETE, BARBER_EDIT} from "../urls";


export default function BarbersItem({item, onUpdate}) {
  const barberEdit = usePostRequest({url: BARBER_EDIT.replace('{id}', item.id)});
  const barberDelete = useDeleteRequest({url: BARBER_DELETE.replace('{id}', item.id)});

  const deleteBarber = () => {
    barberDelete.request()
      .then(({error}) => {
        if (!error) {
          onUpdate()
        }
      })
  }

  const editBarber = (data) => {
    barberEdit.request(data)
      .then(({error}) => {
        if (!error) {
          onUpdate()
          hideEditBarberModal()
        }
      })
  }
  const [showBarbersModal, hideBarbersModal] = useModal(
    <BarbersDetail
      onUpdate={onUpdate}
      item={item}
      onCancel={() => hideBarbersModal()}/>,
  )

  const [showEditBarberModal, hideEditBarberModal] = useModal(
    <EditBarber
      onClick={editBarber}
      barber={item}
      onCancel={() => hideEditBarberModal()}/>,
  )

  return (
    <tr>
      <td className="pointer" onClick={showBarbersModal}>
        {item.user.name}
      </td>

      <td className="pointer" onClick={showBarbersModal}>
        {item.user.phone}
      </td>

      <td className="pointer" onClick={showBarbersModal}>
        {item.about}
      </td>

      <td className="pointer" onClick={showBarbersModal}>
        {readableDate(item.createdAt)}
      </td>

      <td className="pointer" onClick={showBarbersModal}>
        {readableDate(item.updatedAt)}
      </td>

      <td className="has-text-right">
        <Button className="pointer is-white" icon="trash-outline" onClick={deleteBarber}/>
        <Button className="pointer is-white" icon="create-outline" onClick={showEditBarberModal}/>
      </td>
    </tr>
  )
}
