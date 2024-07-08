import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import axios from 'axios';

const JobCancelRequests = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/job-cancel-requests')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                message.error('Error fetching data');
            });
    }, []);

    const handleApprove = (id) => {
        axios.put('http://localhost:8000/approve-job-cancel-request', { id })
            .then(() => {
                message.success('Request approved');
                setData(data.filter(item => item.id !== id));
            })
            .catch(error => {
                message.error('Error approving request');
            });
    };

    const handleReject = (id) => {
        axios.delete('http://localhost:8000/reject-job-cancel-request', { data: { id } })
            .then(() => {
                message.success('Request rejected');
                setData(data.filter(item => item.id !== id));
            })
            .catch(error => {
                message.error('Error rejecting request');
            });
    };

    const columns = [
        {
            title: 'No.',
            dataIndex: 'no',
            key: 'no',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Seeker',
            dataIndex: 'seeker',
            key: 'seeker',
        },
        {
            title: 'Job ID',
            dataIndex: 'jobId',
            key: 'jobId',
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
            key: 'reason',
        },
        {
            title: 'Approved',
            dataIndex: 'approved',
            key: 'approved',
            render: (approved) => (approved ? 'Yes' : 'No'),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <>
                    <Button type="primary" onClick={() => handleApprove(record.id)} style={{ marginRight: 8 }}>
                        Approve
                    </Button>
                    <Button type="danger" onClick={() => handleReject(record.id)}>
                        Reject
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div style={{ margin: '20px' }}>
            <Table columns={columns} dataSource={data} rowKey="id" />
        </div>
    );
};

export default JobCancelRequests;
