const connection = require('./../../../Services/connection');

module.exports = async function login(req, res) {
  const { UserName, Password } = req.body;

  const sql = 'SELECT * FROM job_poster WHERE UserName = ? AND Password = ?';
  connection.query(sql, [UserName, Password], (err, results) => {
    if (err) {
      console.error('Error during login:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.length > 0) {

      console.log('Login successful!');
      res.status(200).send('Login successful!');
    } else {
      console.log('Invalid username or password');
      res.status(401).send('Invalid username or password');
    }
  });
};
