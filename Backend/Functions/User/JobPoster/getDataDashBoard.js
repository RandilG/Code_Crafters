const { HttpStatusCode } = require('axios');
const connection = require('../../../Services/connection');

module.exports = async function getDataDashBoard(req, res) {
    try {
        const { EmailAddress } = req.params;
        const query2 = "SELECT s.FirstName, s.LastName, r.review, r.rate FROM parttime_srilanka.poster_ratings r JOIN parttime_srilanka.job_seeker s ON r.seeker = s.UserName WHERE r.poster = ? AND r.deleted_status = 0;";
        const query3 = "SELECT sum(rate) as ratings, count(rate) as count FROM parttime_srilanka.poster_ratings WHERE poster = ?";

        // Initialize response object
        const response = {};

        // Execute query2
        let resp = await queryAsync(query2, [EmailAddress]);
        const reviews = [];
        let totalRates = 0;
        let ratesCount = 0;
        let rates = 0;
        if (resp.length != 0) {
            for (const review of resp) {
                const r = {};
                r.seekerName = review.FirstName + ' ' + review.LastName;
                r.review = review.review;
                r.rate = review.rate;
                if (review.review) {
                    reviews.push(r);
                }
                totalRates += review.rate;
                ratesCount++;
            }
            rates = Number(totalRates / ratesCount).toFixed(1);
        }

        response.reviews = reviews;
        response.rates = rates;

        // Execute query3
        resp = await queryAsync(query3, [EmailAddress]);
        if (resp.length != 0) {
            const count = resp[0].ratings;
            if (count < 100) {
                response.badge = 'blue';
            } else if (count < 200) {
                response.badge = 'bronze';
            } else if (count < 500) {
                response.badge = 'silver';
            } else {
                response.badge = 'gold';
            }
        } else {
            response.badge = 'blue';
        }

        return res.json(response);
    } catch (error) {
        return res.status(HttpStatusCode.InternalServerError).json({ error: error.message });
    }
}

function queryAsync(query, values) {
    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
                console.log(data);
            }
        });
    });
}
