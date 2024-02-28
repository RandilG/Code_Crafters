const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const connection = require('./../../Services/connection');

router.post('/verify-mobile', async (req, res) => {
  const { mobile, otp } = req.body;

  // Verify OTP code
  try {
    const sql = 'UPDATE admins SET mobile_verified = 1 WHERE mobile = ? AND otp_code = ?';
    const [result] = await db.query(sql, [mobile, otp]);
    if (result.affectedRows > 0) {
      res.status(200).send('Mobile number verified successfully.');
    } else {
      res.status(400).send('Invalid or expired OTP code.');
    }
  } catch (error) {
    console.error('Error verifying mobile number:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});