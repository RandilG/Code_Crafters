const { HttpStatusCode } = require('axios');
const connection = require('../../Services/connection');

module.exports = async function fetchFinancialDataJobSeeker(req, res) {
    try {
        const query1 = `
            SELECT payment.payment_id, payment.payment_date, payment.seeker_charge, job_job_seeker.UserName
            FROM parttime_srilanka.payment 
            INNER JOIN parttime_srilanka.job ON payment.job_id = job.job_id 
            INNER JOIN (
                SELECT job_job_seeker.UserName, job.job_id
                FROM parttime_srilanka.job_job_seeker 
                INNER JOIN parttime_srilanka.job ON job_job_seeker.job_id = job.job_id
            ) AS job_job_seeker ON job_job_seeker.job_id = payment.job_id;
        `;

        const query2 = 'SELECT FirstName, LastName FROM job_seeker WHERE UserName=?';

        const financialData = await queryAsync(query1);
        const returnData = [];

        if (financialData != null) {
            for (const job of financialData) {
                const user = await queryAsync(query2, [job.UserName]); // Assuming job.EmailAddress contains the email
              
                job.seekername = user[0].FirstName + ' ' + user[0].LastName;
                returnData.push(job);
            }
            
            return res.status(HttpStatusCode.Ok).json(returnData);
        } else {
            return res.status(HttpStatusCode.NotFound).json("Ads not found");
        }
    } catch (error) {
        console.error(error);
        return res.status(HttpStatusCode.InternalServerError).json("Internal Server Error");
    }
};

// Helper function to wrap connection.query in a promise
function queryAsync(query, values) {
    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}
