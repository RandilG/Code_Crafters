const { HttpStatusCode } = require('axios');
const connection = require('../../../Services/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = async function signIn(req, res){
    try {
        const {userName, password} = req.params;
        const query = "SELECT password, status FROM parttime_srilanka.job_seeker WHERE job_seeker.UserName = ?;";
        const resp = await queryAsync(query, userName);
        if(resp.length!=0){
            const encryptedPW = resp[0].password;
            const status = resp[0].status;
            if(status === "approved"){
                const isMatch = await bcrypt.compare(password, encryptedPW)
                if(isMatch){
                    const token = jwt.sign({userName: userName}, process.env.SECRET_KEY, {expiresIn: '30d'});
                    return res.json({token: token});
                }else{
                    return res.json(HttpStatusCode.NotAcceptable);
                }
            }else if(status === "pending"){
                return res.json(HttpStatusCode.Unauthorized);
            }else if(status === "declined"){
                return res.json(HttpStatusCode.Forbidden);
            }else{
                return res.json(HttpStatusCode.InternalServerError);
            }
        }else{
            return res.json(HttpStatusCode.NotFound);
        }
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