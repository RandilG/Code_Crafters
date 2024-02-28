const express = require('express');
const bcrypt = require('bcrypt');
const connection = require('./../../Services/connection');

module.exports = async function adminRegister(req, res){
  const { username, password, email } = req.body;

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
