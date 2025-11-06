import { Resend } from "resend";

// Resend email setup
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (req, res) => {
    try {
        const { email, subject, text } = req.body;

        await resend.emails.send({
            from: `Gavel <${process.env.SENDER_EMAIL}>`,
            to: "wasikhatri4@gmail.com",
            subject: subject,
            text: `From: ${email} \n${text}`,
        });
        res.status(200).json({ success: true, message: "Email sent successfully" });
    } catch (error) {
        console.error("❌ Email send error:", error);
        res.status(500).json({ success: false, message: "Failed to send email" });
    }
};

export { sendEmail };