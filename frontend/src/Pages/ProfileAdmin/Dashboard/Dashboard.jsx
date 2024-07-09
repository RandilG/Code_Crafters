import React, { useEffect, useState } from 'react';
import { TeamOutlined, UserOutlined, FileDoneOutlined } from '@ant-design/icons';
import { Card, Space, Statistic, Spin, message } from 'antd';
import axios from 'axios';
import StatusChart from '../../../components/ProfileAdmin/Chart/Chart';
// import PieChart from '../../../components/ProfileAdmin/Circle/Circle';

const gradientStyles = {
  activeMembers: {
    background: 'linear-gradient(135deg, #a8ff78 0%, #78ffd6 100%)',
  },
  profileRequests: {
    background: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
  },
  jobHandlingRequests: {
    background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
  },
};

function Dashboard() {
  const [activeMembers, setActiveMembers] = useState(0);
  const [profileRequests, setProfileRequests] = useState(0);
  const [jobHandlingRequests, setJobHandlingRequests] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveMembers = async () => {
      try {
        const [jobSeekersResponse, jobPostersResponse] = await Promise.all([
          axios.get('http://localhost:8000/approved-jobseekers-count'),
          axios.get('http://localhost:8000/approved-jobposters-count'),
        ]);
        const jobSeekersCount = jobSeekersResponse.data.activeAccountCount;
        const jobPostersCount = jobPostersResponse.data.activeJPAccountCount;
        setActiveMembers(jobSeekersCount + jobPostersCount);
      } catch (error) {
        message.error('Error fetching active members data');
        console.error(error);
      }
    };

    const fetchProfileRequests = async () => {
      try {
        const response = await axios.get('http://localhost:8000/totalrequestCount');
        setProfileRequests(response.data.totalrequestCount);
      } catch (error) {
        message.error('Error fetching profile requests data');
        console.error(error);
      }
    };

    const fetchJobHandlingRequests = async () => {
      try {
        const response = await axios.get('http://localhost:8000/jobhandlingrequest');
        setJobHandlingRequests(response.data.JobHandlingRequest);
      } catch (error) {
        message.error('Error fetching job handling requests data');
        console.error(error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchActiveMembers(), fetchProfileRequests(), fetchJobHandlingRequests()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  return (
    <div className="PageContent">
      <div className="flex items-center justify-center">
        <div className="Cards">
          <Space direction="horizontal" style={{ margin: '5%' }}>
            <Card style={{ ...gradientStyles.activeMembers, borderRadius: '10px' }}>
              <p>Active Members</p>
              <Space>
                <TeamOutlined
                  style={{
                    color: 'green',
                    fontSize: '50px',
                    backgroundColor: 'rgba(0,255,0,0.25)',
                    borderRadius: 30,
                    padding: 8,
                  }}
                />
                <Statistic title="Active Members" value={activeMembers} />
              </Space>
            </Card>

            <Card style={{ ...gradientStyles.profileRequests, borderRadius: '10px' }}>
              <p>Profile Requests</p>
              <Space>
                <UserOutlined
                  style={{
                    color: 'blue',
                    fontSize: '50px',
                    backgroundColor: 'rgba(0,0,255,0.25)',
                    borderRadius: 30,
                    padding: 8,
                  }}
                />
                <Statistic title="Profile Requests" value={profileRequests} />
              </Space>
            </Card>

            <Card style={{ ...gradientStyles.jobHandlingRequests, borderRadius: '10px' }}>
              <p>Job Handling Requests</p>
              <Space>
                <FileDoneOutlined
                  style={{
                    color: 'red',
                    fontSize: '50px',
                    backgroundColor: 'rgba(255,0,0,0.25)',
                    borderRadius: 30,
                    padding: 8,
                  }}
                />
                <Statistic title="Job Handling Requests" value={jobHandlingRequests} />
              </Space>
            </Card>
          </Space>
        </div>
      </div>

      <div className="Charts" style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0' }}>
        <div style={{ width: '45%' }}>
          <StatusChart /> 
        </div>
        <div style={{ width: '45%' }}>
          {/* <PieChart /> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
