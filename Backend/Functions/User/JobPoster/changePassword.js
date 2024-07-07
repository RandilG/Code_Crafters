const connection = require('./../../../Services/connection');
const bcrypt = require('bcrypt');

module.exports = async function updatePassword(req, res) {
  const { EmailAddress, currentPassword, newPassword } = req.body;

  // Log the received body for debugging
  console.log('Request Body:', req.body);

  if (!EmailAddress || !currentPassword || !newPassword) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }

  try {
    // Fetch the current password hash from the database using the EmailAddress
    const query = `SELECT Password FROM job_poster WHERE EmailAddress = ?`;
    connection.query(query, [EmailAddress], async (err, results) => {
      if (err) {
        console.error('Database error:', err.message);
        res.status(500).json({ message: 'Database error: ' + err.message });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ message: 'JobPoster not found' });
        return;
      }

      const dbPassword = results[0].Password;

      // Compare the current password with the stored hash
      const match = await bcrypt.compare(currentPassword, dbPassword);
      if (!match) {
        res.status(401).json({ message: 'Current password is incorrect' });
        return;
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the password in the database
      const updateQuery = `UPDATE job_poster SET Password = ? WHERE EmailAddress = ?`;
      connection.query(updateQuery, [hashedPassword, EmailAddress], (err, results) => {
        if (err) {
          console.error('Database error:', err.message);
          res.status(500).json({ message: 'Database error: ' + err.message });
          return;
        }

        res.status(200).json({ message: 'Password updated successfully' });
        console.log("Password updated successfully for", EmailAddress);
      });
    });
  } catch (error) {
    console.error('Server error:', error.message);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};
