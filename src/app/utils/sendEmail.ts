/* eslint-disable no-console */
import nodemailer from 'nodemailer';

export const sendResetPasswordEmail = async (to: string, resetLink: string) => {
  // When SMTP is not configured we fall back to logging the link, so the flow
  // still works locally (and via the Vercel function logs) without mail creds.
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log(`[reset-password] no SMTP configured. Link for ${to}: ${resetLink}`);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject: 'Reset your portfolio dashboard password',
    html: `
      <div style="font-family: sans-serif; line-height: 1.6">
        <h2>Reset your password</h2>
        <p>Click the button below to choose a new password. This link expires in 15 minutes and can only be used once.</p>
        <p>
          <a href="${resetLink}"
             style="background:#f97316;color:#fff;padding:10px 18px;border-radius:4px;text-decoration:none;font-weight:bold">
            Reset Password
          </a>
        </p>
        <p>If you did not request this, you can safely ignore this email.</p>
      </div>
    `,
  });
};
