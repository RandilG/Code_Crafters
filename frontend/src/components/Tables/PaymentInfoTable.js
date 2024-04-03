import React from 'react';
import { Table } from 'antd';

const columns = [
    {
        title: 'Payment ID',
        dataIndex: 'paymentid',
        key: 'paymentid',
        render: (text, record) => (
            <a href={`/${record.paymentid}`}>{text}</a>
        ),
    },
    {
        title: 'Company',
        dataIndex: 'company',
        key: 'company',
        render: (text, record) => (
            <a href={`/company/${record.company}`}>{text}</a>
        ),
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    },
];

const data = [
    {
        key: '1',
        company: 'John Brown',
        date: '2024-03-31',
        amount: 1000,
        paymentid: 10000,
    },
    {
        key: '2',
        company: 'Jim Green',
        date: '2024-04-01',
        amount: 1000,
        paymentid: 20000,

    },
    {
        key: '3',
        company: 'Joe Black',
        date: '2024-04-02',
        amount: 1000,
        paymentid: 30000,

    },
];

const PaymentInfoTable = () => (
    <div style={{ textAlign: 'left' }}>
        <span style={{ fontWeight: 'bold', fontSize: 20, paddingTop: '20px', display: 'block' }}>Payment Informations</span>
        <div style={{ padding: '10px' }}>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
            />
        </div>
    </div>
);

export default PaymentInfoTable;
