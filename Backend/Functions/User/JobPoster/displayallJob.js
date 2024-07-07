const connection = require('./../../../Services/connection');

module.exports = async function displayallJob(req, res) {
  const { jobPosterEmail } = req.query;

  if (!jobPosterEmail) {
    res.status(400).json({ message: 'Job poster email is required' });
    return;
  }

  const query = "SELECT * FROM parttime_srilanka.temporary_job WHERE job_poster = ? AND job_date >= CURDATE()";

  connection.query(query, [jobPosterEmail], (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    console.log('Data successfully retrieved!');
    res.json(results);
  });
};
