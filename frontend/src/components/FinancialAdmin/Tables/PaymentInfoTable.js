import React, { useEffect, useState } from 'react';
import { Table, Spin, message, Button } from 'antd'; // Include Button for pagination
import axios from 'axios'; // Axios for fetching data

// Define the columns for the table
const columns = [
  {
    title: 'Job Poster',
    dataIndex: 'job_poster', // Update dataIndex to match the new key
    key: 'job_poster',
    render: (text, record) => (
      <a href={`/jobPoster/${record.job_poster}`}>{text}</a>
    ),
  },
  {
    title: 'Poster Name',
    dataIndex: 'posterName', // Updated key
    key: 'posterName',
  },
  {
    title: 'Payment Date',
    dataIndex: 'payment_date', // Updated key
    key: 'payment_date',
    render: (date) => new Date(date).toLocaleDateString(), // Format date for better readability
  },
  {
    title: 'Amount',
    dataIndex: 'amount', // Updated key
    key: 'amount',
  },
  {
    title: 'Payment ID',
    dataIndex: 'payment_id', // Updated key
    key: 'payment_id',
    render: (text) => (
      <a href={`http://localhost:3000/Payments/${text}`}>{text}</a>
    ),
  },
];

const IncomeTable = () => {
  const [data, setData] = useState([]); // State to hold fetched data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [currentPage, setCurrentPage] = useState(1); // State to manage current page
  const pageSize = 7; // Set the number of rows per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/paymentdata'); // Fetch data from API
        setData(response.data); // Update the data state with the fetched data
      } catch (error) {
        message.error('Error fetching data'); // Display an error message if fetch fails
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchData(); // Fetch data when the component mounts
  }, []); // The empty dependency array ensures this runs only once when the component is mounted

  const handlePageChange = (page) => {
    setCurrentPage(page); // Update the current page
  };

  const currentData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize); // Get data for the current page

  if (loading) {
    return <Spin />; // Show a loading spinner while fetching data
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ textAlign: 'left', padding: '20px', border: '1px solid #ffa500', borderRadius: '10px', }}>
        <span style={{ fontWeight: 'bold', fontSize: 24, paddingTop: '20px', display: 'block', color: '#ffa500' }}>
          Payment Information From Job Posters
        </span>
        <div style={{ padding: '10px' }}>
          <Table columns={columns} dataSource={currentData} pagination={false} rowKey="payment_id" bordered style={{ borderColor: '#ffa500' }} />
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

export default IncomeTable;
