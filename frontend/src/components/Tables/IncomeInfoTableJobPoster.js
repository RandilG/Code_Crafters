import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd';

const columns = [
    {
        title: 'Payment ID',
        dataIndex: 'payment_id',
        key: 'payment_id',
    },
    {
        title: 'Date',
        dataIndex: 'payment_date',
        key: 'payment_date',
    },
    {
        title: 'Service Charge',
        dataIndex: 'service_charge',
        key: 'service_charge',
    },
    {
        title: 'Job Poster',
        dataIndex: 'posterName',
        key: 'posterName',
    },
];

const PaymentInfoTableJobPoster = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/getFinancialData')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div style={{ textAlign: 'left' }}>
            <span style={{ fontWeight: 'bold', fontSize: 20, paddingTop: '20px', display: 'block' }}>Revenue Informations From Job Posters</span>
            <div style={{ padding: '10px' }}>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                />
            </div>
        </div>
    );
};

export default PaymentInfoTableJobPoster ;
