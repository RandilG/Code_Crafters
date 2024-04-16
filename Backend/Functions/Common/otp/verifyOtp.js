const { HttpStatusCode } = require('axios');
const connection = require('../../../Services/connection');
const cryptoJs = require('crypto-js');

module.exports = async function verifyOtp(req, res){
    try {
        const {user, otp} = req.params;
        const query = 'SELECT * FROM parttime_srilanka.otp WHERE user=?;';
        
        const resp = await queryAsync(query, [user]);

        if(resp.length != 0){
            const encryptedOtp = resp[0].otp;
            const byteText = cryptoJs.AES.decrypt(encryptedOtp, process.env.SECRET_KEY);
            const decryptedOtp = byteText.toString(cryptoJs.enc.Utf8);

            if(decryptedOtp === otp){
                return res.json(HttpStatusCode.Accepted);
            }

            return res.json(HttpStatusCode.NotAcceptable);
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