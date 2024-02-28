const nodemailer = require('nodemailer');

module.exports = async function emailverify(req, res){
    const {email} = req.body;
    

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "code2024crafters@gmail.com",
      pass: "grcu tzpi urvp atgn",
    },
});


    const mailOptions = {
        from: 'code2024crafters@gmail.com',
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP code is: `
    }


    let result = await transporter.sendMail(mailOptions);

    console.log(result);

    if(result.accepted == null){
        return res.json("Error occured");
    }else{
        return res.json("Email has been sent successfully");
    }
}
