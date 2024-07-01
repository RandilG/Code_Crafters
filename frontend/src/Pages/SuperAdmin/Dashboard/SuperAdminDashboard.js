// import React, { useEffect, useState } from 'react';
// import { Table, Button, message } from 'antd';
// import axios from 'axios';

// const AdminList = () => {
//   const [admins, setAdmins] = useState([]);

//   useEffect(() => {
//     fetchAdmins();
//   }, []);

//   const fetchAdmins = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/admins');
//       setAdmins(response.data);
//     } catch (error) {
//       message.error('Failed to fetch admins');
//     }
//   };

//   const toggleAdminStatus = async (id, isActive) => {
//     try {
//       await axios.put(`http://localhost:5000/api/admins/${id}`, { isActive: !isActive });
//       fetchAdmins();
//       message.success('Admin status updated');
//     } catch (error) {
//       message.error('Failed to update admin status');
//     }
//   };

//   const columns = [
//     { title: 'ID', dataIndex: 'id', key: 'id' },
//     { title: 'Name', dataIndex: 'name', key: 'name' },
//     { title: 'Role', dataIndex: 'role', key: 'role' },
//     { title: 'Status', dataIndex: 'isActive', key: 'isActive', render: (text, record) => (record.isActive ? 'Active' : 'Inactive') },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (text, record) => (
//         <Button type="primary" onClick={() => toggleAdminStatus(record.id, record.isActive)}>
//           {record.isActive ? 'Deactivate' : 'Activate'}
//         </Button>
//       ),
//     },
//   ];

//   return <Table columns={columns} dataSource={admins} rowKey="id" />;
// };

// export default AdminList;

import React from 'react';
import { Table, Button, Space, Typography } from 'antd';

const { Title } = Typography;

const dataSource = [
  {
    key: '1',
    name: 'Admin 1',
    type: 'Super Admin',
    status: 'Active',
  },
  {
    key: '2',
    name: 'Admin 2',
    type: 'Moderator',
    status: 'Inactive',
  },
  // Add more admin data here
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <Button type="primary" onClick={() => handleStatusChange(record.key)}>
          {record.status === 'Active' ? 'Deactivate' : 'Activate'}
        </Button>
      </Space>
    ),
  },
];

const handleStatusChange = (key) => {
  const newData = dataSource.map((admin) => {
    if (admin.key === key) {
      admin.status = admin.status === 'Active' ? 'Inactive' : 'Active';
    }
    return admin;
  });
  console.log(newData);
};

const SuperAdminDashboard = () => {
  return (
    <div style={{ padding: '20px', minHeight: '100vh' }}>
      <Title level={2} style={{ color: 'black' }}>Super Admin Dashboard</Title>
      <Table dataSource={dataSource} columns={columns} />
      <style>{`
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        code {
          font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
        }
      `}</style>
    </div>
  );
};

export default SuperAdminDashboard;
