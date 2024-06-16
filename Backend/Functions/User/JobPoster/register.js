const connection = require('./../../../Services/connection');
const bcrypt = require('bcrypt');

module.exports = async function register(req, res) {
  const { Password, EmailAddress, TpNumber, CompanyName, Address, city, FirstName, LastName } = req.body;

  // Check if all required fields are present
  if (!Password || !EmailAddress || !TpNumber || !CompanyName || !Address || !city || !FirstName || !LastName) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Check if a user with the same EmailAddress, TpNumber, and CompanyName already exists
  const duplicateCheckSql = 'SELECT * FROM job_poster WHERE EmailAddress = ? OR TpNumber = ? OR CompanyName = ?';
  connection.query(duplicateCheckSql, [EmailAddress, TpNumber, CompanyName], async (duplicateCheckErr, duplicateCheckResult) => {
    if (duplicateCheckErr) {
      console.error('Error checking for duplicate records:', duplicateCheckErr);
      return res.status(500).send('Internal Server Error');
    }

    // If there are existing records, return an error
    if (duplicateCheckResult.length > 0) {
      return res.status(400).json({ error: 'User with the same details already exists.' });
    }

    try {
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(Password, 10);

      // No duplicate records found, proceed with registration
      const insertSql = 'INSERT INTO job_poster (CompanyName, Address, TpNumber, EmailAddress, Password, city, FirstName, LastName) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      connection.query(insertSql, [CompanyName, Address, TpNumber, EmailAddress, hashedPassword, city, FirstName, LastName], (err, result) => {
        if (err) {
          console.error('Error registering Job Poster:', err);
          return res.status(500).send('Internal Server Error');
        }

        console.log('Job Poster registered successfully!');
        res.status(201).json({ message: 'Registration successful!' });
      });
    } catch (hashError) {
      console.error('Error hashing password:', hashError);
      res.status(500).send('Internal Server Error');
    }
  });
};
