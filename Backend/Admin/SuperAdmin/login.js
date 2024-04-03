const connection = require('./../../Services/connection')


module.exports = async function login(req, res){
console.log(req.body)
  const{Email, Password}= req.body;
  
    const sql = 'SELECT * FROM admins WHERE Email = ? AND Password = ?';
    connection.query(sql, [Email, Password], (err, results) => {
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