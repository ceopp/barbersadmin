import React, { useEffect } from 'react'
import { css, StyleSheet } from 'aphrodite'
import cn from 'classnames'
import Layout from '../components/Layout'
import { SERVICES_LIST } from '../urls'
import { useGetRequest } from '../hooks/request'
import Button from '../components/common/Button'
import Table from '../components/common/Table'
import ServicesItem from '../components/ServicesItem'


export default function Barbers() {
    const services = useGetRequest({ url: SERVICES_LIST })

    useEffect(() => {
        services.request()
        // eslint-disable-next-line
    }, [])

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
                        // onClick={createCategoryModal}
                        className="is-link is-outlined is-pulled-right" />
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
                            onUpdate={services.request}
                            onDelete={services.request}
                            item={item} />
                    )} />
            </div>
        </Layout>
    )
}

const styles = StyleSheet.create({
    titleName: {
        fontWeight: '500',
    },
})
