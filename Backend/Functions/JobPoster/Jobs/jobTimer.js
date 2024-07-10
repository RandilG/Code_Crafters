const connection = require('../../../Services/connection');
const { HttpStatusCode } = require("axios");
const moment = require('moment');
require('moment-duration-format');

module.exports = async function jobTimer(req, res) {
  try {
    const { jobId } = req.body;

    const query1 = "SELECT work_hours, title FROM parttime_srilanka.job WHERE job_id = ?";
    const query2 = "SELECT j.FirstName, j.TpNumber FROM parttime_srilanka.job_seeker j JOIN parttime_srilanka.assigned_jobs a ON j.UserName = a.assigned_job_seeker WHERE a.assigned_job = ?;";
    const query3 = "UPDATE parttime_srilanka.job SET status = 'complete' WHERE (job_id = ?);";

    const jobData = await queryAsync(query1, jobId);

    const workHours = jobData[0].work_hours;
    const jobTitle = jobData[0].title;
    const seekerData = await queryAsync(query2, jobId);

    if (seekerData.length === 0) {
      return res.status(HttpStatusCode.Accepted).json({ message: "Job seekers not found." });
    }

    let hours = Math.floor(workHours);
    let minutes = Math.round((workHours - hours) * 60);

    if (hours <= 0 && minutes <= 0) {
      return res.status(HttpStatusCode.NoContent).json({ message: "Invalid work hours." });
    }

    let jobDuration = moment.duration({
      hours: hours,
      minutes: minutes
    });

    let countdownInterval = setInterval(async () => {
      jobDuration = moment.duration(jobDuration - moment.duration(1, 'seconds'));

      if (jobDuration.asMilliseconds() < 0) {
        await queryAsync(query3, jobId);
        clearInterval(countdownInterval);
        return;
      }

      let formattedTime = moment.utc(jobDuration.asMilliseconds()).format('HH:mm:ss');
      req.app.get('io').to(jobId).emit('timerStarted', { timer: formattedTime, jobId: jobId });

    }, 1000);

    return res.status(HttpStatusCode.Ok).json({ message: "Timer started successfully." });

  } catch (error) {
    console.log(error);
    return res.status(HttpStatusCode.InternalServerError).json({ message: "Internal server error." });
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
