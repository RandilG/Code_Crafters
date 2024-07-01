import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { BellFilled, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, Button } from "antd";
import "./Header.css";
import logo from '../../Assets/Union.png';

const Header = () => {
  const [userData, setUserData] = useState({});
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const email = sessionStorage.getItem("email");
      try {
        const response = await axios.get('http://localhost:8000/get-admin-data', { params: { email } });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        Name: {userData.FirstName} {userData.LastName}
      </Menu.Item>
      <Menu.Item key="2">
        Role: {userData.AdminRole}
      </Menu.Item>
      <Menu.Item key="2">
        Email: {userData.Email}
      </Menu.Item>

    </Menu>
  );

  return (
    <div className="header-container">
      <div className="logo">
        <img src={logo} alt="Company Logo" />
      </div>


      <div className="notification">
        <Link to="/financialAdmin/Notification">
          <BellFilled style={{ color: 'white' }} />
        </Link>
      </div>

      <div className="profile">
        <Dropdown
          overlay={menu}
          visible={dropdownVisible}
          onVisibleChange={(flag) => setDropdownVisible(flag)}
        >
          <Space>
            <UserOutlined style={{ color: 'white' }} />
            <p style={{ color: 'white' }}>{userData.FirstName} {userData.LastName}</p>
          </Space>
        </Dropdown>
      </div>
      <div className="logout">
        <Button
          type="primary"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'white' }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Header;
