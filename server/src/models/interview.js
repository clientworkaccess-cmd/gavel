import mongoose from "mongoose";


const TranscriptSchema = new mongoose.Schema({
  role: { type: String,},
  content: { type: String }
});

const ScoresSchema = new mongoose.Schema({
  communication: { type: Number, default: 0 },
  knowledge: { type: Number, default: 0 },
  attitude: { type: Number, default: 0 },
  overallFit: { type: Number, default: 0 }
});


const interviewSchema = new mongoose.Schema({
  candidate: { type: String, required: true },
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  jobDescription: { type: String, default: "" },
  summary: [{ type: String }],
  transcript: [TranscriptSchema],
  jobName: { type: String, required: true },
  category: { type: String, required: true },
  scores: { type: ScoresSchema, required: true },
  recommendation: { type: String, default: "" },
  expectedSalary: { type: String, default: "" },
  keyInsights1: { type: String, default: "" },
  keyInsights2: { type: String, default: "" },
  keyInsights3: { type: String, default: "" },
  keyInsights4: { type: String, default: "" },
  redFlags: [{ type: String }],
  evaluatedAt: { type: Date, default: Date.now },
  reviewStatus: { type: String, default: 'pending' }
}, { timestamps: true });

const Interview = mongoose.model('Interview', interviewSchema);
export default Interview;



