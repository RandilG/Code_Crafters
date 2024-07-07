const connection = require('./../../../Services/connection');

module.exports = async function postJob(req, res) {
  const {
    tempory_job_id,
    title,
    job_date,
    amount_of_seekers,
    work_hours,
    hourly_rate,
    job_poster,
    selectedTitle // Ensure selectedTitle is correctly parsed from req.body
  } = req.body;

  console.log('Title received:', selectedTitle); // Log selectedTitle instead of title

  // Ensure selectedTitle is used in your SQL query or wherever needed

  // Example SQL query
  const sql = `
    INSERT INTO temporary_job (
      tempory_job_id, posted_date, job_date, amount_of_seekers, 
      work_hours, hourly_rate, status, title, job_poster
    ) VALUES (?, NOW(), ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(sql, [
    tempory_job_id, job_date, amount_of_seekers, 
    work_hours, hourly_rate, 'Pending', selectedTitle, job_poster
  ], (err, results) => {
    if (err) {
      console.error('Error posting job:', err);
      return res.status(500).json({ message: 'Error posting job. Please try again later.' });
    }
    console.log('Job posted successfully!');
    res.status(201).json({ message: 'Job posted successfully', result: results });
  });
};
