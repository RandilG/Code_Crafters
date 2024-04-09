const { HttpStatusCode } = require('axios');
const connection = require('./../../../Services/connection');

module.exports = async function fetchPending(req, res){
  console.log('called');
  try{
    const query = "SELECT * FROM parttime_srilanka.temporary_job WHERE status = 'pending' && job_poster=?;"
    const value = [req.params.jobPoster];

    const pendingJobs = await queryAsync(query, value);

    return res.status(HttpStatusCode.Ok).json(pendingJobs);
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
