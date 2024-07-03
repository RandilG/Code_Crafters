const { HttpStatusCode } = require('axios');
const connection = require('../../../Services/connection');

module.exports = async function mobNoAvailability(req, res) {
    try {
        const { mobNo } = req.params;

        const query = "SELECT FirstName, LastName FROM parttime_srilanka.job_seeker WHERE TpNumber = ?;";

        const resp = await queryAsync(query, mobNo);

        if (resp.length == 0) return res.json(HttpStatusCode.NotFound);

        const response = {
            firstName: resp[0].FirstName,
            lastName: resp[0].LastName
        }

        return res.json(response);
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