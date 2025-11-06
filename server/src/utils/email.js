import { Resend } from "resend";

// Resend email setup
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (type, email, otp, token, password) => {
  try {
    let subject, html;

    /* =========================
       📨 Email Verification
    ========================== */
    if (type === "emailVerification") {
      subject = "Email Verification – Gavel";
      html = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6f8; padding: 25px; border-radius: 10px; max-width: 520px; margin: auto; color: #333;">
          <div style="background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <h2 style="text-align:center; color:#1a73e8; margin-bottom:20px;">Verify Your Email – Gavel</h2>
            <p>Welcome to <strong>Gavel</strong>! Please verify your email using the code below:</p>
            <div style="text-align:center; margin: 25px 0;">
              <h1 style="background-color:#e8f0fe; color:#1a73e8; padding:12px 28px; border-radius:8px; letter-spacing:2px; font-size:34px; font-weight:bold;">
                ${otp}
              </h1>
            </div>
            <a href="http://localhost:5173/email-verification/${token}" style="background-color:#1a73e8; color:#fff; padding:12px 28px; border-radius:6px; text-decoration:none; font-weight:bold; display:inline-block;">Verify My Email</a>
          </div>
        </div>
      `;
    }

    /* =========================
       🔐 Password Reset
    ========================== */
    else if (type === "passwordReset") {
      const resetLink = `http://localhost:5173/reset-password/${token}`;
      subject = "Reset Your Password – Gavel";
      html = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6f8; padding: 25px; border-radius: 10px; max-width: 520px; margin: auto; color: #333;">
          <div style="background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <h2 style="text-align:center; color:#1a73e8; margin-bottom:20px;">Reset Your Password – Gavel</h2>
            <p>We received a request to reset your password. Click below to reset it:</p>
            <div style="text-align:center; margin:25px 0;">
              <a href="${resetLink}" style="background-color:#1a73e8; color:#fff; padding:12px 28px; border-radius:6px; text-decoration:none; font-weight:bold;">Reset My Password</a>
            </div>
            <p>If the button doesn’t work, copy and paste this link:</p>
            <p style="word-break:break-all; background-color:#f8f9fa; padding:10px; border-radius:6px; color:#1a73e8;">${resetLink}</p>
          </div>
        </div>
      `;
    }

    /* =========================
       🧑‍💼 New Client Account Created by Admin
    ========================== */
    else if (type === "accountCreated") {
      subject = "Your Gavel Account Has Been Created!";
      html = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6f8; padding: 25px; border-radius: 10px; max-width: 520px; margin: auto; color: #333;">
          <div style="background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <h2 style="text-align:center; color:#1a73e8; margin-bottom:20px;">Welcome to Gavel!</h2>
            <p>Hello there 👋,</p>
            <p>Your client account has been successfully created by the Gavel admin team.</p>

            <div style="background-color:#f9fafb; border-radius:8px; padding:18px; margin:20px 0;">
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Password:</strong> ${password || "********"}</p>
            </div>

            <p>Your account has been successfully created. \nYou can log in using the link below. \nFor security reasons, please keep your password confidential and do not share it with anyone.</p>
            <div style="text-align:center; margin-top:25px;">
              <a href="http://localhost:5173/login" style="background-color:#1a73e8; color:#fff; padding:12px 28px; border-radius:6px; text-decoration:none; font-weight:bold;">Go to Login</a>
            </div>

            <p style="margin-top:25px;">Welcome aboard,<br><strong>Team Gavel</strong></p>
          </div>
        </div>
      `;
    }

    // 🔹 Send Email
    const data = await resend.emails.send({
      from: `Gavel <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject,
      html,
    });

    console.log("✅ Email sent successfully:", type, data.id || data);
    return { success: true, data };

  } catch (error) {
    console.error("❌ Email send error:", error);
    return { success: false, error: error.message };
  }
};

export { sendEmail };
