const connection = require('../../../Services/connection');
const bcrypt = require('bcrypt');

async function changePassword(req, res) {
  const sql = `UPDATE admins SET Password = ?, pasword_status = 'changed' WHERE Email = ?`;
  
  const { email, newPassword } = req.body; 

  try {

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    connection.query(sql, [hashedPassword, email], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
      } else {
        return res.status(200).send("Password changed successfully");
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
}

module.exports = changePassword;
