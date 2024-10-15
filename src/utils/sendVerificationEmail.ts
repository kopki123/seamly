import sendEmail from './sendEmail';

const sendVerificationEmail = async ({ email, verificationToken, origin }) => {
  const verifyEmail = `${origin}/auth/verify-email?token=${verificationToken}&email=${email}`;

  return sendEmail({
    to: email,
    subject: '電子郵件驗證',
    html: `
      <h4>您好</h4>
      <p>
        請點擊以下連結確認您的電子郵件：
        <a href="${verifyEmail}">${verifyEmail}</a>
      </p>
    `,
  });
};

export default sendVerificationEmail;