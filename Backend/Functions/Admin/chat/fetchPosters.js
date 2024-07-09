const { HttpStatusCode } = require('axios');
const connection = require('../../../Services/connection');

async function getPosters(req, res) {
  try {
    const query = "SELECT EmailAddress FROM parttime_srilanka.job_poster;";
    const jobPosters = await queryAsync(query);

    if (jobPosters.length === 0) {
      return res.status(HttpStatusCode.Ok).json({ message: "No job posters found." });
    }

    const usernames = [];

    for(const poster of jobPosters) {
      usernames.push(poster.EmailAddress);
    }

    return res.status(HttpStatusCode.Ok).json(usernames);
  } catch (error) {
    console.error(error);
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

module.exports = getPosters;
