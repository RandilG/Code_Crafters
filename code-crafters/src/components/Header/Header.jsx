import React from "react";
//styles
import "./Header.css";

//   antdesign components
import {BellOutlined, UserOutlined} from '@ant-design/icons';
import { Input, Space } from "antd";
const { Search } = Input;
const onSearch = (value) => console.log(value);


const Header = () => {
  return (
    <div className="header-container">
      <div className="welcome-msg">
        <h3>Welcome,&nbsp;</h3>
        <h3>Savindu</h3>
      </div>
      <div className="search-bar">
        <Space direction="vertical" >
          <Search
            placeholder="Search...."
            onSearch={onSearch}
            style={{
              width: 400,
            }}
          />
        </Space>
      </div>
      <div className="notification">
      <BellOutlined />
      </div>
      <div className="profile">
      <UserOutlined />&nbsp;&nbsp;&nbsp;    
      <p>Savindu Nethsara</p>
      </div>
    </div>
  );
};

export default Header;
