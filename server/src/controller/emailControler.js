import { Resend } from "resend";

// Resend email setup
const resend = new Resend(process.env.RESEND_API_KEY);


const sendEmail = async (req, res) => {
  try {
    const { email, subject, text, phone } = req.body;

    const htmlTemplate = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Professional Email Template</title>
    <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 40px 20px;
    }

    .email-container {
      max-width: 650px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      overflow: hidden;
    }

    .email-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 40px 30px;
      text-align: center;
      position: relative;
    }

    .logo {
      width: 70px;
      height: 70px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 100%;
      margin: 0px auto;
      margin-bottom: 20px;
      backdrop-filter: blur(10px);
      position: relative;
      font-size: 32px;
      color: #ffffff;
      font-weight: bold;
      padding: 10px;
    }

    .email-header h1 {
      color: #ffffff;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
      position: relative;
    }

    .email-header p {
      color: rgba(255, 255, 255, 0.9);
      font-size: 14px;
      position: relative;
    }

    .badge {
      display: inline-block;
      background: rgba(255, 255, 255, 0.25);
      color: #ffffff;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      margin-top: 15px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .email-body {
      padding: 40px 35px;
    }

    .greeting {
      font-size: 16px;
      color: #2d3748;
      margin-bottom: 20px;
      font-weight: 500;
    }

    .message-intro {
      color: #4a5568;
      line-height: 1.7;
      margin-bottom: 25px;
      font-size: 15px;
    }

    .info-card {
      background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
      border-radius: 12px;
      padding: 25px;
      margin: 25px 0;
      border-left: 4px solid #667eea;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    }

    .info-row {
      display: flex;
      margin-bottom: 15px;
      align-items: flex-start;
    }

    .info-row:last-child {
      margin-bottom: 0;
    }

    .info-label {
      font-weight: 700;
      color: #2d3748;
      min-width: 130px;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .info-value {
      color: #4a5568;
      flex: 1;
      font-size: 14px;
      line-height: 1.6;
    }

    .message-content {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 20px;
      margin-top: 12px;
      color: #4a5568;
      line-height: 1.7;
      font-size: 14px;
    }

    .closing-text {
      margin-top: 30px;
      color: #4a5568;
      line-height: 1.7;
      font-size: 15px;
    }

    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #ffffff !important;
      padding: 14px 32px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 400;
      margin-top: 25px;
      transition: transform 0.2s, box-shadow 0.2s;
      font-size: 15px;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }

    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
    }

    .divider {
      height: 1px;
      background: linear-gradient(to right, transparent, #e2e8f0, transparent);
      margin: 30px 0;
    }

    .email-footer {
      background: #f7fafc;
      padding: 30px 35px;
      border-top: 1px solid #e2e8f0;
    }

    .footer-content {
      text-align: center;
      color: #718096;
      font-size: 13px;
      line-height: 1.6;
    }

    .footer-links {
      margin-top: 15px;
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
    }

    .footer-links a {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
    }

    .footer-links a:hover {
      color: #764ba2;
    }

    @media (max-width: 600px) {
      .email-body {
        padding: 30px 25px;
      }

      .email-header {
        padding: 30px 20px;
      }

      .email-footer {
        padding: 25px 20px;
      }

      .info-row {
        flex-direction: column;
        gap: 5px;
      }

      .info-label {
        min-width: auto;
      }
    }
  </style>
</head>

<body>

  <div class="email-container">
    <!-- Header -->
    <div class="email-header">
      <div class="logo">
        ✉
      </div>
      <h1>New Contact Message</h1>
      <p>You have received a new inquiry</p>
      <span class="badge">Priority: Normal</span>
    </div>

    <!-- Body -->
    <div class="email-body">
      <div class="greeting">Dear Admin,</div>
      
      <p class="message-intro">
        You have received a new message through the <strong>Gavel AI</strong> contact form. Please review the details below and respond at your earliest convenience.
      </p>

      <div class="info-card">
        <div class="info-row">
          <div class="info-label">
            Subject:
          </div>
          <div class="info-value">${subject}</div>
        </div>

        <div class="info-row">
          <div class="info-label">
            Email:
          </div>
          <div class="info-value">${email}</div>
        </div>
        <div class="info-row">
          <div class="info-label">
            Phone Number:
          </div>
          <div class="info-value">${phone}</div>
        </div>

        <div class="info-row">
          <div class="info-label">
            Message:
          </div>
        </div>
        
        <div class="message-content">
         ${text}
       </div>
      </div>

      <div class="closing-text">
        <strong>Next Steps:</strong><br>
        Please review the inquiry and respond to the sender within 24 hours. If this requires immediate attention, please escalate to the relevant department.
      </div>

      <a href="mailto:${email}?subject=${encodeURIComponent(subject)}" class="cta-button">Respond to Message</a>

      <div class="divider"></div>

      <p style="color: #718096; font-size: 13px; line-height: 1.6;">
        This is an automated notification from your contact form system. For support or questions, please contact your system administrator.
      </p>
    </div>

    <!-- Footer -->
    <div class="email-footer">
      <div class="footer-content">
        <p><strong>© 2025 Gavel AI. All rights reserved.</strong></p>
        <p style="margin-top: 10px;">
          Transforming legal services with intelligent automation
        </p>
      </div>
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
    const { name, email, subject, message, company } = req.body;

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
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
    }

    .wrapper {
      padding: 40px 20px;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }

    .content {
      max-width: 650px;
      width: 100%;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
    }

    /* HEADER */
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      text-align: center;
      padding: 40px 25px;
    }

    .logo {
      width: 70px;
      height: 70px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 100%;
      margin: 0px auto;
      margin-bottom: 20px;
      backdrop-filter: blur(10px);
      position: relative;
      font-size: 32px;
      color: #ffffff;
      font-weight: bold;
      padding: 18px 10px 0px 10px;
    }

    .header h1 {
      color: white;
      font-size: 26px;
      margin-bottom: 6px;
      font-weight: 700;
    }

    .header p {
      color: rgba(255, 255, 255, 0.9);
      font-size: 14px;
    }

    .badge {
      background: rgba(255, 255, 255, 0.25);
      color: white;
      padding: 6px 16px;
      font-size: 12px;
      border-radius: 20px;
      display: inline-block;
      margin-top: 12px;
      backdrop-filter: blur(10px);
    }

    /* BODY */
    .body-section {
      padding: 35px 35px;
      color: #2d3748;
      font-size: 15px;
      line-height: 1.7;
    }

    .body-section p {
      margin-bottom: 15px;
    }

    .info-box {
      background: linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%);
      border-radius: 12px;
      padding: 20px 25px;
      margin-top: 20px;
      border-left: 4px solid #667eea;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    }

    .info-box p {
      margin: 8px 0;
      font-size: 14px;
      color: #4a5568;
    }

    .info-box strong {
      color: #2d3748;
    }
    .message-content {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 20px;
      margin-top: 12px;
      color: #4a5568;
      line-height: 1.7;
      font-size: 14px;
    }
    /* FOOTER */
    .footer {
      text-align: center;
      background: #f7fafc;
      padding: 28px 20px;
      font-size: 12px;
      color: #718096;
      border-top: 1px solid #e2e8f0;
    }

    @media (max-width: 600px) {
      .body-section {
        padding: 25px 20px;
      }
    }
  </style>
</head>

<body>

  <div class="wrapper">
    <div class="content">

      <!-- HEADER -->
      <div class="header">
        <div class="logo">✉</div>
        <h1>New Message Received</h1>
        <p>You have a new inquiry from Gavel</p>
        <span class="badge">Priority: Normal</span>
      </div>

      <!-- BODY -->
      <div class="body-section">
        <p>Dear Admin,</p>
        <p>You have received a new message from the <strong>Gavel</strong> admin contact form. Please review the details below:</p>

        <div class="info-box">
          <p style="text-transform: capitalize;"><strong>Subject:</strong> ${subject}</p>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Sender Name:</strong> ${name}</p>
          <p><strong>Sender Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div class="message-content">
         ${message}
       </div>
        </div>

        <p style="margin-top: 20px;">
          Please respond at your earliest convenience.<br>
          Thank you.
        </p>
      </div>

      <!-- FOOTER -->
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


export { sendEmail, sendEmailToAdmin };