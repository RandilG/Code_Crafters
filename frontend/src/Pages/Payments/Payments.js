import { Space } from "antd";
import PaymentInfoTable from "../../components/Tables/PaymentInfoTable";
import IncomeInfoTableJobSeeker from "../../components/Tables/IncomeInfoTableJobSeekers";


function Payments() {
    return <div className="IncomeTable">
        <Space>
            <PaymentInfoTable />
            <IncomeInfoTableJobSeeker />
        </Space>
    </div>;
}

export default Payments;