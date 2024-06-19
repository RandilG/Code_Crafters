import React from 'react';
import { Space } from "antd";
import AppHeader from '../../components/AppHeader/AppHeader';
import SideBar from '../../components/SideBar/SideBar';
import IncomeInfoTableJobPoster from "../../components/Tables/IncomeInfoTableJobPoster";

function Income() {
    return (
        <div className="App">
        <AppHeader />
        <Space className="SideBaraANDPageContent">
          <SideBar />
        <div className="IncomeTableContainer">
            <div className="IncomeTableColumn" style={{ marginRight: '20px' }}>
                <IncomeInfoTableJobPoster />
            </div>
        </div>
        </Space>
    </div>
    );
}

export default Income;
