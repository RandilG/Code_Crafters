import React from 'react';
import './CircleCount.css';

const WaveCircle = ({ count, label }) => {
  return (
    <div className="circle-wrapper">
      <div className="circle-container">
        <div className="wave"></div>
        <div className="circle-text">{count}</div>
      </div>
      <p className="circle-label">{label}</p>
    </div>
  );
};

export default WaveCircle;
