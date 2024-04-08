const { HttpStatusCode } = require('axios');
const connection = require('./../../../Services/connection');

module.exports = async function fetchDeclined(req, res) {
  try {
    const query = "SELECT * FROM parttime_srilanka.declined_job INNER JOIN parttime_srilanka.temporary_job WHERE declined_job.job_id = temporary_job.tempory_job_id AND temporary_job.job_poster=?;";
    const value = [req.params.jobPoster];

    const declinedJobs = await queryAsync(query, value);
    return res.status(HttpStatusCode.Ok).json(declinedJobs);
  } catch (error) {
    console.log(error);
    return res.status(HttpStatusCode.InternalServerError).json("Internal Server Error");
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

