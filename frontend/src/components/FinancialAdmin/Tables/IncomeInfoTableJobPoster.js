import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'antd';

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
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 7;

    useEffect(() => {
        axios.get('http://localhost:8000/getFinancialData')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const currentData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ textAlign: 'left', padding: '20px', border: '1px solid #ffa500', borderRadius: '10px' }}>
                <span style={{ fontWeight: 'bold', fontSize: 24, paddingTop: '20px', display: 'block', color: '#ffa500' }}>
                    Revenue Information From Job Posters
                </span>
                <div style={{ padding: '10px' }}>
                    <Table
                        columns={columns}
                        dataSource={currentData}
                        pagination={false}
                        rowKey="payment_id"
                        bordered
                        style={{ borderColor: '#ffa500' }}
                    />
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <Button
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                            style={{ backgroundColor: '#ffa500', borderColor: '#ffa500', color: 'white' }}
                        >
                            Previous
                        </Button>
                        <Button
                            style={{ marginLeft: '10px', backgroundColor: '#ffa500', borderColor: '#ffa500', color: 'white' }}
                            disabled={currentPage * pageSize >= data.length}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentInfoTableJobPoster;
