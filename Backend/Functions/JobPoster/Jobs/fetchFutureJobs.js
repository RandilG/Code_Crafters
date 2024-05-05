// Import necessary dependencies
const { HttpStatusCode } = require("axios");
const connection = require("./../../../Services/connection");

// Export asynchronous function to fetch future jobs
module.exports = async function fetchFutureJobs(req, res) {
  try {
      // Define SQL query to select future jobs for a specific job poster in job table=-, ordered by job date
    const query = "SELECT * FROM parttime_srilanka.job WHERE job_poster=? ORDER BY job_date ASC;";
    const value = [req.params.jobPoster];

    // Define SQL query to select assigned seekers for the same job
    const query2 = "select a.assigned_job from parttime_srilanka.assigned_jobs a left join parttime_srilanka.job j on a.assigned_job = j.job_id where j.job_poster = ?;";
   
    const futureJobs = await queryAsync(query, value);
    const assignedJobs = await queryAsync(query2, value);

    // Initialize array to store response data
    const response = [];

    if(futureJobs.length>0){
      if(assignedJobs.length>0){
        for(const futureJob of futureJobs){
          console.log(futureJob);
          const matchingJobs = assignedJobs.filter((job) => job.assigned_job === futureJob.job_id);
          if(matchingJobs){
              const count = matchingJobs.length;
              futureJob.count = count;
          }else{
              const count = 0;
              futureJob.count = count;
            }
            response.push(futureJob);
          }
        }
    }

    // Return response with status code and JSON data
    return res.status(HttpStatusCode.Ok).json(response);
  } catch (error) {
    // If error occurs, return internal server error status code and message
    console.log(error);
    return res
      .status(HttpStatusCode.InternalServerError)
      .json("Internal Server Error");
  }
};

// Function to execute SQL queries asynchronously
function queryAsync(query, values) {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (err, data) => {
      if (err) {
        reject(err);// If error occurs, reject the promise
      } else {
        resolve(data);// If successful, resolve the promise with query result
      }
    });
  });
}
