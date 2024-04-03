import { Space } from "antd";
import PaymentInfoTable from "../../components/Tables/PaymentInfoTable";


function Payments() {
    return <div className="IncomeTable">
        <Space>
            <PaymentInfoTable />
        </Space>
    </div>;
}

export default Payments;