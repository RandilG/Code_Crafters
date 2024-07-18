const { HttpStatusCode } = require('axios');
const connection = require("../../../../../Services/connection");

async function getSeekers(req, res) {
  try {
    const query = "SELECT UserName FROM parttime_srilanka.job_seeker;";
    const jobSeekers = await queryAsync(query);

    if (jobSeekers.length === 0) {
      return res.status(HttpStatusCode.Ok).json({ message: "No job seekers found." });
    }

    const usernames = jobSeekers.map(seeker => seeker.UserName);

    return res.status(HttpStatusCode.Ok).json(usernames);
  } catch (error) {
    console.error("Error getting seekers:", error);
    return res.status(HttpStatusCode.InternalServerError).json({ error: "Internal Server Error" });
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

module.exports = getSeekers;