import React, {useEffect, useState} from 'react'
import {css, StyleSheet} from 'aphrodite'
import cn from 'classnames'
import Layout from '../components/Layout'
import {SERVICES_CREATE, SERVICES_LIST} from '../urls'
import {useGetRequest, usePostRequest} from '../hooks/request'
import Button from '../components/common/Button'
import Table from '../components/common/Table'
import ServicesItem from '../components/ServicesItem'
import {useModal} from "../hooks/modal";
import CreateService from "../components/CreateService";

export default function Services() {
  const services = useGetRequest({url: SERVICES_LIST});
  const serviceCreate = usePostRequest({url: SERVICES_CREATE});

  useEffect(() => {
    loadServices()
    // eslint-disable-next-line
  }, [])

  const loadServices = () => {
    services.request()
  }

  const [showBarbersModal, hideBarbersModal] = useModal(
    <CreateService
      onClick={(value) => serviceCreate.request(value).then(() => {
        loadServices()
      })}
      onCancel={() => hideBarbersModal()}
      loadServices={loadServices}
    />,
  )

  return (
    <Layout>
      <div className="columns is-mobile">

        <div className="column">
          <h1 className={cn(css(styles.titleName))}>
            Услуги
          </h1>
        </div>

        <div className="column">
          <Button
            text="Создать"
            icon="add-outline"
            onClick={showBarbersModal}
            className="is-link is-outlined is-pulled-right"/>
        </div>
      </div>

      <div className="box">
        <Table
          emptyMessage="Нет услуг"
          loading={services.loading}
          items={services.response ? services.response : []}
          columns={{
            title: 'Название услуги',
            createdAt: 'Дата создание',
            updatedAt: 'Последное изменение',
            active: '',
          }}
          renderItem={(item) => (
            <ServicesItem
              key={item.id}
              item={item}
              onUpdateServices={loadServices}
            />
          )}/>
      </div>
    </Layout>
  )
}

const styles = StyleSheet.create({
  titleName: {
    fontWeight: '500',
  },
})
