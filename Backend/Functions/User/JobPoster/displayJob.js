const connection = require('./../../../Services/connection');

module.exports = async function displayJob(req, res) {
  const query = "SELECT * FROM parttime_srilanka.job WHERE job_id = ?";
  const job_id = req.params.job_id;  // Get job_id from the request parameters

  //console.log('Received job_id:', job_id);  // Log the received job_id
  //console.log('Type of job_id:', typeof job_id);  // Log the type of job_id

  connection.query(query, [req.params.id], (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }
    res.json(results[0]);
    console.log("job Data retrived!")
  });
};
