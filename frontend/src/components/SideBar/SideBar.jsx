import React from 'react';
import { Menu } from 'antd';
import { DashboardOutlined, UserOutlined, NotificationOutlined, LogoutOutlined, SettingOutlined, CreditCardOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const MenuList = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Menu onClick={(item) =>{
        navigate(item.key)
      }}
        theme='dark' mode='inline' className='menu-bar' style={{background:"#005758", }}>
        <Menu.Item key="Dashboard" icon={<DashboardOutlined />} style={{hover:"#FFA500"}} >
          Dashboard
        </Menu.Item>
        <Menu.Item key="Income" icon={<UserOutlined />}>Income</Menu.Item>
        <Menu.Item key="Payments" icon={<CreditCardOutlined />}>Payments</Menu.Item>
        <Menu.Item key="Notification" icon={<NotificationOutlined />}>Notification</Menu.Item>
        <Menu.Item key="Settings" icon={<SettingOutlined />}>Settings</Menu.Item>
        <Menu.Item key="logout" icon={<LogoutOutlined />}>Logout</Menu.Item>
      </Menu>
    </div>
  );
};

export default MenuList;
