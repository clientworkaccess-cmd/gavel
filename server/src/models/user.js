import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: Number },
  company: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }],
  role: { type: String, default: 'candidate' },
  address: { type: String, trim: true },
  linkedinProfile: { type: String, trim: true },
  skills: {
    type: [String],
    default: [],
  },
  qualification: { type: String, trim: true },
  position: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Position" },
  ],
  interviews: [{type: mongoose.Schema.Types.ObjectId, ref: "Interview"}],
  passwordResetToken: { type: String },
  passwordResetTokenExpiresAt: { type: Date },
  emailOtp: { type: String },
  emailOtpExpiresAt: { type: Date },
  verificationToken: { type: String },
  verificationTokenExpiresAt: { type: Date },
  emailVerified: { type: Boolean, default: false },
  redirectUrl: { type: String }
}, { timestamps: true })


UserSchema.index({ createdAt: -1 });
const User = mongoose.model('User', UserSchema);

export { User };