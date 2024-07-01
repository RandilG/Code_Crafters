const connection = require('../../../Services/connection');
const { HttpStatusCode } = require('axios');
const moment = require('moment');

module.exports = async function getProfile(req, res) {
    try {
        const { userName } = req.params;
        const query = "SELECT FirstName, LastName, TpNumber, BirthDay, Nic, addFline, addSLine, street, city, profilePic FROM parttime_srilanka.job_seeker WHERE UserName = ?;";
        const resp = await queryAsync(query, userName);

        if(resp.length == 0) return res.json(HttpStatusCode.NotFound);

        const seeker = {};
        seeker.fName = resp[0].FirstName;
        seeker.lNAme = resp[0].LastName;
        seeker.mobNum =  resp[0].TpNumber;
        seeker.dob = moment(resp[0].BirthDay).format('YYYY/MM/DD');
        seeker.nic = resp[0].Nic;
        seeker.addFline = resp[0].addFline;
        seeker.addSline = resp[0].addSLine;
        seeker.street = resp[0].street;
        seeker.city = resp[0].city;
        seeker.profilePic = resp[0].profilePic;

        return res.json(seeker);
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