const { HttpStatusCode } = require('axios');
const connection = require('../../../Services/connection');
const moment = require('moment');

module.exports = async function AppliedJobs(req, res) {
    try {
        const { userName } = req.params;
        const query = "SELECT j.job_id, j.title, j.job_date, j.start_time, j.work_hours, j.hourly_rate, j.latitude, j.longitude, j.description FROM parttime_srilanka.assigned_jobs a JOIN parttime_srilanka.job j ON a.assigned_job = j.job_id WHERE a.assigned_job_seeker = ?";
        const jobs = await queryAsync(query, userName);
        if (jobs.length == 0) return res.json(HttpStatusCode.NotFound);
    
        //Genarate response
        const response = [];
        for(const job of jobs){
            const jobData = {};
            jobData.job_id = job.job_id;
            jobData.title = job.title;
            jobData.job_date = moment(job.job_date).format('YYYY/MM/DD');
            jobData.start_time = moment(job.start_time, 'HH:mm:ss').format('LT');
            jobData.work_hours = job.work_hours;
            jobData.hourly_rate = Number(job.hourly_rate).toFixed(2);
            jobData.income = Number(job.work_hours * job.hourly_rate).toFixed(2);
            jobData.latitude = job.latitude;
            jobData.longitude = job.longitude;
            jobData.description = job.description;
            response.push(jobData);
        }
        return res.json(response);
    } catch (error) {
        console.log(error);
        return res.json(HttpStatusCode.InternalServerError);
    }
};

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