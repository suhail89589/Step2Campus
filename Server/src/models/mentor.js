import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Switched to bcryptjs for better environment compatibility

const mentorSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    emails: {
      college: {
        type: String,
        required: [true, "College email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid college email"],
      },
      personal: {
        type: String,
        required: [true, "Personal email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid personal email"],
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
    },
    age: {
      type: Number,
      required: true,
      min: [18, "Must be at least 18 years old"],
    },
    education: {
      college: { type: String, required: true },
      branch: { type: String, required: true },
      year: { type: String, required: true },
      // Note: Removed degree: required if it's not in your frontend form
    },
    socials: {
      linkedin: {
        type: String,
        match: [
          /^https?:\/\/(www\.)?linkedin\.com\/.*$/,
          "Please provide a valid LinkedIn URL",
        ],
      },
    },
    profileImage: { type: String },
    collegeIdCard: { type: String }, // NEW FIELD: For Cloudinary document URL
    mentorReason: {
      type: String,
      required: true,
      minlength: [100, "Reason must be at least 100 characters"],
    },
    expectedPrice: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    role: { type: String, enum: ["MENTOR", "ADMIN"], default: "MENTOR" },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

// --- FIXED ASYNC MIDDLEWARE ---
// Removed 'next' parameter to solve the "next is not a function" error
mentorSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

mentorSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};


mentorSchema.index({ status: 1 });

const Mentor = mongoose.models.Mentor || mongoose.model("Mentor", mentorSchema);
export default Mentor;
