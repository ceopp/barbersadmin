import React, { useState } from 'react'
import InvoiceItem from '../components/InvoiceItem'
import InvoiceTabs from '../components/InvoiceTabs'
import Layout from '../components/Layout'
import Table from '../components/common/Table'
import { useLoad } from '../hooks/request'
import { INVOICE_LIST } from '../urls'
import useTrans from '../hooks/trans'

export default function ShopInvoice() {
    const [page, setPage] = useState(1)

    const invoiceList = useLoad({
        url: INVOICE_LIST,
        params: { page, size: 15 },
    }, [page])
    const t = useTrans()

    return (
        <Layout>
            <InvoiceTabs />

            <div className="box">
                <Table
                    totalCount={invoiceList.response ? invoiceList.response.count : 0}
                    items={invoiceList.response ? invoiceList.response.results : []}
                    columns={{
                        id: 'ID',
                        created_at: t('createAt'),
                        price: t('price'),
                        actions: '',
                    }}
                    loading={invoiceList.loading}
                    activePage={page}
                    onPageChange={setPage}
                    emptyMessage={t('noInvoices')}
                    renderItem={(item) => (
                        <InvoiceItem
                            key={item.id}
                            item={item}
                            onReload={invoiceList.request}
                            loading={invoiceList.loading}
                            onDelete={invoiceList.request} />
                    )} />
            </div>
        </Layout>
    )
}
