const { HttpStatusCode } = require('axios');
const connection = require('../../../Services/connection');

module.exports = async function getData(req, res) {
    try {
        const { userName } = req.params;
        const query1 = "SELECT j.FirstName, j.gender, c.earning, c.withdrawal FROM parttime_srilanka.job_seeker j JOIN parttime_srilanka.coin c ON j.UserName = c.seeker WHERE j.UserName = ?";
        const query2 = "SELECT sum(rate) as ratings FROM parttime_srilanka.seeker_ratings WHERE seeker = ?";
        let resp = await queryAsync(query1, [userName]);
        if (resp.length != 0) {
            const response = {};
            response.firstName = resp[0].FirstName;
            response.gender = resp[0].gender;
            response.coins = resp[0].earning - resp[0].withdrawal;
            resp = await queryAsync(query2, [userName]);
            if (resp.length != 0) {
                const count = resp[0].ratings;
                if (count < 100) {
                    response.badge = 'blue';
                    return res.json(response);
                }
                if (count < 200) {
                    response.badge = 'bronze';
                    return res.json(response);
                }
                if (count < 500) {
                    response.badge = 'silver';
                    return res.json(response);
                }
                response.badge = 'gold';
                return res.json(response);
            } else {
                response.badge = 'blue';
                return res.json(response);
            }
        }
        return res.json(HttpStatusCode.NotFound);
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