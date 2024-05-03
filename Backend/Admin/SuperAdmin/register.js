const express = require('express');
const bcrypt = require('bcrypt');
const connection = require('./../../Services/connection');

module.exports = async function adminRegister(req, res) {
  
  // Check if all required fields are present
  // if (!username || !password || !email) {
  //   return res.status(400).json({ error: 'All fields are required.' });
  // }
  
const Email = req.body.Email
  const duplicateCheckSql =
    'SELECT * FROM admins WHERE Email = ?';

  connection.query(
    duplicateCheckSql,
    [Email],
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
        const hashedPassword = await bcrypt.hash(req.body.Password, 10);

        const values=[req.body.FirstName,req.body.LastName,hashedPassword,req.body.Email,req.body.AdminRole]

        const sql = 'INSERT INTO `parttime_srilanka`.`admins` (`FirstName`, `LastName`, `Password`, `Email`, `AdminRole`) VALUES (?, ?, ?, ?, ?)';
        connection.query(sql, values, (err, result)=>{
          if(err){
            console.log(err)
          }
        })
        res.status(201).json({ message: 'Registration successful.' });
      } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  );
};
