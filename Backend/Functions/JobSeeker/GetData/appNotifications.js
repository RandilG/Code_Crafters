const { HttpStatusCode } = require('axios');
const connection = require('../../../Services/connection');
const moment = require('moment');

module.exports = async function appNotifications(req, res) {
    try {
        const { userName } = req.params;

        const query = "SELECT title, message, timeStamp FROM parttime_srilanka.seeker_notification WHERE seeker=? OR seeker IS NULL ORDER BY timeStamp DESC;";
        let response = [];
        const resp = await queryAsync(query, userName);

        if(resp.length == 0) return res.json(response);

        for(const n of resp){
            const notification = {};
            notification.title = n.title;
            notification.message = n.message;
            notification.date = moment(n.timeStamp).format("YYYY/MM/DD");
            response.push(notification);
        }

        return res.json(response);
    } catch (error) {
        console.log(error);
        return res.status(HttpStatusCode.InternalServerError);
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