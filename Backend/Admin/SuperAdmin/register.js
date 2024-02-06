const connection = require('./../../Services/connection');

// Register endpoint
module.exports = async function register(req, res){

  // Add validation for username and password
  const{username, password}= req.body;

  const sql = 'INSERT INTO admins (username, password) VALUES (?, ?)';
  connection.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error('Error registering admin:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    console.log('Admin registered successfully!');
    res.status(200).send('Registration successful!');
  });
};
