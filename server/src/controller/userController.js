import bcrypt from "bcryptjs";
import { User } from "../models/user.js";
import dbConnection from "../utils/db.js";
import Company from "../models/company.js";

const getAllUsers = async (req, res) => {
    try {
        await dbConnection();
        const users = await User.find().populate("company").sort({ createdAt: -1 });
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const getUserById = async (req, res) => {
    try {
        await dbConnection();

        const { id } = req.params;

        const user = await User.findById(id).populate("company").populate("interviews");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: user,
        });
    } catch (error) {
        console.error("Error fatching user:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        await dbConnection();

        const { id } = req.params;
        const {
            name,
            email,
            newPassword,
            confirmPassword,
            phoneNumber,
            address,
            linkedinProfile,
            communication,
            culturalFit,
            skills,
            qualification,
            overAllFitScore,
            company,
        } = req.body;

        // 1️⃣ Find existing user
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // 2️⃣ Handle password update (optional)
        if (newPassword || confirmPassword) {
            if (newPassword !== confirmPassword) {
                return res
                    .status(400)
                    .json({ success: false, message: "Passwords do not match" });
            }

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }

        // 3️⃣ Update other fields
        if (name) user.name = name;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (address) user.address = address;
        if (linkedinProfile) user.linkedinProfile = linkedinProfile;
        if (communication) user.communication = communication;
        if (culturalFit) user.culturalFit = culturalFit;
        if (skills) user.skills = skills
        if (qualification) user.qualification = qualification
        if (overAllFitScore) user.overAllFitScore = overAllFitScore
        if (company) user.company = company


        // 4️⃣ Save updated user
        const updatedUser = await user.save();

        await Company.findByIdAndUpdate(company, {
            $push: { members: user._id },
        });

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};


const getClients = async (req, res) => {
    try {
        await dbConnection();
        const clients = await User.find({
            role: { $nin: ["admin", "candidate"] }
        }).populate("company").sort({ createdAt: -1 });
        res.status(200).json({ success: true, clients });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const getCandidates = async (req, res) => {
    try {
        await dbConnection();
        const candidates = await User.find().where("role").equals("candidate").sort({ createdAt: -1 });
        res.status(200).json({ success: true, candidates });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const getAdmins = async (req, res) => {
    try {
        await dbConnection();
        const admins = await User.find().where("role").equals("admin").sort({ createdAt: -1 });
        res.status(200).json({ success: true, admins });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const deleteUserByAdmin = async (req, res) => {
    try {
        await dbConnection();
        const userId = req.params.id;
        await User.findByIdAndDelete(userId);
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


export { getClients, getCandidates, getAdmins, getAllUsers, deleteUserByAdmin, updateUser, getUserById };