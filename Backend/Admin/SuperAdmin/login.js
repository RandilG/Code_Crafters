const connection = require('./../../Services/connection')


module.exports = async function login(req, res){

  const{username, password}= req.body;
  
    const sql = 'SELECT * FROM admins WHERE username = ? AND password = ?';
    connection.query(sql, [username, password], (err, results) => {
      if (err) {
        console.error('Error during login:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      if (results.length > 0) {
        console.log('Login successful!');
        res.status(200).send('Login successful!');
      } else {
        console.log('Invalid credentials.');
        res.status(401).send('Invalid credentials.');
      }
    });
  };