const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

async function sendMail(to, subject, html, cc = []) {
  try {
    const info = await transporter.sendMail({
      from: '"Wildfire" <no-reply@wildfire.com>',
      cc,
      to,
      subject,
      html,
    });
    console.log("E-mail enviado: %s", info.messageId);
  } catch (error) {
    console.error("Erro detalhado no Mailtrap:", error);
  }
}

module.exports = { sendMail };