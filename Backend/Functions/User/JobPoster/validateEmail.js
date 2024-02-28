const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // replace with your email
    pass: 'your-email-password'   // replace with your email password
  }
});

// Function to send OTP to the user's email
async function sendVerificationEmail(userEmail, otp) {
  const mailOptions = {
    from: 'your-email@gmail.com',  // replace with your email
    to: userEmail,
    subject: 'Email Verification',
    text: `Your OTP for email verification is: ${otp}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent for verification');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

// Function to generate and send OTP for email verification
module.exports = async function sendEmailVerification(req, res) {
  const { userEmail } = req.body;

  if (!userEmail) {
    res.status(400).send('Email address is required');
    return;
  }

  // Generate a 6-digit OTP
  const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });

  // Save the OTP in your database or in-memory store associated with the user

  // For simplicity, printing the OTP in the console. In production, store securely.
  console.log('Generated OTP:', otp);

  try {
    await sendVerificationEmail(userEmail, otp);
    res.status(200).send('Email sent for verification');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};
