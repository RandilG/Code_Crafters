const { HttpStatusCode } = require('axios');
const connection = require('../../../Services/connection');
const moment = require('moment');

module.exports = async function cancelJob(req, res){
    try {
        const {userName, jobId} = req.params;
        const {reason} = req.body;
        
        const query1 = "SELECT * FROM parttime_srilanka.job_cancel WHERE seeker = ? AND jobId = ?";
        const query2 = "SELECT job_date FROM parttime_srilanka.job WHERE job_id = ?;";
        const query3 = "INSERT INTO `parttime_srilanka`.`job_cancel` (`date`, `seeker`, `jobId`, `reason`, `approved`) VALUES (?, ?, ?, ?, ?);";
        const query4 = "DELETE FROM `parttime_srilanka`.`assigned_jobs` WHERE (`assigned_job_seeker` = ? AND `assigned_job`= ?);"; 

        let resp = await queryAsync(query1, [userName, jobId]);

        if(resp.length != 0) return res.json(HttpStatusCode.Conflict);

        resp = await queryAsync(query2, jobId);

        //Check cancel date is 2 days before or not
        const jobDate = moment(resp[0].job_date);
        const currentDate = moment().startOf('day');
        const twoDaysAfter = moment().add(2, 'days').startOf('date');

        const isBeforetwoDays = jobDate.isSameOrAfter(currentDate) && jobDate.isSameOrBefore(twoDaysAfter);

        if(isBeforetwoDays){
            await queryAsync(query3, [new Date(), userName, jobId, reason, 0]);
            return res.json(HttpStatusCode.NotAcceptable);
        }

        await queryAsync("START TRANSACTION");

        await queryAsync(query3, [new Date(), userName, jobId, reason, 1]);
        await queryAsync(query4, [userName, jobId]);

        await queryAsync("COMMIT"); 
        return res.json(HttpStatusCode.Accepted);
    } catch (error) {
        console.log(error);
        await queryAsync("ROLLBACK");
        return res.json(HttpStatusCode.InternalServerError);
    }
}

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