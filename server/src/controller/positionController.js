import Company from "../models/company.js";
import Position from "../models/position.js";
import { User } from "../models/user.js";
import dbConnection from "../utils/db.js";


// ✅ Add Position
export const addPosition = async (req, res) => {
    try {
        await dbConnection();
        const { company, name, positionDescription, category, redFlag } = req.body;

        if (!company || !name) {
            return res
                .status(400)
                .json({ success: false, message: "Company and name are required." });
        }

        const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        const existing = await Position.findOne({
            company,
            category,
            name: { $regex: new RegExp(`^${escapeRegex(name)}$`, "i") },
        });

        if (existing) {
            return res.status(409).json({
                success: false,
                message:
                    "This position has already been created for this company.",
            });
        }

        // ✅ Create new position
        const position = await Position.create({
            name,
            positionDescription,
            redFlag,
            category,
            company,
        });

        // ✅ Link position to the company
        await Company.findByIdAndUpdate(company, {
            $push: { positions: position._id },
        });

        return res.status(201).json({
            success: true,
            message: "Position created successfully.",
            position,
        });
    } catch (error) {
        console.error("Error creating position:", error);
        return res
            .status(500)
            .json({ success: false, message: "Server error: " + error.message });
    }
};

// ✅ Get All Positions
export const getPositions = async (req, res) => {
    try {
        await dbConnection();
        const positions = await Position.find()
        .populate("company")
        .populate("interview")
        .populate("user")
        .sort({ createdAt: -1 });
        res.status(200).json(positions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Get Position by ID
export const getPositionById = async (req, res) => {
    try {
        await dbConnection();
        const position = await Position.findById(req.params.id)
        .populate("company")
        .populate("interview")
        .populate("user")
        .sort({createdAt: -1});
        if (!position) return res.status(404).json({ message: "Position not found" });
        res.status(200).json(position);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Update Position
export const updatePosition = async (req, res) => {
    try {
        await dbConnection();
        const position = await Position.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!position) return res.status(404).json({ message: "Position not found" });
        res.status(200).json(position);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ✅ Delete Position
export const deletePosition = async (req, res) => {
    try {
        await dbConnection();
        const position = await Position.findByIdAndDelete(req.params.id);
        if (!position) return res.status(404).json({ message: "Position not found" });

        // Remove from company's positions array
        await Company.findByIdAndUpdate(position.company, { $pull: { positions: position._id } });

        res.status(200).json({ message: "Position deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
