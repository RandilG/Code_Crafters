const { HttpStatusCode } = require('axios');
const connection = require('../../../Services/connection');

module.exports = async function updateSeekerStatus(req, res){
    try {
        const seeker = req.params.seekerUname;
        const status = req.body.status;

        const query = "UPDATE `parttime_srilanka`.`job_seeker` SET `status` = ? WHERE (`UserName` = ?);";

        const resp = await queryAsync(query, [status, seeker]);
        console.log(resp.affectedRows);

        if(resp.affectedRows > 0){
            return res.json(HttpStatusCode.Ok)
        }
        return res.json(HttpStatusCode.Forbidden);
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