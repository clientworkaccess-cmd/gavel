
 const CaptchaController = async (req, res) => {
    const { token } = req.body;
    const secretKey = process.env.CAPTCHA_SECRET_KEY;

    const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        }
    );

    if (response.data.success) {
        res.json({ success: true });
    } else {
        res.status(400).json({ success: false, message: "Captcha failed" });
    }
};


export default CaptchaController