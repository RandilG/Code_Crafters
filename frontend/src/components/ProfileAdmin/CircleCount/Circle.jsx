import React, { useState, useEffect } from 'react';
import WaveCircle from './CircleCount';
const Circle = () => {
    const [activeJobSeekers, setActiveJobSeekers] = useState(0);
    const [activeJobPosters, setActiveJobPosters] = useState(0);
  
    useEffect(() => {
      fetch('http://localhost:8000/approved-jobseekers-count')
        .then(response => response.json())
        .then(data => {
          setActiveJobSeekers(data.activeAccountCount);
        })
        .catch(error => console.error('Error fetching active job posters data:', error));
  
  
  
      fetch('http://localhost:8000/approved-jobposters-count')
        .then(response => response.json())
        .then(data => {
          setActiveJobPosters(data.activeJPAccountCount);
        })
        .catch(error => console.error('Error fetching active job posters data:', error));
    }, []);
  
    return (
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div className="dashboard-item">
            <WaveCircle count={activeJobSeekers} label="Active Job Seekers" />
          </div>
          <div className="dashboard-item">
            <WaveCircle count={activeJobPosters} label="Active Job Posters" />
          </div>
        </div>

      </div>
    );
  }
  
  export default Circle;
  