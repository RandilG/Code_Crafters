const { HttpStatusCode } = require('axios');
const connection = require('../../../Services/connection');
const moment = require('moment');

module.exports = async function applyJob(req, res) {
    try {
        const { userName, jobId } = req.body;
        const query1 = "SELECT j.job_date, j.start_time, j.work_hours FROM parttime_srilanka.assigned_jobs a JOIN parttime_srilanka.job j ON a.assigned_job = j.job_id WHERE a.assigned_job_seeker = ?";
        const query2 = "SELECT job_date, start_time, work_hours FROM parttime_srilanka.job WHERE job_id = ?";
        const query3 = "INSERT INTO `parttime_srilanka`.`assigned_jobs` (`assigned_job_seeker`, `assigned_job`) VALUES (?, ?)";

        const appliedJobsData = await queryAsync(query1, userName);
        const newJobData = await queryAsync(query2, jobId);

        if (newJobData.length == 0) return res.json(HttpStatusCode.NotFound);

        const newJobDate = moment(newJobData[0].job_date);
        const newJobStartTime = moment(newJobData[0].start_time, 'HH:mm:ss');
        const newJobEndTime = moment(newJobData[0].start_time, 'HH:mm:ss').add(newJobData[0].work_hours, 'hours');

        if (appliedJobsData.length != 0) {
            for (const job of appliedJobsData) {
                const appliedJobDate = moment(job.job_date);
                const appliedJobStartTime = moment(job.start_time, 'HH:mm:ss');
                const appliedJobEndTime =  moment(job.start_time, 'HH:mm:ss').add(job.work_hours, 'hours');

                if (newJobDate.isSame(appliedJobDate) &&
                    ((newJobStartTime.isSameOrAfter(appliedJobStartTime) && newJobStartTime.isSameOrBefore(appliedJobEndTime)) ||
                        (newJobEndTime.isSameOrAfter(appliedJobStartTime) && newJobEndTime.isSameOrBefore(appliedJobEndTime)) ||
                        (newJobStartTime.isBefore(appliedJobStartTime) && newJobEndTime.isAfter(appliedJobEndTime))))
                    return res.json(HttpStatusCode.Conflict);
            }
        }

        await queryAsync(query3, [userName, jobId]);

        return res.json(HttpStatusCode.Ok);
    } catch (error) {
        console.log(error);
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