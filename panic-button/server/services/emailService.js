const nodemailer = require('nodemailer');
require('dotenv').config();

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


//send verification code to the user's email
exports.sendVerificationCode = (email, code) => {
    const mailOptions = {
        from: '"SOS-app"<process.env.EMAIL_USER>',
        to: email,
        subject: 'Password Reset Verification Code',
        text: `Your verification code is: ${code}`,
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.error('Error sending email:', error);
        }
    });
};
