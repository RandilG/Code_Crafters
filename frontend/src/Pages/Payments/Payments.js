import React from 'react';
import { Space } from "antd";
import AppHeader from '../../components/AppHeader/AppHeader';
import SideBar from '../../components/SideBar/SideBar';
import PaymentInfoTable from "../../components/Tables/PaymentInfoTable";
import IncomeInfoTableJobSeeker from "../../components/Tables/IncomeInfoTableJobSeekers";


function Payments() {
    return (
        <div className="App">
            <AppHeader />
            <Space className="SideBaraANDPageContent">
                <SideBar />
                <div className="IncomeTable">
                    <Space>
                        <PaymentInfoTable />
                        <IncomeInfoTableJobSeeker />
                    </Space>
                </div>
            </Space>
        </div>
    );
}

export default Payments;