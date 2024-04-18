const { HttpStatusCode } = require('axios');
const connection = require('../../../Services/connection');

module.exports = async function getPendingSeekers(req, res){
    try {
        const query = `SELECT UserId, UserName, FirstName, LastName, TpNumber, BirthDay, Nic, addFline, addSline, street, city, gender, proofDoc_front, proofDoc_Back FROM parttime_srilanka.job_seeker WHERE status='pending';`;

        const resp = await queryAsync(query);

        if(resp.length != 0){
            return res.json(resp);
        }
        return res.json(HttpStatusCode.NotFound);
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