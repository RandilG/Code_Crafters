const { HttpStatusCode } = require('axios');
const connection = require('../../../Services/connection');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

module.exports = async function changePassword(req, res) {
    try {
        const { userName } = req.params;
        const { currentPassword, newPassword } = req.body;

        const query1 = "SELECT password FROM parttime_srilanka.job_seeker WHERE job_seeker.UserName = ?;";

        let resp = await queryAsync(query1, userName);

        const encryptedPW = resp[0].password;
        const isMatch = await bcrypt.compare(currentPassword, encryptedPW);

        if (!isMatch) return res.json(HttpStatusCode.NotAcceptable);

        const saltRound = 10;
        const encryptedPassword = await bcrypt.hash(newPassword, saltRound);

        const query2 = "UPDATE `parttime_srilanka`.`job_seeker` SET `password` = ? WHERE (`UserName` = ?);"

        await queryAsync(query2, [encryptedPassword, userName]);

        return res.json(HttpStatusCode.Ok);
    } catch (error) {
        console.log(error);
        return res.json(HttpStatusCode.InternalServerError);
    }
}

function queryAsync(query, values) {
    return new Promise((resolve, reject) => {
      connection.query(query, values, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }