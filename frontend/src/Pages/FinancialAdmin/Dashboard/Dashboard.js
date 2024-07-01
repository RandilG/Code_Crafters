import React, { useEffect, useState } from 'react';
import { DollarOutlined } from '@ant-design/icons';
import { Card, Space, Statistic, Spin, message } from 'antd';
import BarGraph from '../../../components/FinancialAdmin/Graphs/TestGraph';
import axios from 'axios';
import RevenueGraph from '../../../components/FinancialAdmin/Graphs/RevenueGraph';


function Dashboard() {
  // Initialize state to hold income data
  const [incomeData, setIncomeData] = useState(null);
  const [revenueData, setRevenueData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch income data from the endpoint
  useEffect(() => {
    axios
      .get('http://localhost:8000/groupedincome')
      .then((response) => {
        setIncomeData(response.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        message.error('Error fetching income data');
        console.error(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:8000/groupedrevenue')
      .then((response) => {
        setRevenueData(response.data[0]);
      })
      .catch((error) => {
        message.error('Error fetching revenue data');
        console.error(error);
      });
  }, []);

  if (loading || !incomeData || !revenueData) {
    return <Spin tip="Loading..." />;
  }

  return (
        <div className="PageContent">
          <div className="flex items-center justify-center">
            <div className="Cards">
              <Space direction="horizontal" style={{ margin: '5%' }}>
                <Card>
                  <p>Today Income</p>
                  <Space>
                    <DollarOutlined
                      style={{
                        color: 'green',
                        fontSize: '50px',
                        backgroundColor: 'rgba(0,255,0,0.25)',
                        borderRadius: 30,
                        padding: 8,
                      }}
                    />
                    <Statistic title="Daily" value={incomeData.total_today} />
                  </Space>
                </Card>

                <Card>
                  <p>This Month Income</p>
                  <Space>
                    <DollarOutlined
                      style={{
                        color: 'blue',
                        fontSize: '50px',
                        backgroundColor: 'rgba(0,0,255,0.25)',
                        borderRadius: 30,
                        padding: 8,
                      }}
                    />
                    <Statistic title="Monthly" value={incomeData.total_month} />
                  </Space>
                </Card>

                <Card>
                  <p>This Year Income</p>
                  <Space>
                    <DollarOutlined
                      style={{
                        color: 'red',
                        fontSize: '50px',
                        backgroundColor: 'rgba(255,0,0,0.25)',
                        borderRadius: 30,
                        padding: 8,
                      }}
                    />
                    <Statistic title="Yearly" value={incomeData.total_year} />
                  </Space>
                </Card>

                <Card style={{ marginLeft: '50px' }}>
                  <p>Today Revenue</p>
                  <Space>
                    <DollarOutlined
                      style={{
                        color: 'green',
                        fontSize: '50px',
                        backgroundColor: 'rgba(0,255,0,0.25)',
                        borderRadius: 30,
                        padding: 8,
                      }}
                    />
                    <Statistic title="Daily" value={revenueData.total_today} />
                  </Space>
                </Card>

                <Card>
                  <p>This Month Revenue</p>
                  <Space>
                    <DollarOutlined
                      style={{
                        color: 'blue',
                        fontSize: '50px',
                        backgroundColor: 'rgba(0,0,255,0.25)',
                        borderRadius: 30,
                        padding: 8,
                      }}
                    />
                    <Statistic title="Monthly" value={revenueData.total_month} />
                  </Space>
                </Card>

                <Card>
                  <p>This Year Revenue</p>
                  <Space>
                    <DollarOutlined
                      style={{
                        color: 'red',
                        fontSize: '50px',
                        backgroundColor: 'rgba(255,0,0,0.25)',
                        borderRadius: 30,
                        padding: 8,
                      }}
                    />
                    <Statistic title="Yearly" value={revenueData.total_year} />
                  </Space>
                </Card>
              </Space>
              <br />
              <Space>
                <BarGraph />
                <RevenueGraph />
              </Space>

            </div>
          </div>
        </div>
  );
}

export default Dashboard;
