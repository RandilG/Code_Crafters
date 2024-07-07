const connection = require('./../../../Services/connection');

module.exports = async function deleteJob(req, res) {
  const jobId = req.params.id;
  const jobPosterEmail = req.body.jobPosterEmail; // Assuming job poster email is sent in the request body

  if (!jobPosterEmail) {
    return res.status(400).json({ message: 'Job poster email is required' });
  }

  const sql = 'DELETE FROM temporary_job WHERE tempory_job_id = ? ';

  connection.query(sql, [jobId, jobPosterEmail], (err, results) => {
    if (err) {
      console.error('Error deleting job:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Job not found or you do not have permission to delete this job' });
    }

    res.json({ message: 'Job deleted successfully' });
  });
};
