const connection = require('./../../Services/connection');
const bcrypt = require('bcrypt');

module.exports = async function login(req, res) {
  const { Email, Password } = req.body;
  
  try {
    const sql = 'SELECT * FROM admins WHERE Email = ?';
    connection.query(sql, [Email], async (err, results) => {
      if (err) {
        console.error('Error during login:', err);
        return res.status(500).send('Internal Server Error');
      }

      if (results.length === 0) {
        console.log('Invalid credentials.');
        return res.status(401).send('Invalid credentials.');
      }

      const user = results[0];

      // Compare the provided password with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(Password, user.Password);
      if (!passwordMatch) {
        console.log('Invalid credentials.');
        return res.status(401).send('Invalid credentials.');
      }

      console.log('Login successful!');
      res.status(200).send('Login successful!');
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal Server Error');
  }
};
