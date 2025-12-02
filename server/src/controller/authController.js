import { User } from "../models/user.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { sendEmail } from "../utils/email.js";
import { generateTokens } from "../middleware/verificationMiddleware.js";
import jwt from "jsonwebtoken"
import dbConnection from "../utils/db.js";
import Company from "../models/company.js";


// 🔹 Signup Controller
export const signupController = async (req, res) => {
    try {
        await dbConnection();
        let token;
        const { name, email, password, role, phoneNumber, company } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, Email, and Password are required." });
        }
        const existing = await User.findOne({ email });
        if (existing) return res.status(409).json({ message: "Email already exists." });

        const hashedPassword = await bcrypt.hash(password, 10);

        if (role === "admin") {
            await User.create({
                name,
                email,
                password: hashedPassword,
                role,
                phoneNumber,
                emailVerified: true, // Auto-verified
            });
            await sendEmail("accountCreated", email, "", "", password);
        } else if (role === "candidate") {
            // Candidate signup
            const otp = Date.now().toString().slice(-6);
            const otpExpiresAt = Date.now() + 60 * 60 * 1000;
            token = crypto.randomBytes(20).toString("hex");
            const tokenExpiresAt = Date.now() + 60 * 60 * 1000;

            const user = await User.create({
                name,
                email,
                password: hashedPassword,
                role,
                phoneNumber,
                emailOtp: otp,
                emailotpExpiresAt: otpExpiresAt,
                verificationToken: token,
                verificationTokenExpiresAt: tokenExpiresAt,
            });

            await sendEmail("emailVerification", email, otp, token);
        } else {
            const user = await User.create({
                name,
                email,
                password: hashedPassword,
                role: role,
                company: company,
                phoneNumber,
                emailVerified: true, // Auto-verified
            });
            await sendEmail("accountCreated", email, "", "", password);
            await Company.findByIdAndUpdate(company, {
                $push: { members: user._id },
            });
        }

        res.status(201).json({ message: "User created successfully.", redirectUrl: `/email-verification/${token}` });
    } catch (err) {
        console.error("❌ User creation error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// 🔹 Resend OTP
export const resendOtpController = async (req, res) => {
    try {
        await dbConnection();
        const { token } = req.params;
        const user = await User.findOne({ verificationToken: token });
        if (!user) return res.status(404).json({ message: "Email already verified" });

        const otp = Date.now().toString().slice(-6);
        const otpExpiresAt = Date.now() + 60 * 60 * 1000;

        user.emailOtp = otp;
        user.otpExpiresAt = otpExpiresAt;
        user.redirectUrl = `http://localhost:5173/verify-email/${user.verificationToken}`;
        await user.save();

        await sendEmail("emailVerification", email, otp, user.verificationToken);

        res.status(200).json({ message: "OTP resent successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 🔹 Verify Email
export const emailVerificationController = async (req, res) => {
    try {
        await dbConnection();
        const { token } = req.params;
        const { otp } = req.body;

        const user = await User.findOne({ verificationToken: token });
        if (!user) return res.status(404).json({ message: "Invalid or expired token" });

        // check expiration
        if (Date.now() > user.otpExpiresAt || Date.now() > user.verificationTokenExpiresAt) {
            return res.status(400).json({ message: "OTP or token has expired" });
        }

        // check OTP match
        if (user.emailOtp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // mark verified
        user.emailVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        user.emailOtp = undefined;
        user.otpExpiresAt = undefined;
        await user.save();

        res.status(200).json({ message: "Email verified successfully", redirectUrl: "/login" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const loginController = async (req, res) => {
    try {
        await dbConnection();
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ success: false, message: "Email and password required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

        if (!user.emailVerified)
            return res.status(403).json({ success: false, message: "Email not verified" });

        const { accessToken, refreshToken } = generateTokens(user);

        // 🍪 Set cookies
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: 15 * 60 * 1000, // 15 min
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

export const forgotPasswordController = async (req, res) => {
    try {
        await dbConnection();
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });

        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 60 * 60 * 1000; // 1 hour

        user.passwordResetToken = resetToken;
        user.passwordResetTokenExpiresAt = resetTokenExpiresAt;
        await user.save();;

        await sendEmail("passwordReset", email, "", resetToken);

        res.status(200).json({
            message: "Password reset link sent to your email",
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const resetPasswordController = async (req, res) => {
    try {
        await dbConnection();
        const { token } = req.params; // from URL
        const { newPassword } = req.body;

        const user = await User.findOne({
            passwordResetToken: token,
            passwordResetTokenExpiresAt: { $gt: Date.now() }, // not expired
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token." });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password & clear reset fields
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        res.status(200).json({ message: "Password reset successfully.", redirectUrl: "/login" });
    } catch (err) {
        console.error("❌ Reset password error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};


export const deleteAccountController = async (req, res) => {
    try {
        await dbConnection();
        const { userId } = req.params;

        const user = await User.findByIdAndDelete(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "Account deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const dashboardController = async (req, res) => {
    try {
        await dbConnection();
        const { email } = req.user;

        // Find user by decoded email
        const user = await User.findOne({ email }).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Dashboard access granted",
            user,
        });
    } catch (err) {
        console.error("Dashboard error:", err);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message,
        });
    }
};


export const logoutController = (req, res) => {

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/"
    });

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/"
    });

    res.json({ success: true, message: "Logged out successfully" });
};

export const refreshTokenController = (req, res) => {
    const oldRefreshToken = req.cookies?.refreshToken;

    if (!oldRefreshToken)
        return res.status(401).json({ success: false, message: "No refresh token provided" });

    try {
        const decoded = jwt.verify(oldRefreshToken, process.env.JWT_REFRESH_SECRET);

        const newRefreshToken = jwt.sign(
            {
                id: decoded.id,
                role: decoded.role,
                email: decoded.email,
                name: decoded.name,
            },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        );

        const newAccessToken = jwt.sign(
            {
                id: decoded.id,
                role: decoded.role,
                email: decoded.email,
                name: decoded.name,
            },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: 15 * 60 * 1000,
        });

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({ success: true, message: "Tokens refreshed" });

    } catch (err) {
        console.error("Refresh token error:", err);
        return res.status(403).json({ success: false, message: "Invalid refresh token" });
    }
};

