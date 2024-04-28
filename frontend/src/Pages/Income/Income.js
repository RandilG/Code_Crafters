import React from 'react';
import IncomeInfoTableJobPoster from "../../components/Tables/IncomeInfoTableJobPoster";
import IncomeInfoTableJobSeeker from "../../components/Tables/IncomeInfoTableJobSeekers";

function Income() {
    return (
        <div className="IncomeTableContainer">
            <div className="IncomeTableColumn" style={{ marginRight: '20px' }}>
                <IncomeInfoTableJobPoster />
            </div>
            <div className="IncomeTableColumn" style={{ marginLeft: '20px' }}>
                <IncomeInfoTableJobSeeker />
            </div>
        </div>
    );
}

export default Income;
