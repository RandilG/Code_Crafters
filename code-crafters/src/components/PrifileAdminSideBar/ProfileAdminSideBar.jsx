import React, { useState } from "react";
import "./ProfileAdminSideBar.css";
import Logo from "../Logo/Logo";

import {
  DashboardOutlined,
  ProfileOutlined,
  EyeOutlined,
  SettingOutlined,
  LogoutOutlined,
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
    <div className="siderbar-container">
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
                to="/dashboard"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                Dashboard
              </Link>
            </Menu.Item>

            <Menu.SubMenu
              key="profile"
              icon={<ProfileOutlined />}
              title="Job Posters"
            >
              <Link
                to="/profilerequests"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <Menu.Item key="profile-requests" className="elements">
                  Account Requests
                </Menu.Item>
              </Link>
              <Link
                to="/viewactiveprofiles"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <Menu.Item key="view-active-profiles" className="elements">
                  Active Profiles
                </Menu.Item>
              </Link>
              <Link
                to="/viewdeclinedprofiles"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <Menu.Item key="view-declined-profiles" className="elements">
                  Declined Profiles
                </Menu.Item>
              </Link>
              <Link
                to="/deactivatedprofile"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <Menu.Item key="deactivated-profiles" className="elements">
                  Deactivated Profiles
                </Menu.Item>
              </Link>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="seeker-profile"
              icon={<ProfileOutlined />}
              title="Job Seekers"
            >
              <Link
                to="/jobseekerrequests"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <Menu.Item key="seeker-profile-requests" className="elements">
                  Account Requests
                </Menu.Item>
              </Link>
              <Link
                to="/activejobseekers"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <Menu.Item key="seeker-view-active-profiles" className="elements">
                  Active Profiles
                </Menu.Item>
              </Link>
              <Link
                to="/declinedjobseekers"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <Menu.Item key="seeker-view-declined-profiles" className="elements">
                  Declined Profiles
                </Menu.Item>
              </Link>
              <Link
                to="/deactivatedjobseekers"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <Menu.Item key="seeker-deactivated-profiles" className="elements">
                  Deactivated Profiles
                </Menu.Item>
              </Link>
            </Menu.SubMenu>
            <Menu.SubMenu key="review" icon={<EyeOutlined />} title="Review">
              <Link
                to="/seereview"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <Menu.Item key="see-review" className="elements">
                  See Review
                </Menu.Item>
              </Link>
              <Link
                to="/holdreview"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <Menu.Item key="review-hold" className="elements">
                  Review Hold
                </Menu.Item>
              </Link>
              <Link
                to="/deletereview"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <Menu.Item key="delete-review" className="elements">
                  Delete Review
                </Menu.Item>
              </Link>
            </Menu.SubMenu>
            
            <Menu.Item
              key="account-settings"
              icon={<SettingOutlined />}
              className="elements"
            >
              <Link
                to="/accountsettings"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                Account Settings
              </Link>
            </Menu.Item>
            <Menu.Item
              key="logout"
              icon={<LogoutOutlined />}
              className="elements"
            >
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
      </Layout>
    </div>
  );
};

export default ProfileAdminSideBar;
