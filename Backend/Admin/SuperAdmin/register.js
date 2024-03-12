const express = require('express');
const bcrypt = require('bcrypt');
const connection = require('./../../Services/connection');

module.exports = async function adminRegister(req, res) {
  const { username, password, email } = req.body;

  // Check if all required fields are present
  if (!username || !password || !email) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Check if a user with the same UserName or EmailAddress already exists
  const duplicateCheckSql =
    'SELECT * FROM admins WHERE username = ? OR email = ?';

  connection.query(
    duplicateCheckSql,
    [username, email],
    async (duplicateCheckErr, duplicateCheckResult) => {
      if (duplicateCheckErr) {
        console.error('Error checking for duplicate records:', duplicateCheckErr);
        return res.status(500).send('Internal Server Error');
      }

      // If there are existing records, return an error
      if (duplicateCheckResult.length > 0) {
        return res.status(400).json({ error: 'User with the same details already exists.' });
      }

      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO admins (username, password, email) VALUES (?, ?, ?)';
        await connection.query(sql, [username, hashedPassword, email]);
        res.status(201).json({ message: 'Registration successful.' });
      } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  );
};
