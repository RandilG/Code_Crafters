const { HttpStatusCode } = require('axios');
const connection = require('../../../Services/connection');
const bcrypt = require('bcrypt');

module.exports = async function recoverPassword(req, res) {
    try {
        const { mobNo } = req.params;
        const { password } = req.body;

        const saltRound = 10;
        const encryptedPassword = await bcrypt.hash(password, saltRound);

        const query = "UPDATE `parttime_srilanka`.`job_seeker` SET `password` = ? WHERE (`TpNumber` = ?);";

        await queryAsync(query, [encryptedPassword, mobNo]);

        return res.json(HttpStatusCode.Ok);
    } catch (error) {
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