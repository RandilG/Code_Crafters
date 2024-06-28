import React, { useState } from "react";
import "./AdminSideBar.css";
import Logo from "../Logo/Logo";

import {
  DashboardOutlined,
  DollarOutlined,
  PlusCircleOutlined,
  BellOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
const { Sider } = Layout;

const ProfileAdminSideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="siderbar-container" >
      <Layout style={{ width: "15%", backgroundColor: "white" }}>
        <Sider
          theme=""
          collapsed={collapsed}
          style={{ backgroundColor: "#005758", width: "20%" }}
        >
          <Logo toggleCollapsed={toggleCollapsed} />
          <Menu
            theme=""
            mode="inline"
            className="menu-bar"
            style={{
              backgroundColor: "#005758",
              color: "#ffff",
              fontWeight: "500",
              fontSize: "16px",
              height: "100vh",
            }}
          >
            <Menu.Item
              key="dashboard"
              icon={<DashboardOutlined />}
              className="elements"
            >
              <Link
                to="dashboard"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                Dashboard
              </Link>
            </Menu.Item>
            
            
            <Menu.Item
              key="Payments"
              icon={<DollarOutlined />}
              className="elements"
            >
              <Link
                to="Payments"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                Payments
              </Link>
            </Menu.Item>

            <Menu.Item
              key="Revenue"
              icon={<PlusCircleOutlined />}
              className="elements"
            >
              <Link
                to="Revenue"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                Revenue
              </Link>
            </Menu.Item>

            <Menu.Item
              key="Notification"
              icon={<BellOutlined />}
              className="elements"
            >
              <Link
                to="Notification"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                Notification
              </Link>
            </Menu.Item>

                       
            <Menu.Item
              key="UserProfile"
              icon={<SettingOutlined />}
              className="elements"
            >
              <Link
                to="UserProfile"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                Account Settings
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
      </Layout>
    </div>
  );
};

export default ProfileAdminSideBar;
