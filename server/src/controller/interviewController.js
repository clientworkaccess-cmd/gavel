import Interview from "../models/interview.js";
import Position from "../models/position.js";
import dbConnection from "../utils/db.js";

// ✅ Create new interview (after AI completes or starts)
export const createInterview = async (req, res) => {
  try {
    const {
      position,
      name,
      candidateId,
      email,
      interviewID,
      positionDescription,
      positionId,
      summary,
      transcript,
      status,
    } = req.body;

    if (!position || !candidateId || !email || !interviewID || !positionId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const newInterview = new Interview({
      position,
      candidateId,
      name,
      email,
      interviewID,
      positionDescription,
      positionId,
      summary,
      transcript,
      status: status || "completed",
    });

    await newInterview.save();

    // Auto link to position
    await Position.findByIdAndUpdate(position, { $push: { interview: newInterview._id } });

    res.status(201).json({ success: true, interview: newInterview });
  } catch (error) {
    console.error("Create Interview Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

// ✅ Get all interviews (for admin)
export const getAllInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find()
      .populate("position")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, interviews });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Get interviews by candidate
export const getCandidateInterviews = async (req, res) => {
  try {

    const { candidateId } = req.params;
    const interviews = await Interview.find({ candidateId })
      .populate("position")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, interviews });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Check if candidate already applied for a position
export const checkCandidateApplied = async (req, res) => {
  try {
    const { candidateId, positionId } = req.query;

    // Validate input
    if (!candidateId || !positionId) {
      return res.status(400).json({
        success: false,
        message: "Candidate ID and Position ID are required.",
      });
    }

    // Check for existing interview/application
    const existing = await Interview.findOne({ candidateId, positionId });

    if (existing) {
      return res.status(200).json({
        success: true,
        alreadyApplied: true,
        message: "Already applied for this position.",
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

    res.status(200).json({ message: "interview deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
