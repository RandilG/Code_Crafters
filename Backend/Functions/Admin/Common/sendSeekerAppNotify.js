const { HttpStatusCode } = require('axios');
const connection = require('../../../Services/connection');
const moment = require('moment');

module.exports = async function sendSeekerAppNotify(req, res) {
    try {
        const { title, message, seeker } = req.body;
        const date = new Date();
        const response = {
            title: title,
            message: message,
            date: moment(date).format('YYYY/MM/DD')
        }
        if(seeker !== ""){
            req.app.get('io').to(seeker).emit('seekerNotifyStarted', { notification: response });
            const query = "INSERT INTO `parttime_srilanka`.`seeker_notification` (`title`, `message`, `timeStamp`, `seeker`) VALUES (?, ?, ?, ?);";
            let values = [title, message, date, seeker];
            await queryAsync(query, values);
        }else{
            req.app.get('io').to().emit('allNotifyStarted', {notification: response});
            const query = "INSERT INTO `parttime_srilanka`.`seeker_notification` (`title`, `message`, `timeStamp`) VALUES (?, ?, ?);";
            let values = [title, message, date];
            await queryAsync(query, values);
        }

        return res.json(HttpStatusCode.Ok);
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