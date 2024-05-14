const connection = require('../../../Services/connection');
const bcrypt = require('bcrypt');
const { HttpStatusCode } = require('axios');
const sendMobNotify = require('../../Common/notifications/sendMobNotify');
const sendEmailNotify = require('../../Common/notifications/sendEmailNotify');


module.exports = async function createSeeker(req, res) {
    try {
        const { firstName, lastName, email, mobNo, addFLine, addSLine, street, city, dob, nic, gender, password, proofdoc_front, proofdoc_back } = req.body;
        
        const saltRound = 10;
        const encryptedPassword = await bcrypt.hash(password, saltRound);
   
        const values = [email, firstName, lastName, mobNo, dob, nic, addFLine, addSLine, street, city, gender, encryptedPassword, proofdoc_front, proofdoc_back];
        
        const query1 = "INSERT INTO `parttime_srilanka`.`job_seeker` (`UserName`, `FirstName`, `LastName`, `TpNumber`, `BirthDay`, `Nic`, `addFline`, `addSLine`, `street`, `city`, `gender`, `password`, `proofDoc_front`, `proofDoc_back`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        const query2 = "INSERT INTO `parttime_srilanka`.`coin` (`seeker`) VALUES (?)";


        await queryAsync("START TRANSACTION");

        await queryAsync(query1, values);

        await queryAsync(query2, [email]);

        let message = `Hi ${firstName} ${lastName},\n\nYour registration details have been submitted successfully. The account will be activated after the authorization of our team.\n\nWe will notify you once the account is activated.\n\nThank you,\nTeam JOBS`;

        await sendMobNotify(mobNo, message);

        message = `<font color="#373737"><h4>Hi ${firstName} ${lastName},</h4><h5>Your registration details have been submitted successfully. The account will be activated after the authorization of our team.<br/>We will notify you once the account is activated.<br/><br/>Thank you,<br/>Team JOBS</h5></font>`;
        
        await sendEmailNotify(email, "Registration Status", message);

        await queryAsync("COMMIT"); 

        return res.json(HttpStatusCode.Ok);
    } catch (error) {
        console.log(error);
        await queryAsync("ROLLBACK");
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