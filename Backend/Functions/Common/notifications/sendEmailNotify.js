const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

module.exports = async function sendMobNotify(email, subject, message) {
    //Configure nodemailer transporter
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSCODE,
        }
    });

    let parameters = {
        from: "Team JOBS",
        to: email,
        subject: subject,
        html: message
    }

    transporter.sendMail(parameters, async (err) => {
        if(err){
            throw new Error(err);
        }
        return;
    })
}