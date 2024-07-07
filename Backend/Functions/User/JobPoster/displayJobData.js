const connection = require('./../../../Services/connection'); // Ensure the path is correct

module.exports = async function displayJobData(req, res) {
  const { job_poster } = req.query;

  if (!job_poster) {
    return res.status(400).send('job_poster query parameter is required');
  }

  const query = `
    SELECT j.job_id AS jobId, j.title, aj.assigned_job_seeker, j.job_date
    FROM job j
    JOIN assigned_jobs aj ON j.job_id = aj.assigned_job
    WHERE j.job_poster = ?
  `;

  connection.query(query, [job_poster], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Error executing query');
    }

    res.json(results);
  });
};
