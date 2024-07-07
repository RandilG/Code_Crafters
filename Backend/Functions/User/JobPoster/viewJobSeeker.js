const connection = require('./../../../Services/connection');

// GET all users with optional search by name or email
module.exports = function viewJobSeeker(req, res) {
  let { search } = req.query;
  let sql = `
    SELECT UserId, CONCAT(FirstName, ' ', LastName) AS name, UserName AS email
    FROM parttime_srilanka.job_seeker
    WHERE CONCAT(FirstName, ' ', LastName) LIKE ?
       OR UserName LIKE ?
  `;
  search = `%${search}%`; // Add wildcards for SQL LIKE operator

  connection.query(sql, [search, search], (err, results) => {
    if (err) {
      console.error('Error fetching job seekers:', err); // Corrected log message to match functionality
      return res.status(500).json({ error: 'An error occurred while fetching job seekers' });
    }
    console.log('Data successfully searched!');
    res.json(results);
  });
};
