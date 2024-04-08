const { HttpStatusCode } = require('axios');
const connection = require('./../../../Services/connection');

module.exports = async function fetchApproved(req, res){
  try{
    const query = "SELECT * FROM parttime_srilanka.temporary_job WHERE status = 'approved' && job_poster=?;"
    const value = [req.params.jobPoster];

    const approvedJobs = await queryAsync(query, value);

    return res.status(HttpStatusCode.Ok).json(approvedJobs);
  }
  catch(error){
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
