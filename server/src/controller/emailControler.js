import { Resend } from "resend";

// Resend email setup
const resend = new Resend(process.env.RESEND_API_KEY);


const sendEmail = async (req, res) => {
  try {
    const { email, subject, text } = req.body;

    const htmlTemplate = `<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${subject}</title>

  <style>
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    img { border: 0; outline: none; text-decoration: none; }

    body {
      margin: 0;
      padding: 0;
      width: 100% !important;
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial;
      background-color: #f5f6f8;
      color: #374151;
    }

    /* Container */
    .email-container {
      width: 100%;
      max-width: 640px;
      margin: 24px auto;
      background: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
    }

    /* Header */
    .header {
      padding: 20px 22px;
      background: linear-gradient(90deg, #0ea5e9, #7c3aed);
      color: #fff;
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .logo {
      width: 44px;
      height: 44px;
      border-radius: 6px;
      background: #ffffff;
      padding: 6px;
      object-fit: contain;
      background-color: rgba(52, 49, 248, 0.884);
    }

    /* Body */
    .content {
      padding: 24px;
      font-size: 15px;
      line-height: 1.55;
      color: #111827;
    }

    .message-box {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      padding: 12px 14px;
      border-radius: 6px;
      margin: 20px 0;
      white-space: pre-wrap;
      text-align: left;
      font-size: 14px;
    }

    /* CTA */
    .btn-primary {
      display: inline-block;
      background: #111827;
      color: #ffffff !important;
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: 600;
      text-decoration: none;
      margin-top: 8px;
    }

    .center {
      text-align: center;
      margin-top: 10px;
    }

    /* Footer */
    .footer {
      padding: 18px 22px;
      font-size: 13px;
      text-align: center;
      background: #fafafa;
      color: #6b7280;
    }
  </style>
</head>

<body>
  <div class="email-container">

    <!-- Header -->
    <div class="header">
      <img src="https://gavel-frontend.vercel.app/site.png" alt="Gavel Logo" class="logo" />
      <div>
        <div style="font-size: 17px; font-weight: 700;">Gavel</div>
        <div style="font-size: 13px; opacity: .95;">${subject}</div>
      </div>
    </div>

    <!-- Body -->
    <div class="content">
      <div style="font-size: 18px; font-weight: 600; margin-bottom: 10px;">Hello,</div>

      <div style="font-size:14px; color:#4b5563;">
        You have received a new message from the Gavel contact form.
      </div>

      <div style="margin-top: 14px;">
        <strong>From:</strong> <a href="mailto:${email}" style="color:#2563eb; text-decoration:none;">${email}</a>

        <div style="font-size:12px; color:#9ca3af; margin-top:4px;">
          If this seems suspicious, contact support: wasikhatri4@gmail.com
        </div>
      </div>

      <!-- Message Box -->
      <div class="message-box">
        ${text}
      </div>

      <!-- CTA -->
      <div class="center">
        <a href="mailto:${email}" class="btn-primary">Reply to sender</a>

        <div style="margin-top: 20px; color:#6b7280; font-size: 13px;">
          —<br />Gavel Team
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      © ${new Date().getFullYear()} Gavel. All rights reserved.<br />
      <span style="font-size:12px; color:#9ca3af;">
        Contact: <a href="mailto:wasikhatri4@gmail.com" style="color:#9ca3af;">wasikhatri4@gmail.com</a>
      </span>
    </div>

  </div>
</body>

</html>
`

    await resend.emails.send({
      from: `Gavel <${process.env.SENDER_EMAIL}>`,
      to: "wasikhatri4@gmail.com",
      subject: subject,
      html: htmlTemplate,
    });
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("❌ Email send error:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
};
const sendEmailToAdmin = async (req, res) => {
  try {
    const { name, email, subject, message , company} = req.body;

    const htmlTemplate = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #f6f8fa;
      font-family: Arial, Helvetica, sans-serif;
    }

    .wrapper {
      width: 100%;
      background: #f6f8fa;
      padding: 40px 0;
    }

    .content {
      max-width: 600px;
      margin: auto;
      background: #ffffff;
      border-radius: 10px;
      padding: 30px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .header {
      text-align: center;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 15px;
    }

    .header h1 {
      margin: 0;
      color: #1f2937;
      font-size: 22px;
    }

    .body-section {
      padding: 20px 0;
      color: #374151;
      line-height: 1.6;
      font-size: 15px;
    }

    .footer {
      text-align: center;
      margin-top: 30px;
      color: #6b7280;
      font-size: 12px;
    }

    .tagline {
      display: inline-block;
      padding: 6px 12px;
      background: #2563eb;
      color: #ffffff;
      border-radius: 6px;
      font-size: 13px;
      margin-bottom: 10px;
    }

    .info-box {
      background: #f3f4f6;
      padding: 15px 20px;
      border-radius: 6px;
      margin-top: 20px;
      border-left: 4px solid #2563eb;
    }
  </style>
</head>

<body>

  <div class="wrapper">
    <div class="content">
      <div class="header">
        <span class="tagline">New Message From Gavel AI</span>
        <h1>You've Received a New Query</h1>
      </div>

      <div class="body-section">
        <p>Dear Admin,</p>
        <p>You have received a new message from the <strong>Gavel</strong> contact admin form. Details are below:</p>

        <div class="info-box">
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Sender Name:</strong> ${name}</p>
          <p><strong>Sender Email:</strong> ${email}</p>
          <p><strong>Message:</strong><br> ${message}</p>
        </div>

        <p style="margin-top:20px;">
          Please respond accordingly.<br>
          Thank you.
        </p>
      </div>

      <div class="footer">
        © ${new Date().getUTCFullYear()} Gavel AI. All rights reserved.
      </div>

    </div>
  </div>

</body>

</html>
`

    await resend.emails.send({
      from: `Gavel <${process.env.SENDER_EMAIL}>`,
      to: "wasikhatri4@gmail.com",
      subject: "Gavel-AI: Client Request",
      html: htmlTemplate,
    });
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("❌ Email send error:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
};


export { sendEmail , sendEmailToAdmin};