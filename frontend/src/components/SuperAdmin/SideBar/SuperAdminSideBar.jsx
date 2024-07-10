import React, { useState } from "react";
import "./SuperAdminSideBar.css";
import Logo from "../../Common/Logo/Logo";

import {
  DashboardOutlined,
  DollarOutlined,
  PlusCircleOutlined,
  // BellOutlined,
  SettingOutlined,
  UserAddOutlined,
  ProfileOutlined,
  EyeOutlined,
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

            {/* <Menu.Item
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
            </Menu.Item> */}

            {/* Financial */}

            <Menu.SubMenu key="Payment" icon={<DollarOutlined />} title="Payment">
              <Link
                to="JobseekerPayments"
                style={{ textDecoration: "none", color: "#fff" }}
              >

                <Menu.Item key="JobseekerPayments" className="elements">
                  Job Seeker Payment
                </Menu.Item>
              </Link>
              <Link
                to="JobPosterPayment"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <Menu.Item key="JobPosterPayment" className="elements">
                  Job Poster Payment
                </Menu.Item>
              </Link>
            </Menu.SubMenu>

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

                       

            {/* Profile */}
            <Menu.SubMenu
              key="profile"
              icon={<ProfileOutlined />}
              title="Job Posters"
            >
              <Link
                to="profilerequests"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <Menu.Item key="profile-requests" className="elements">
                  Account Requests
                </Menu.Item>
              </Link>
              <Link
                to="viewactiveprofiles"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <Menu.Item key="view-active-profiles" className="elements">
                  Active Profiles
                </Menu.Item>
              </Link>
              <Link
                to="viewdeclinedprofiles"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <Menu.Item key="view-declined-profiles" className="elements">
                  Declined Profiles
                </Menu.Item>
              </Link>
              <Link
                to="deactivatedprofile"
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
                to="jobseekerrequests"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <Menu.Item key="seeker-profile-requests" className="elements">
                  Account Requests
                </Menu.Item>
              </Link>
              <Link
                to="activejobseekers"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <Menu.Item key="seeker-view-active-profiles" className="elements">
                  Active Profiles
                </Menu.Item>
              </Link>
              <Link
                to="declinedjobseekers"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <Menu.Item key="seeker-view-declined-profiles" className="elements">
                  Declined Profiles
                </Menu.Item>
              </Link>
              <Link
                to="deactivatedjobseekers"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <Menu.Item key="seeker-deactivated-profiles" className="elements">
                  Deactivated Profiles
                </Menu.Item>
              </Link>
            </Menu.SubMenu>

            <Menu.SubMenu key="review" icon={<EyeOutlined />} title="Review">
              <Link
                to="jobeekeravgratings"
                style={{ textDecoration: "none", color: "#fff" }}
              >

                <Menu.Item key="see-review" className="elements">
                  Job Seeker Ratings
                </Menu.Item>
              </Link>
              <Link
                to="jobposteravgratings"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <Menu.Item key="review-hold" className="elements">
                  Job Poster Ratings
                </Menu.Item>
              </Link>
              <Link
                to="deletereview"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <Menu.Item key="delete-review" className="elements">
                  Delete Review
                </Menu.Item>
              </Link>
            </Menu.SubMenu>

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
