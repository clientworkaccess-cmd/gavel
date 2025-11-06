import { User } from "../models/user.js";
import dbConnection from "../utils/db.js";

const getAllUsers = async (req, res) => {
    try {
        await dbConnection();
        const users = await User.find().populate("company").sort({createdAt: -1});
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const getUserById = async (req, res) => {
    try {
        await dbConnection();

        const { id } = req.params;

        const user = await User.findById(id).populate("company");
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
        const updatedData = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
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
        }).populate("company").sort({createdAt: -1});
        res.status(200).json({ success: true, clients });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const getCandidates = async (req, res) => {
    try {
        await dbConnection();
        const candidates = await User.find().where("role").equals("candidate").sort({createdAt: -1});
        res.status(200).json({ success: true, candidates });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const getAdmins = async (req, res) => {
    try {
        await dbConnection();
        const admins = await User.find().where("role").equals("admin").sort({createdAt: -1});
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


export { getClients, getCandidates, getAdmins, getAllUsers, deleteUserByAdmin, updateUser , getUserById};