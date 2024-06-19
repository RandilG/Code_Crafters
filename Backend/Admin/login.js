const express = require('express');
const cors = require('cors');
const connection = require('../Services/connection');
const bcrypt = require('bcrypt');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
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
});
