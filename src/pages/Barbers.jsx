import React, {useEffect} from 'react'
import {css, StyleSheet} from 'aphrodite'
import cn from 'classnames'
import Layout from '../components/Layout'
import {BARBERS_LIST, BARBER_CREATE} from '../urls'
import {usePostRequest} from '../hooks/request'
import Button from '../components/common/Button'
import Table from '../components/common/Table'
import BarbersItem from '../components/BarbersItem'
import {useModal} from "../hooks/modal";
import CreateBarber from "../components/CreateBarber";


export default function Barbers() {
  const barbers = usePostRequest({url: BARBERS_LIST});
  const barberCreate = usePostRequest({url: BARBER_CREATE});

  useEffect(() => {
    getBarbers()
    // eslint-disable-next-line
  }, [])

  const getBarbers = () => {
    barbers.request()
  }

  const handleBarberCreate = (value) => {
    barberCreate.request(value)
      .then(({error}) => {
        if (!error) {
          getBarbers()
          hideBarberCreateModal()
        }
      })
  }

  const [showBarberCreateModal, hideBarberCreateModal] = useModal(
    <CreateBarber
      onClick={(value) => handleBarberCreate(value)}
      loadServices={getBarbers}
      onCancel={() => hideBarberCreateModal()}
    />,
  )

  return (
    <Layout>
      <div className="columns is-mobile">

        <div className="column">
          <h1 className={cn(css(styles.titleName))}>
            Барберы
          </h1>
        </div>

        <div className="column">
          <Button
            text="Создать"
            icon="add-outline"
            onClick={showBarberCreateModal}
            className="is-link is-outlined is-pulled-right"/>
        </div>
      </div>

      <div className="box">
        <Table
          emptyMessage="Нет барберов"
          loading={barbers.loading}
          items={barbers.response ? barbers.response : []}
          columns={{
            name: 'Имя пользователя',
            phone: 'Телефон',
            about: 'Описание',
            createdAt: 'Дата создание',
            updatedAt: 'Последное изменение',
            active: '',
          }}
          renderItem={(item) => (
            <BarbersItem
              key={item.id}
              onUpdate={getBarbers}
              item={item}/>
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
