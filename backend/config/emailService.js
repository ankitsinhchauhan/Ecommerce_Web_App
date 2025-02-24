import http from "http";
import nodemailer from "nodemailer";

//configure the SMTP transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // 'smtp.gmail.com' for email
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL, // SMTP Email
    pass: process.env.EMAIL_PASS, //  SMTP password
  },
});

// Function to send email
async function sendEmail(to, subject, text, html) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to,
      subject,
      text,
      html,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
}

export { sendEmail };
