const { HttpStatusCode } = require('axios');
const connection = require('../../../Services/connection');
const sendMobNotify = require('../../Common/notifications/sendMobNotify');
const sendEmailNotify = require('../../Common/notifications/sendEmailNotify');

module.exports = async function updateSeekerStatus(req, res) {
    try {
        const seeker = req.params.seekerUname;
        const {firstName, lastName, mobNo, email, status} = req.body;

        await queryAsync("START TRANSACTION");

        const query = "UPDATE `parttime_srilanka`.`job_seeker` SET `status` = ? WHERE (`UserName` = ?);";

        const resp = await queryAsync(query, [status, seeker]);

        let mobMessage = '';
        let emailMessage = '';

        if (resp.affectedRows == 0) {
            return res.json(HttpStatusCode.Forbidden);
        }

        if (status === 'approved') {
            mobMessage = `Hi ${firstName} ${lastName},\n\nCongratulations,\nYour account has been successfully activated.\nPlease log in to start seeking Jobs.\n\nThank you,\nTeam JOBS`;

            emailMessage = `<font color="#373737"><h4>Hi ${firstName} ${lastName},</h4><h5>Congratulations,<br/>your account has been successfully activated.<br/>Please log in to start seeking Jobs.<br/><br/>Thank you,<br/>Team JOBS</h5></font>`;

        } else if (status === 'declined') {
            mobMessage = `Hi ${firstName} ${lastName},\n\nSorry,\nYour account has been declined.\nOur team will contact you soon.\n\nSorry, for the inconvenience caused.\nTeam JOBS`;

            emailMessage = `<font color="#373737"><h4>Hi ${firstName} ${lastName},</h4><h5>Sorry,<br/>Your account has been declined.<br/>Our team will contact you soon.<br/><br/>Sorry, for the inconvenience caused.<br/>Team JOBS</h5></font>`;
        }

        await sendMobNotify(mobNo, mobMessage);

        await sendEmailNotify(email, "Registration Status", emailMessage);

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