import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  address: { type: String },
  website: { type: String },
  industry: { type: String },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  interviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Interview' }],
  positions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Position' }],
}, { timestamps: true });


companySchema.index({ createdAt: -1 });
const Company = mongoose.model('Company', companySchema);
export default Company;
