const connection = require('../../../Services/connection');
module.exports = async function viewallCompletedJobInfo(req, res) {
    const query = `
    SELECT 
      aj.id,
      aj.assigned_job_seeker,
      j.title AS job_title
    FROM 
      assigned_jobs aj
    JOIN 
      job j ON aj.assigned_job = j.job_id;
  `;
  
  
    connection.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      console.log('Data successfully retrived!');
      res.json(results);
    });
  };
  