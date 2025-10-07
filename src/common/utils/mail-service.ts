import * as nodemailer from 'nodemailer';

export const sendEmail = async ({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST || 'smtp.hostinger.com', // Hostinger SMTP server
    port: Number(process.env.MAIL_PORT) || 587,          // 465 (SSL) or 587 (TLS)
    secure: false,                                        // true for 465, false for 587
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME || 'Support'}" <${process.env.MAIL_USERNAME}>`,
      to,
      subject,
      text,
      html,
    });
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw error;
  }
};
