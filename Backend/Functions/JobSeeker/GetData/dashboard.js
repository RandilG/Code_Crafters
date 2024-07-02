const { HttpStatusCode } = require('axios');
const connection = require('../../../Services/connection');

module.exports = async function getData(req, res) {
    try {
        const { userName } = req.params;
        const query1 = "SELECT j.FirstName, c.earning, c.withdrawal FROM parttime_srilanka.job_seeker j JOIN parttime_srilanka.coin c ON j.UserName = c.seeker WHERE j.UserName = ?";
        const query2 = "SELECT p.FirstName, p.LastName, r.review, r.rate FROM parttime_srilanka.seeker_ratings r JOIN parttime_srilanka.job_poster p ON r.poster = p.JobPosterID WHERE r.seeker = ? AND r.deleted_status = 0;";
        const query3 = "SELECT sum(rate) as ratings FROM parttime_srilanka.seeker_ratings WHERE seeker = ?";
        let resp = await queryAsync(query1, [userName]);
        if (resp.length != 0) {
            const response = {};
            response.firstName = resp[0].FirstName;
            response.coins = resp[0].earning - resp[0].withdrawal;

            resp = await queryAsync(query2, userName);
            const reviews = [];
            let totalRates = 0;
            let ratesCount = 0;
            let rates = 0;
            if(resp.length != 0) {
                for(const review of resp){
                    const r = {};
                    r.posterName = review.FirstName+' '+review.LastName;
                    r.review = review.review;
                    r.rate = review.rate;
                    if(review.review){
                        reviews.push(r);
                    }
                    totalRates+=review.rate;
                    ratesCount++;
                }
                rates = Number(totalRates/ratesCount).toFixed(1);
            }

            response.reviews = reviews;
            response.rates = rates;

            resp = await queryAsync(query3, [userName]);
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