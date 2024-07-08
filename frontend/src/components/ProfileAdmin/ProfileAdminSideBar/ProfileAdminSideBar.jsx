import React, { useState } from "react";
import "./ProfileAdminSideBar.css";
import Logo from "../Logo/Logo";

import {
  ProfileOutlined,
  EyeOutlined,
  SettingOutlined,
  LogoutOutlined,
  CloseCircleOutlined
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
          theme="light"
          collapsed={collapsed}
          style={{ backgroundColor: "#005758", width: "20%" }}
        >
          <Logo toggleCollapsed={toggleCollapsed} />
          <Menu
            theme="dark"
            mode="inline"
            className="menu-bar"
            style={{
              backgroundColor: "#005758",
              color: "#fff",
              fontWeight: "500",
              fontSize: "16px",
              height: "100vh",
            }}
          >
            <Menu.SubMenu
              key="profile"
              icon={<ProfileOutlined />}
              title="Job Posters"
            >
              <Menu.Item key="profile-requests" className="elements">
                <Link to="profilerequests" style={{ textDecoration: "none", color: "#fff" }}>
                  Account Requests
                </Link>
              </Menu.Item>
              <Menu.Item key="view-active-profiles" className="elements">
                <Link to="viewactiveprofiles" style={{ textDecoration: "none", color: "#fff" }}>
                  Active Profiles
                </Link>
              </Menu.Item>
              <Menu.Item key="view-declined-profiles" className="elements">
                <Link to="viewdeclinedprofiles" style={{ textDecoration: "none", color: "#fff" }}>
                  Declined Profiles
                </Link>
              </Menu.Item>
              <Menu.Item key="deactivated-profiles" className="elements">
                <Link to="deactivatedprofile" style={{ textDecoration: "none", color: "#fff" }}>
                  Deactivated Profiles
                </Link>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="seeker-profile"
              icon={<ProfileOutlined />}
              title="Job Seekers"
            >
              <Menu.Item key="seeker-profile-requests" className="elements">
                <Link to="jobseekerrequests" style={{ textDecoration: "none", color: "#fff" }}>
                  Account Requests
                </Link>
              </Menu.Item>
              <Menu.Item key="seeker-view-active-profiles" className="elements">
                <Link to="activejobseekers" style={{ textDecoration: "none", color: "#fff" }}>
                  Active Profiles
                </Link>
              </Menu.Item>
              <Menu.Item key="seeker-view-declined-profiles" className="elements">
                <Link to="declinedjobseekers" style={{ textDecoration: "none", color: "#fff" }}>
                  Declined Profiles
                </Link>
              </Menu.Item>
              <Menu.Item key="seeker-deactivated-profiles" className="elements">
                <Link to="deactivatedjobseekers" style={{ textDecoration: "none", color: "#fff" }}>
                  Deactivated Profiles
                </Link>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="review" icon={<EyeOutlined />} title="Review">
              <Menu.Item key="see-review" className="elements">
                <Link to="jobeekeravgratings" style={{ textDecoration: "none", color: "#fff" }}>
                  Job Seeker Ratings
                </Link>
              </Menu.Item>
              <Menu.Item key="review-hold" className="elements">
                <Link to="jobposteravgratings" style={{ textDecoration: "none", color: "#fff" }}>
                  Job Poster Ratings
                </Link>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="job-cancel-requests" className="elements" icon={<CloseCircleOutlined />}>
              <Link to="jobcancelrequests" style={{ textDecoration: "none", color: "#fff" }}>
                Job Cancel Requests
              </Link>
            </Menu.Item>
            <Menu.Item key="UserProfile" icon={<SettingOutlined />} className="elements">
              <Link to="UserProfile" style={{ textDecoration: "none", color: "#fff" }}>
                Account Settings
              </Link>
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />} className="elements">
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
      </Layout>
    </div>
  );
};

export default ProfileAdminSideBar;
