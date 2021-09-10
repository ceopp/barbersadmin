import React, { Fragment, useContext, useEffect, useState } from 'react'
import { css, StyleSheet } from 'aphrodite'
import cn from 'classnames'
import sortBy from 'lodash/sortBy'
import Button from '../components/common/Button'
import Table from '../components/common/Table'
import { useLoad, usePutRequest } from '../hooks/request'
import { CATEGORY_LIST, CATEGORY_MOVE } from '../urls'
import { useModal } from '../hooks/modal'
import CategoryCreate from '../components/CategoryCreate'
import BarbersItem from '../components/BarbersItem'
import { useMessage } from '../hooks/message'
import { ShopContext } from '../components/SidebarShop'
import useTrans from '../hooks/trans'


export default function Category() {
    const t = useTrans()
    const [page, setPage] = useState(1)
    const { shop } = useContext(ShopContext)
    const categories = useLoad({
        url: CATEGORY_LIST.replace('{shopId}', shop.id),
        params: { page, size: 15 },
    }, [page])
    const [showMessage] = useMessage()
    const category = categories.response ? categories.response.results : []
    const categoryMove = usePutRequest()


    useEffect(() => {
        if (categories.error && categories.error.data) {
            showMessage(categories.error.data.detail, 'is-danger')
        }
    }, [categories.error, showMessage])

    const [createCategoryModal, hideCategoryModal] = useModal(
        <CategoryCreate shopId={shop.id} onSuccess={() => {
            hideCategoryModal()
            categories.request()
        }} onCancel={() => hideCategoryModal()} />,
    )

    if (categories.error.data) {
        return null
    }

    function changePosition(status, direction) {
        categories.setResponse({
            results: category.map((column) => {
                if (column.id === status.id) {
                    return { ...column, position: status.position + direction }
                }
                if (column.position === status.position + direction) {
                    return { ...column, position: status.position }
                }
                return column
            }),
        })
        categoryMove.request({
            url: CATEGORY_MOVE.replace('{id}', status.id).replace('{shopId}', shop.id),
            data: { position: status.position + direction },
        })
        categories.request()
    }

    return (
        <Fragment>
            <div className="columns is-mobile">

                <div className="column">
                    <h1 className={cn(css(styles.titleName))}>
                        {t('category')}
                    </h1>
                </div>

                <div className="column">
                    <Button
                        text={t('create')}
                        icon="add-outline"
                        onClick={createCategoryModal}
                        className="is-link is-outlined is-pulled-right" />
                </div>
            </div>

            <div className="box">
                <Table
                    emptyMessage={t('noCategories')}
                    loading={categories.loading}
                    totalCount={categories.response ? categories.response.count : 0}
                    activePage={page}
                    onPageChange={setPage}
                    items={sortBy(categories.response ? categories.response.results : [], 'position')}
                    columns={{
                        emoji: t('emoji'),
                        name: t('name'),
                        parent: t('parent'),
                        actions1: '',
                        actions2: '',
                    }}
                    renderItem={(item) => (
                        <BarbersItem
                            shopId={shop.id}
                            key={item.id}
                            columns={category}
                            onUpdate={categories.request}
                            changePosition={changePosition}
                            onDelete={categories.request}
                            item={item} />
                    )} />
            </div>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    titleName: {
        fontWeight: '500',
    },
})
