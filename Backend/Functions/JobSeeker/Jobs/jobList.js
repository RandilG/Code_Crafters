const { HttpStatusCode } = require('axios');
const connection = require('../../../Services/connection');
const moment = require('moment');

module.exports = async function jobList(req, res) {
    try {
        const { gender, userName } = req.query;
        const date = new Date();
        const query1 = "SELECT job_id, title, job_date, start_time, work_hours, hourly_rate, longitude, latitude, description, job_poster, amount_of_seekers FROM parttime_srilanka.job WHERE job_date >= ? AND (gender = ? OR gender = 'common') ORDER BY job_date ASC";
        const query2 = "SELECT poster, rate FROM parttime_srilanka.poster_ratings;";
        const query3 = "SELECT * FROM parttime_srilanka.assigned_jobs;";
        const query4 = "SELECT * FROM parttime_srilanka.assigned_jobs WHERE assigned_job_seeker=?";

        const jobs = await queryAsync(query1, [date, gender]);
        const rates = await queryAsync(query2);
        const appliedJobs = await queryAsync(query3);
        const seekerApliedJob = await queryAsync(query4, userName);

        const respoonse = [];

        if (jobs.length != 0) {
            //Generate response
            for (const job of jobs) {
                let appliedCount = [];
                if (appliedJobs.length != 0) {
                    appliedCount = appliedJobs.filter((a) => a.assigned_job === job.job_id);
                }

                let seekerJobs = [];
                if (seekerApliedJob.length != 0) {
                    seekerJobs = seekerApliedJob.filter((s) => s.assigned_job === job.job_id);
                }

                //Remove required seeker amount is alredy completed jobs and seeker already applied jobs
                if (appliedCount.length !== job.amount_of_seekers && seekerJobs.length == 0) {
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
                    //Add poster's rates to the response
                    if (rates.length != 0) {
                        const posterRates = rates.filter((r) => r.poster === job.job_poster);
                        if (posterRates.length != 0) {
                            let count = 0;
                            let totalRates = 0;
                            for (const rate of posterRates) {
                                totalRates += rate.rate;
                                count++;
                            }
                            jobData.rates = Math.round(totalRates / count);
                        } else {
                            jobData.rates = 0;
                        }
                    } else {
                        jobData.rates = 0;
                    }
                    respoonse.push(jobData);
                }
            }
            return res.json(respoonse);
        }
        return res.json(HttpStatusCode.NotFound);
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