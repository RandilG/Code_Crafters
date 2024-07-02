const { HttpStatusCode } = require('axios');
const connection = require('../../../Services/connection');
const bcrypt = require('bcrypt');

module.exports = async function deleteAccount(req, res){
    try {
        const {userName} = req.params;
        const {password} = req.body;

        const query1 = "SELECT password FROM parttime_srilanka.job_seeker WHERE job_seeker.UserName = ?;";

        let resp = await queryAsync(query1, userName);

        const encryptedPW = resp[0].password;
        const isMatch = await bcrypt.compare(password, encryptedPW);

        if (!isMatch) return res.json(HttpStatusCode.NotAcceptable);

        const query2 = "UPDATE `parttime_srilanka`.`job_seeker` SET `terminated` = '1' WHERE (`UserName` = ?);";

        await queryAsync(query2, userName);
      
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