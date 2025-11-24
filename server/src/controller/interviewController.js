import Interview from "../models/interview.js";
import Position from "../models/position.js";
import { User } from "../models/user.js";
import dbConnection from "../utils/db.js";

export const createInterview = async (req, res) => {
  try {
    const {
      candidate,
      candidateId,
      jobDescription,
      summary,
      transcript,
      jobName,
      category,
      scores,
      recommendation,
      expectedSalary,
      goodkeyInsights,
      badkeyInsights,
      redFlags
    } = req.body;

    if (!candidate || !candidateId || !jobName || !category || !scores) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: candidate, candidateId, jobName, category, scores"
      });
    }

    const newInterview = await Interview.create({
      candidate,
      candidateId,
      jobDescription,
      summary,
      transcript,
      jobName,
      category,
      scores,
      recommendation,
      expectedSalary,
      goodkeyInsights,
      badkeyInsights,
      redFlags
    });

    await User.findByIdAndUpdate(candidateId, {
      $push: { interviews: newInterview._id },
    });
    const position = await Position.findOne({name: jobName})
    
    await Position.findByIdAndUpdate(position._id, {
      $push: { interview: newInterview._id },
    });

    return res.status(201).json({
      success: true,
      message: "Interview created successfully",
      interview: newInterview
    });

  } catch (error) {
    console.error("Interview Create Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};


// ✅ Get all interviews (for admin)
export const getAllInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find()
      .populate("candidateId")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, interviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get interviews by candidate
export const getCandidateInterviews = async (req, res) => {
  try {

    const { candidateId } = req.params;
    const interviews = await Interview.find({ candidateId })
      .populate("candidateId")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, interviews });
  } catch (error) {
    res.status(500).json({ success: false, message:error.message});
  }
};

// ✅ Check if candidate already applied for a role/category
export const checkCandidateApplied = async (req, res) => {
  try {
    const { candidateId, jobName } = req.query;

    // Validate input
    if (!candidateId || (!jobName && !category)) {
      return res.status(400).json({
        success: false,
        message: "Candidate ID and Position are required.",
      });
    }

    // Build query dynamically
    const query = { candidateId };
    if (jobName) query.jobName = jobName;

    // Check for existing interview/application
    const existing = await Interview.findOne(query);

    if (existing) {
      return res.status(200).json({
        success: true,
        alreadyApplied: true,
        message: "Already applied for this Position.",
        interview: existing,
      });
    }

    // No existing application found
    res.status(200).json({
      success: true,
      alreadyApplied: false,
    });
  } catch (error) {
    console.error("Error in checkCandidateApplied:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};


// ✅ Update review status (Admin Review)
export const updateReviewStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { reviewStatus } = req.body;

    const updated = await Interview.findByIdAndUpdate(
      id,
      { reviewStatus },
      { new: true }
    );

    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "Interview not found" });

    res.status(200).json({ success: true, interview: updated, message: "Review status updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteInterview = async (req, res) => {
  try {
    await dbConnection();
    const interview = await Interview.findByIdAndDelete(req.params.id);
    if (!interview) return res.status(404).json({ message: "interview not found" });

    // Remove from company's interviews array
    await Position.findByIdAndUpdate(interview.position, { $pull: { interview: interview._id } });
    await User.findByIdAndUpdate(interview.candidateId, { $pull: { interview: interview._id } });

    res.status(200).json({ message: "interview deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
