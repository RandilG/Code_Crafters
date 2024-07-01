import React, { useState } from "react";
import "./SuperAdminSideBar.css";
import Logo from "../Logo/Logo";

import {
  DashboardOutlined,
  DollarOutlined,
  PlusCircleOutlined,
  BellOutlined,
  SettingOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
const { Sider } = Layout;

const SuperAdminSideBar = () => {
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
              key="SuperAdminDashboard"
              icon={<DashboardOutlined />}
              className="elements"
            >
              <Link
                to="SuperAdminDashboard"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                Dashboard
              </Link>
            </Menu.Item>
            
            <Menu.Item
              key="Signup"
              icon={<UserAddOutlined />}
              className="elements"
            >
              <Link
                to="Signup"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                Admin Register
              </Link>
            </Menu.Item>

            <Menu.Item
              key="FinancialAdminPayments"
              icon={<DollarOutlined />}
              className="elements"
            >
              <Link
                to="FinancialAdminPayments"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                Payments
              </Link>
            </Menu.Item>

            <Menu.Item
              key="FinancialAdminRevenue"
              icon={<PlusCircleOutlined />}
              className="elements"
            >
              <Link
                to="FinancialAdminRevenue"
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
              key="SuperAdminUserProfile"
              icon={<SettingOutlined />}
              className="elements"
            >
              <Link
                to="SuperAdminUserProfile"
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

export default SuperAdminSideBar;
