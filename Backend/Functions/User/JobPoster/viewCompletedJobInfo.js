const connection = require('../../../Services/connection');

module.exports = async function viewCompletedJobInfoById(req, res) {
    // Extract the job ID from the request parameters
    const jobId = req.params.id;

    // Define the SQL query with a WHERE clause
    const query = `
    SELECT 
      aj.id,
      aj.assigned_job_seeker,
      j.title AS job_title
    FROM 
      assigned_jobs aj
    JOIN 
      job j ON aj.assigned_job = j.job_id
    WHERE 
      aj.id = ?;
  `;

    // Execute the query with the provided job ID
    connection.query(query, [jobId], (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }

      // Check if any results were returned
      if (results.length === 0) {
        res.status(404).json({ message: 'Job not found' });
        return;
      }

      console.log('Data successfully retrieved!');
      res.json(results[0]);
    });
};
