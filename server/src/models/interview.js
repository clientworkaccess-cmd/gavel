import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  position: { type: mongoose.Schema.Types.ObjectId, ref: 'Position', required: true },
  name: {type: String},
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true },
  email: { type: String, required: true },
  interviewID: { type: String, required: true },
  positionDescription: { type: String },
  positionId: { type: String, required: true },
  summary: { type: mongoose.Schema.Types.Mixed },
  transcript: { type: mongoose.Schema.Types.Mixed },
  status: { type: String },
  reviewStatus: { type: String, default: 'pending' }
}, { timestamps: true });

const Interview = mongoose.model('Interview', interviewSchema);
export default Interview;
