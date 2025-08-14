import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    }
  });

  return await transporter.sendMail({
    from: `"Seamly" <${process.env.EMAIL}>`,
    to,
    subject,
    html,
  });
};

export default sendEmail;