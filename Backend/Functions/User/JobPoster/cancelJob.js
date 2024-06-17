/*const connection = require('../../../Services/connection');

module.exports = async function cancelJob(req, res) {
    // Extract the job ID from the request parameters
    const jobId = req.params.id;

    // Define the SQL query to update the status to 'canceled'
    const query = `
    UPDATE job
    SET status = 'canceled'
    WHERE job_id = ?;
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

      console.log('Data successfully cancelled!');
      res.json(results[0]);
    });
};*/
