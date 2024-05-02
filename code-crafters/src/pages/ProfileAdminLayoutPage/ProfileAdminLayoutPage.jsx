import React from "react";
import "./ProfileAdminLayoutPage.css";
import Header from "../../components/Header/Header";
import ProfileAdminSideBar from "../../components/PrifileAdminSideBar/ProfileAdminSideBar";
import { Outlet } from "react-router-dom";

const ProfileAdminLayoutPage = () => {
  return (
    <div className="layout">
      <div className="header-box">
        <Header />
      </div>
      <div className="body">
        <div className="">
          <ProfileAdminSideBar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileAdminLayoutPage;
