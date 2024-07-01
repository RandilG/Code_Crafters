import React from 'react';
import { Space } from "antd";
import PaymentInfoTable from "../../../components/FinancialAdmin/Tables/PaymentInfoTable";
import IncomeInfoTableJobSeeker from "../../../components/FinancialAdmin/Tables/IncomeInfoTableJobSeekers";


function Payments() {
    return (
                <div className="IncomeTable">
                    <Space>
                        <PaymentInfoTable />
                        <IncomeInfoTableJobSeeker />
                    </Space>
                </div>
    );
}

export default Payments;