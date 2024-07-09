// const nodeMailer = require("nodemailer");


// module.exports = {
//   sendPaymentMail:(values,callback) => {
//     let transporter = nodeMailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "ssshashini21@gmail.com",
//         pass: "nxtbmpobvwhkzwdj",
//       },
//     });

//     let adminMailOptions = {
//       from: "ssshashini21@gmial.com",
//       to: values.Email,
//       subject: Congratulations ${values.FirstName}! You have been chosen up.,
//       text: `Your ID: ${values.admin_Id}
//             Name: ${values.FirstName}
//             Your Password: ${values.originalPassword}
//             Use your email as your user name!`,
//     };

//     transporter.sendMail(adminMailOptions,(error, info) => {
//       if (error) {
//         return callback(error);
//       } else {
//         return callback(null,info);
//       }
//     });
//   }
// };

// const nodeMailer = require("nodemailer");


// module.exports = {
//   sendPaymentMail:(values,callback) => {
//     let transporter = nodeMailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "ssshashini21@gmail.com",
//         pass: "nxtbmpobvwhkzwdj",
//       },
//     });

//     let adminMailOptions = {
//       from: "ssshashini21@gmial.com",
//       to: values.EmailAddress,
//       subject:` ${values.FirstName}, payment success!`,
//       text: `You are payment amount is ${values.amount}.`,
//     };

//     transporter.sendMail(adminMailOptions,(error, info) => {
//       if (error) {
//         return callback(error);
//       } else {
//         return callback(null,info);
//       }
//     });
//   }
// };

const nodeMailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  sendPaymentMail: (values, callback) => {
    let transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    transporter.verify((error, success) => {
      if (error) {
        console.log("Error in transporter verification:", error);
        return callback(error);
      } else {
        console.log("Transporter is verified successfully.");
      }
    });

    let adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: values.EmailAddress,
      subject: `${values.FirstName}, payment success!`,
      text: `Your payment amount is ${values.amount}.`,
    };

    transporter.sendMail(adminMailOptions, (error, info) => {
      if (error) {
        console.log("Error in sending email:", error);
        return callback(error);
      } else {
        console.log("Email sent successfully:", info.response);
        return callback(null, info);
      }
    });
  }
};
