import React from 'react';
import IncomeInfoTableJobPoster from "../../../components/Tables/IncomeInfoTableJobPoster";

function Income() {
    return (

        <div className="IncomeTableContainer">
            <div className="IncomeTableColumn" style={{ marginRight: '20px' }}>
                <IncomeInfoTableJobPoster />
            </div>
        </div>

    );
}

export default Income;
