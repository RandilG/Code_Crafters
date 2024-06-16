const connection = require('./../../../Services/connection');
const bcrypt = require('bcrypt'); // For hashing passwords

module.exports = async function updatePassword(req, res) {
  const { JobPosterID, currentPassword, newPassword } = req.body;

  if (!JobPosterID || !currentPassword || !newPassword) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }

  // Fetch the current password from the database
  const query = `SELECT Password FROM job_poster WHERE JobPosterID = ?`;

  connection.query(query, [JobPosterID], async (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: 'JobPoster not found' });
      return;
    }

    const dbPassword = results[0].Password;

    // Compare current password with the stored password
    const match = await bcrypt.compare(currentPassword, dbPassword);
    if (!match) {
      res.status(401).json({ message: 'Current password is incorrect' });
      return;
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    const updateQuery = `UPDATE job_poster SET Password = ? WHERE JobPosterID = ?`;
    connection.query(updateQuery, [hashedPassword, JobPosterID], (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      res.status(200).json({ message: 'Password updated successfully' });
      console.log("Password updated successfully")
    });
  });
}
