const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

async function sendMail(to, subject, html) {
  await transporter.sendMail({
    from: '"Wildfire" <no-reply@wildfire.com>',
    to,
    subject,
    html,
  });
}

module.exports = { sendMail };