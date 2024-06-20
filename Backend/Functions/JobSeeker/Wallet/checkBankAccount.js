const { HttpStatusCode } = require('axios');
const connection = require('../../../Services/connection');

module.exports = async function checkBankAccount(req, res) {
    try {
        const { userName } = req.params;
        const query = "SELECT bankAcc FROM parttime_srilanka.seeker_wallet WHERE seeker = ?;";
        const resp = await queryAsync(query, userName);

        if(resp[0].bankAcc) return res.json(true);

        return res.json(false);
    } catch (error) {
        console.log(error);
        return res.json(HttpStatusCode.InternalServerError);
    }
};

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