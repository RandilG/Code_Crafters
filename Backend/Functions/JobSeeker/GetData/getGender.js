const { HttpStatusCode } = require('axios');
const connection = require('../../../Services/connection');

module.exports = async function getGender(req, res) {
    try {
        const { userName } = req.params;
        const query = "SELECT gender FROM parttime_srilanka.job_seeker WHERE job_seeker.UserName = ?;";

        const resp = await queryAsync(query, userName);
        if (resp.length != 0) {
            return res.json({"gender":resp[0].gender});
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