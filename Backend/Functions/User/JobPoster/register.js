const connection = require('./../../../Services/connection');

module.exports = async function register(req, res) {
  const { UserName, Password, EmailAddress, TpNumber, CompanyName, Address } = req.body;

  // Check if all required fields are present
  if (!UserName || !Password || !EmailAddress || !TpNumber || !CompanyName || !Address) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Check if a user with the same UserName, EmailAddress, TpNumber, and CompanyName already exists
  const duplicateCheckSql =
    'SELECT * FROM job_poster WHERE UserName = ? OR EmailAddress = ? OR TpNumber = ? OR CompanyName = ?';
  
  connection.query(
    duplicateCheckSql,
    [UserName, EmailAddress, TpNumber, CompanyName],
    (duplicateCheckErr, duplicateCheckResult) => {
      if (duplicateCheckErr) {
        console.error('Error checking for duplicate records:', duplicateCheckErr);
        return res.status(500).send('Internal Server Error');
      }

      // If there are existing records, return an error
      if (duplicateCheckResult.length > 0) {
        return res.status(400).json({ error: 'User with the same details already exists.' });
      }

      // No duplicate records found, proceed with registration
      const insertSql =
        'INSERT INTO job_poster (UserName, CompanyName, Address, TpNumber, EmailAddress, Password) VALUES (?, ?, ?, ?, ?, ?)';
      
      connection.query(insertSql, [UserName, CompanyName, Address, TpNumber, EmailAddress, Password ], (err, result) => {
        if (err) {
          console.error('Error registering Job Poster:', err);
          return res.status(500).send('Internal Server Error');
        }

        console.log('Job Poster registered successfully!');
        res.status(201).json({ message: 'Registration successful!' });
      });
    }
  );
};
