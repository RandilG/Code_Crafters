import React from 'react';
import RevenueTableJobPoster from "../../../components/FinancialAdmin/Tables/RevenueTableJobPoster";

function Income() {
    return (

        <div className="IncomeTableContainer">
            <div className="IncomeTableColumn" style={{ marginRight: '20px' }}>
                <RevenueTableJobPoster />
            </div>
        </div>

    );
}

export default Income;
