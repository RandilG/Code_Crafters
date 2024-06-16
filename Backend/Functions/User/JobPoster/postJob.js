const connection = require('./../../../Services/connection');

module.exports = async function postJob(req, res) {
  const {
    job_id,
    title,
    job_date,
    start_time,
    amount_of_seekers,
    work_hours,
    hourly_rate,
    latitude,
    longitude,
    gender,
    description,
    status,
    job_poster
  } = req.body;

  // Calculate total payment
  const total_payment = work_hours * hourly_rate;

  // Check if total payment is above 1500
  if (total_payment <= 1500) {
    res.status(400).json({ message: 'Total payment must be above 1500' });
    return;
  }

  const sql = `
    INSERT INTO job (
      job_id, title, posted_date, job_date, start_time, 
      amount_of_seekers, work_hours, hourly_rate, 
      latitude, longitude, gender, description, status, job_poster
    ) VALUES (?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(sql, [
    job_id, title, job_date, start_time, amount_of_seekers, 
    work_hours, hourly_rate, latitude, longitude, gender, 
    description, status, job_poster
  ], (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    console.log('Job posted successfully!');
    res.status(201).json({ result: results });
  });
}
