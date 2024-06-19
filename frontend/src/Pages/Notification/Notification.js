import React from 'react';
import { Space, Typography } from "antd";
import AppHeader from '../../components/AppHeader/AppHeader';
import SideBar from '../../components/SideBar/SideBar';

function Notification() {
    return (
        <div className="App">
            <AppHeader />
            <Space className="SideBaraANDPageContent">
                <SideBar />
                <div>
                    <Typography.Title level={4}>Notifications</Typography.Title>
                </div>
            </Space>
        </div>
    );
}
export default Notification;