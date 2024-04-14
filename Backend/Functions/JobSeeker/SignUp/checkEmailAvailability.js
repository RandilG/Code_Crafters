const { HttpStatusCode } = require('axios');
const connection = require('../../../Services/connection');

module.exports = async function checkEmailAvailability(req, res) {
  try {
    const query = 'SELECT * FROM parttime_srilanka.job_seeker WHERE UserName = ?;';
    const resp = await queryAsync(query, [req.params.email]);

    if (resp.length != 0) return res.json(HttpStatusCode.Found);

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