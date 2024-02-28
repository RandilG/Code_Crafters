const connection = require('./../../../Services/connection')

module.exports = async function register(req, res){

  const{UserName, Password}= req.body;

  const sql = 'INSERT INTO job_poster (UserName, Password) VALUES (?, ?)';
  connection.query(sql, [UserName, Password], (err, result) => {
    if (err) {
      console.error('Error registering admin:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    console.log('Job Seeker registered successfully!');
    res.status(200).send('Registration successful!');
  });
};