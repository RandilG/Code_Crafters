import { Space } from "antd";
import IncomeInfoTableJobPoster from "../../components/Tables/IncomeInfoTableJobPoster";
import IncomeInfoTableJobSeeker from "../../components/Tables/IncomeInfoTableJobSeekers";

function Income() {
    return <div className="IncomeTable">
            <IncomeInfoTableJobPoster />
            <IncomeInfoTableJobSeeker />
    </div>;
}

export default Income;