import React, { useState, useEffect } from 'react';
import { Table, Rate } from 'antd';
import axios from 'axios';


const JobSeekerRatings = () => {
  const [data, setData] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/job-seeker-avg-ratings');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'FirstName',
      key: 'FirstName',
      sorter: (a, b) => a.FirstName.localeCompare(b.FirstName),
      sortOrder: sortedInfo.columnKey === 'FirstName' && sortedInfo.order,
    },
    {
      title: 'Last Name',
      dataIndex: 'LastName',
      key: 'LastName',
      sorter: (a, b) => a.LastName.localeCompare(b.LastName),
      sortOrder: sortedInfo.columnKey === 'LastName' && sortedInfo.order,
    },
    {
      title: 'Email Address',
      dataIndex: 'SeekerEmail',
      key: 'EmailAddress',
      sorter: (a, b) => a.EmailAddress.localeCompare(b.EmailAddress),
      sortOrder: sortedInfo.columnKey === 'EmailAddress' && sortedInfo.order,
    },
    {
      title: 'Average Rating',
      dataIndex: 'average_rating',
      key: 'average_rating',
      sorter: (a, b) => parseFloat(a.average_rating) - parseFloat(b.average_rating),
      sortOrder: sortedInfo.columnKey === 'average_rating' && sortedInfo.order,
      render: (rating) => {
        const value = parseFloat(rating);
        return (
          <>
            {sortedInfo.order ? (
              <Rate disabled allowHalf defaultValue={value} value={value} />
            ) : (
              <Rate disabled allowHalf defaultValue={value} />
            )}
            <span style={{ marginLeft: '5px' }}>{value.toFixed(1)}</span>
          </>
        );
      },
    },
  ];

  return (
    <div>
     <center>
     <h1>Seeker Ratings</h1>
      <Table
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        pagination={false}
        style={{width:'80%'}}
      />
     </center>
    </div>
  );
};

export default JobSeekerRatings;
