import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import axios from 'axios';

const DashboardCard = ({ number, text, color }) => (
  <Card style={{ backgroundColor: color, color: 'white', borderRadius: '8px', marginBottom: '20px' }}>
    <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{number}</div>
    <div>{text}</div>
  </Card>
);

const SuperAdminDashboard = () => {
  const [jobSeekerCount, setJobSeekerCount] = useState(0);
  const [jobPosterCount, setJobPosterCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [jobCount, setJobCount] = useState(0);
  const [adminData, setAdminData] = useState([]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [jobSeekerResponse, jobPosterResponse, adminResponse, jobResponse, adminListResponse] = await Promise.all([
          axios.get('http://localhost:8000/approved-jobseekers-count'),
          axios.get('http://localhost:8000/approved-jobposters-count'),
          axios.get('http://localhost:8000/get-admin-count'),
          axios.get('http://localhost:8000/get-job-count'),
          axios.get('http://localhost:8000/get-admin-list')
        ]);
        setJobSeekerCount(jobSeekerResponse.data.activeAccountCount);
        setJobPosterCount(jobPosterResponse.data.activeJPAccountCount);
        setAdminCount(adminResponse.data.adminCount);
        setJobCount(jobResponse.data.jobCount);
        setAdminData(adminListResponse.data);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  const handleStatusChange = async (record, newStatus) => {
    console.log(`Changing status of ${record.FirstName} ${record.LastName} to ${newStatus}`);
    
    try {
      const response = await axios.put('http://localhost:8000/update-admin-status', {
        status: newStatus,
        email: record.Email
      });
      
      if (response.status === 200) {
        const updatedAdminData = adminData.map(admin => {
          if (admin.Email === record.Email) {
            return { ...admin, status: newStatus };
          }
          return admin;
        });
        setAdminData(updatedAdminData);
        console.log('Admin status updated successfully!');
      } else {
        console.error('Failed to update admin status:', response.data);
      }
    } catch (error) {
      console.error('Error updating admin status:', error);
    }
  };

  const columns = [
    { 
      title: 'Admin Name', 
      dataIndex: 'AdminName', 
      key: 'AdminName', 
      render: (text, record) => `${record.FirstName} ${record.LastName}`
    },
    { title: 'Email', dataIndex: 'Email', key: 'Email' },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: (status) => {
        const color = status === 'Active' ? 'green' : 
                      status === 'Suspend' ? 'red' : 
                      status === 'Hold' ? 'blue' : 'orange';
        return <span style={{ color }}>{status}</span>;
      }
    },
    { title: 'AdminRole', dataIndex: 'AdminRole', key: 'AdminRole' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1" onClick={() => handleStatusChange(record, 'Active')}>
                Active
              </Menu.Item>
              <Menu.Item key="2" onClick={() => handleStatusChange(record, 'Suspend')}>
                Suspend
              </Menu.Item>
              <Menu.Item key="3" onClick={() => handleStatusChange(record, 'Hold')}>
                Hold
              </Menu.Item>
            </Menu>
          }
        >
          <Button>
            Actions <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16}>
        <Col span={6}><DashboardCard number={adminCount} text="Admin Count" color="#5cdbd3" /></Col>
        <Col span={6}><DashboardCard number={jobPosterCount} text="Job Poster Count" color="#b37feb" /></Col>
        <Col span={6}><DashboardCard number={jobSeekerCount} text="Job Seeker Count" color="#69c0ff" /></Col>
        <Col span={6}><DashboardCard number={jobCount} text="Job Count" color="#ffa940" /></Col>
      </Row>
      <Card title="Admin List" style={{ marginTop: '20px' }}>
        <Table columns={columns} dataSource={adminData} />
      </Card>
    </div>
  );
};

export default SuperAdminDashboard;
