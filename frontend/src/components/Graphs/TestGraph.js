import React from 'react';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from 'recharts';

const data = [
  { name: 'January', Job_Seeker: 4000, Job_Poster: 2400, amt: 2400 },
  { name: 'February', Job_Seeker: 3000, Job_Poster: 1398, amt: 2210 },
  { name: 'March', Job_Seeker: 2000, Job_Poster: 9800, amt: 2290 },
  { name: 'April', Job_Seeker: 2780, Job_Poster: 3908, amt: 2000 },
  { name: 'May', Job_Seeker: 1890, Job_Poster: 4800, amt: 2181 },
  { name: 'June', Job_Seeker: 2390, Job_Poster: 3800, amt: 2500 },
  { name: 'July', Job_Seeker: 3490, Job_Poster: 4300, amt: 2100 },
  { name: 'August', Job_Seeker: 4490, Job_Poster: 4300, amt: 2100 },
  { name: 'September', Job_Seeker: 5490, Job_Poster: 6300, amt: 2100 },
  { name: 'October', Job_Seeker: 6490, Job_Poster: 8300, amt: 2100 },
  { name: 'November', Job_Seeker: 7490, Job_Poster: 3300, amt: 2100 },
  { name: 'December', Job_Seeker: 8490, Job_Poster: 7300, amt: 2100 },
];

const BarGraph = () => {
  return (
    <div className="bar-graph-container">
      <h2 className="graph-title">Monthly Income</h2>
      <BarChart
        width={650}
        height={400}
        data={data}
        // margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-15} textAnchor="end" interval={0} fontSize={15} dy={-5} dx={20}/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Job_Poster" fill="#6a99e1" name="Job Poster" />
        <Bar dataKey="Job_Seeker" fill="#a4d6b2" name="Job Seeker" />
      </BarChart>
    </div>
  );
};

export default BarGraph;
