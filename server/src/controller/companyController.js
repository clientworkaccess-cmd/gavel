import Company from "../models/company.js";
import { User } from "../models/user.js";
import dbConnection from "../utils/db.js";

// ✅ Add Company
export const addCompany = async (req, res) => {
  try {
    await dbConnection();
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Company name is required." });
    }

    const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const existing = await Company.findOne({
      name: { $regex: new RegExp(`^${escapeRegex(name)}$`, "i") },
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "This company has already been created.",
      });
    }

    const company = await Company.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Company created successfully.",
      company,
    });
  } catch (error) {
    console.error("Error creating company:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error: " + error.message });
  }
};


// ✅ Get All Companies (with owner, positions, and interviews)
export const getCompanies = async (req, res) => {
  try {
    await dbConnection();
    const companies = await Company.find()
      .populate("positions")
      .populate("interviews")
      .populate("members")
      .sort({ createdAt: -1 })
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Single Company by ID
export const getCompanyById = async (req, res) => {
  try {
    await dbConnection();
    const company = await Company.findById(req.params.id)
      .populate("positions")
      .populate("interviews")
      .populate("members")
    if (!company)
      return res.status(404).json({ message: "Company not found" });

    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Company
export const updateCompany = async (req, res) => {
  try {
    await dbConnection();
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!company)
      return res.status(404).json({ message: "Company not found" });

    res.status(200).json(company);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Get Companies (Names Only)
export const getCompaniesName = async (req, res) => {
  try {
    await dbConnection();
    const companies = await Company.find().select("name _id").sort({ createdAt: -1 });
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete Company (and remove reference from owner)
export const deleteCompany = async (req, res) => {
  try {
    await dbConnection();
    const company = await Company.findByIdAndDelete(req.params.id);

    if (!company)
      return res.status(404).json({ message: "Company not found" });

    // remove company from owner's company array
    if (company.owner) {
      await User.findByIdAndUpdate(company.owner, {
        $pull: { company: company._id },
      });
    }

    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
