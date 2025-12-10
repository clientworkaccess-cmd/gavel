import mongoose from "mongoose";

const positionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  positionDescription: { type: String },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  interview: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Interview' }],
  category: { type: String, enum: ["Legal", "Hospitality", "Janitorial"] },
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  redFlag: { type: String },
}, { timestamps: true });



positionSchema.index({ creattedAt: -1 });
const Position = mongoose.model('Position', positionSchema);
export default Position;
