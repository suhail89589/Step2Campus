import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
      select: false,
    },
    role: {
      type: String,
      default: "STUDENT",
      enum: ["STUDENT"],
    },
  },
  {
    timestamps: true,
  }
);

/**
 * FIXED: Pre-save hook for password hashing.
 */
studentSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Instance method to compare passwords
 */
studentSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// --- FIXED EXPORT LOGIC ---
// This prevents OverwriteModelError by checking if the model is already compiled
const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;
