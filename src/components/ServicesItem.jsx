/* eslint-disable no-nested-ternary */
import React from 'react'
import {readableDate} from '../utils/date'
import Button from './common/Button'
import ServiceDetail from "./ServiceDetail";
import {useModal} from "../hooks/modal";
import EditService from "./EditService";
import {useDeleteRequest, usePostRequest} from "../hooks/request";
import {SERVICE_DELETE, SERVICE_EDIT} from "../urls";


export default function ServiceItem({item, onUpdateServices}) {
  const serviceEdit = usePostRequest({url: SERVICE_EDIT.replace('{id}', item.id)});
  const serviceDelete = useDeleteRequest({url: SERVICE_DELETE.replace('{id}', item.id)});

  const [showEditServiceModal, hideEditServiceModal] = useModal(
    <EditService
      onClick={(value) => serviceEdit.request(value).then(() => onUpdateServices())}
      service={item}
      onCancel={() => hideEditServiceModal()}
    />,
  )

  const [showServiceModal, hideServiceModal] = useModal(
    <ServiceDetail
      onUpdate={showEditServiceModal}
      item={item}
      onCancel={() => hideServiceModal()}/>,
  )

  const handleDeleteService = () => {
    serviceDelete.request()
      .then(({error}) => {
        if (!error) {
          onUpdateServices()
        }
      })
  }

  return (
    <tr>
      <td className="pointer" onClick={showServiceModal}>
        {item.title}
      </td>

      <td className="pointer" onClick={showServiceModal}>
        {readableDate(item.createdAt)}
      </td>

      <td className="pointer" onClick={showServiceModal}>
        {readableDate(item.updatedAt)}
      </td>

      <td className="has-text-right">
        <Button className="pointer is-white" icon="trash-outline" onClick={handleDeleteService}/>
        <Button className="pointer is-white" icon="create-outline" onClick={showEditServiceModal}/>
      </td>
    </tr>
  )
}
