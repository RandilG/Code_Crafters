const connection = require('../../../Services/connection');
const { HttpStatusCode } = require('axios');

module.exports = async function updateProfile(req, res){
    try {
        const {userName} = req.params;
        const {mobNum, addFLine, addSline, street, city, profilePic} = req.body;

        const query = "UPDATE `parttime_srilanka`.`job_seeker` SET `TpNumber` = ?, `addFline` = ?, `addSLine` = ?, `street` = ?, `city` = ?, `profilePic` = ? WHERE (`UserName` = ?);";

        await queryAsync(query, [mobNum, addFLine, addSline, street, city, profilePic, userName]);

        return res.json(HttpStatusCode.Ok);
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