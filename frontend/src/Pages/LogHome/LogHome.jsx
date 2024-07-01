import React, { useState } from 'react';
import "../../App.css";
import profileImage from '../../Assets/image.png';
import { useNavigate } from 'react-router-dom';

const LogHome = () => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (role === 'superadmin') {
      navigate('/SuperAdminLogin');
    } else if (role === 'financialadmin') {
      navigate('/financialadminloging');
    } else {
      // Handle other roles or show an error message
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-8 text-center bg-white rounded-xl">
        <div className="flex flex-col items-center mb-4">
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile"
              className="w-100 h-80"
            />
          </div>
        </div>
        <div className='justify-center text-center '>
          <h1 className="mb-4 text-4xl font-semibold">Part Time Sri Lanka</h1>
          <div className="flex flex-col items-center mb-4">
            <select
              className="px-4 py-2 mb-4 border rounded"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="" disabled>Select Admin Role</option>
              <option value="superadmin">Super Admin</option>
              <option value="financialadmin">Financial Admin</option>
              <option value="userhandling">User Handling Admin</option>
              <option value="jobhandling">Job Handling Admin</option>
            </select>
          </div>
          <div className="flex space-x-4 justify-center text-center">
            <button
              onClick={handleLogin}
              className="px-4 py-2 text-orange-500 transition bg-white border border-orange-500 rounded-full hover:bg-orange-500 hover:text-white"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogHome;
