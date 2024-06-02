const { HttpStatusCode } = require('axios');
const connection = require('../../../Services/connection');
const moment = require('moment');

module.exports = async function completedJobs(req, res) {
    try {
        const { userName } = req.params;
        const query1 = "SELECT j.job_id, j.title,j.job_date, j.start_time, j.work_hours, j.hourly_rate, j.latitude, j.longitude, j.description FROM parttime_srilanka.job j JOIN parttime_srilanka.assigned_jobs a ON j.job_id = a.assigned_job WHERE a.assigned_job_seeker = ? AND j.status = 'complete'";
        const query2 = "SELECT job_id, rate, review FROM parttime_srilanka.poster_ratings WHERE seeker = ?";

        const jobs = await queryAsync(query1, userName);

        const rates = await queryAsync(query2, userName);

        if (jobs.length == 0) return res.json(HttpStatusCode.NotFound);

        //Genarate response
        const response = [];
        for (const job of jobs) {
            const jobData = {};
            jobData.job_id = job.job_id;
            jobData.title = job.title;
            jobData.job_date = moment(job.job_date).format('YYYY/MM/DD');
            jobData.start_time = moment(job.start_time, 'HH:mm:ss').format('LT');
            jobData.work_hours = job.work_hours;
            jobData.hourly_rate = Number(job.hourly_rate).toFixed(2);
            jobData.income = Number(job.work_hours * job.hourly_rate).toFixed(2);
            jobData.longitude = job.longitude;
            jobData.latitude = job.latitude;
            jobData.description = job.description;
            if(rates.length != 0){
                const rate = rates.filter((r) => r.job_id == job.job_id);
                if(rate.length != 0){
                    jobData.rates = rate[0].rate;
                    jobData.review = rate[0].review;
                }else{
                    jobData.rates = null;
                    jobData.review = null;
                }
            }else{
                jobData.rates = null;
                jobData.review = null;
            }
            response.push(jobData);
        }

        //Sort response
        response.sort((a, b) => {
            if (a.rates === null && b.rates !== null) {
                return -1; // a is null and b is not null, so a comes first
            } else if (a.rates !== null && b.rates === null) {
                return 1; // b is null and a is not null, so b comes first
            } else {
                return 0; // Both are either null or non-null, so their order doesn't change
            }
        });

        return res.json(response);
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