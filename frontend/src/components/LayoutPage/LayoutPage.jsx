import React from "react";
import "./LayoutPage.css";
import Header from "../AppHeader/Header";
import AdminSideBar from "../SideBar/AdminSideBar";
import { Outlet } from "react-router-dom";

const LayoutPage = () => {
  return (
    <div className="layout">
      <div className="header-box">
        <Header />
      </div>
      <div className="body">
        <div className="">
          <AdminSideBar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutPage;
