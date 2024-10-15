import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: 'kopki684@gmail.com',
      pass: process.env.EMAIL_PASSWORD,
    }
  });

  return await transporter.sendMail({
    from: '"Seamly" <kopki684@gmail.com>',
    to,
    subject,
    html,
  });
};

export default sendEmail;