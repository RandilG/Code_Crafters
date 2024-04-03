import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'JobPoster',
    dataIndex: 'jobPoster',
    key: 'jobPoster',
    render: (text, record) => (
      <a href={`/jobPoster/${record.jobPoster}`}>{text}</a>
    ),
  },
  {
    title: 'PosterName',
    dataIndex: 'posterName',
    key: 'posterName',
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
  {
    title: 'Payment ID',
    dataIndex: 'paymentid',
    key: 'paymentid',
    render: (text, record) => (
        <a href={`http://localhost:3000/Payments`}>{text}</a> //${record.paymentid}
      ),
  },
];

const data = [
  {
    key: '1',
    posterName: 'John Brown',
    jobPoster: 'johnrown@gmail.com',
    date: '2024-03-31',
    amount: 1000,
    paymentid: 10000,
  },
  {
    key: '2',
    posterName: 'Jim Green',
    jobPoster: 'jim@gmail.com',
    date: '2024-04-01',
    amount: 1000,
    paymentid: 20000,

  },
  {
    key: '3',
    posterName: 'Joe Black',
    jobPoster: 'Joe@gmail.com',
    date: '2024-04-02',
    amount: 1000,
    paymentid: 30000,

  },
  {
    key: '4',
    posterName: 'Joe Black',
    jobPoster: 'jim@gmail.com',
    date: '2024-04-02',
    amount: 1000,
    paymentid: 40000,

  },
  {
    key: '4',
    posterName: 'Joe Black',
    jobPoster: 'Joe@gmail.com',
    date: '2024-04-02',
    amount: 1000,
    paymentid: 50000,

  },
];

const IncomeTable = () => (
  <div style={{ textAlign: 'left' }}>
    <span style={{ fontWeight: 'bold', fontSize: 20, paddingTop: '20px', display: 'block' }}>Financial Informations</span>
    <div style={{ padding: '10px' }}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </div>
  </div>
);

export default IncomeTable;
