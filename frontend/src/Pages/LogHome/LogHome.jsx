import React from 'react';
import "../../App.css";
import profileImage from '../../Assets/image.png';
import { Link } from 'react-router-dom';

const LogHome = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="p-8 text-center bg-white rounded-xl">
          <div className="flex flex-col items-center mb-4">
            <div className="relative">
              <img
                src={profileImage}
                alt="Profile"
                className="w-56 h-56 rounded-full"
              />

            </div>
          </div>
          <div className='justify-center text-center '>
            <h1 className="mb-4 text-4xl font-semibold">Part Time Sri Lanka</h1>
            <div className="flex space-x-4 justify-center text-center  ">
              <button className="px-4 py-2 text-orange-500 transition bg-white border border-orange-500 rounded-full hover:bg-orange-500 hover:text-white">
              <Link to = '/financialadminloging' >
                Login
                </Link>
              </button>
              <button className="px-4 py-2 text-orange-500 transition bg-white border border-orange-500 rounded-full hover:bg-orange-500 hover:text-white">
              <Link to = '/signup' >
                Sign Up
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default LogHome;