const connection = require('./../../../Services/connection');
const bcrypt = require('bcrypt');

module.exports = async function login(req, res) {
  const { EmailAddress, Password } = req.body;

  const sql = 'SELECT * FROM job_poster WHERE EmailAddress = ?';
  connection.query(sql, [EmailAddress], async (err, results) => {
    if (err) {
      console.error('Error during login:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.length === 0) {
      console.log('User not found.');
      res.status(401).send('Invalid credentials.');
      return;
    }

    const user = results[0];
    const hashedPassword = user.Password;

    // Compare the provided password with the hashed password in the database
    const match = await bcrypt.compare(Password, hashedPassword);

    if (match) {
      console.log('Login successful!');
      res.status(200).send('Login successful!');
    } else {
      console.log('Invalid credentials.');
      res.status(401).send('Invalid credentials.');
    }
  });
};
