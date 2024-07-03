import React from 'react';
import Circle from '../../../components/ProfileAdmin/CircleCount/Circle';
import StatusChart from '../../../components/ProfileAdmin/Chart/Chart';
import LineChart from '../../../components/ProfileAdmin/LineChart/LineChart';
import './Dashboard.css';

const ProfileAdminDashboard = () => {
  const jobSeekerRating = [4.2, 4.3, 4.4, 4.5, 4.6];
  const jobPosterRating = [3.8, 3.9, 4.0, 4.1, 4.2];
  const labels = ['January', 'February', 'March', 'April', 'May'];

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <Circle />
      </div>
      <div className="dashboard-content">
        <StatusChart />
      </div>
      <div className="dashboard-content2">
        <h1>Ratings Chart</h1>
        <LineChart
          jobSeekerRating={jobSeekerRating}
          jobPosterRating={jobPosterRating}
          labels={labels}
        />
      </div>

    </div>
    
  );
}

export default ProfileAdminDashboard;
