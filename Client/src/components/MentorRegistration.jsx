import React, { useState } from "react";
import api from "../api/axios";
import {
  Loader2,
  Upload,
  ChevronRight,
  ChevronLeft,
  Camera,
  ShieldCheck,
  Globe,
  IndianRupee, // Added currency icon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MentorRegistration = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState({ profileImage: null, collegeId: null });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    personalEmail: "",
    password: "",
    phoneNumber: "",
    age: "",
    college: "",
    branch: "",
    year: "",
    linkedin: "",
    mentorReason: "",
    expectedPrice: "", // Price field added
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    setFiles((prev) => ({ ...prev, [name]: selectedFiles[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation for character length before proceeding
    if (step === 3 && formData.mentorReason.length < 100) {
      alert(
        `Reason is too short! Need ${
          100 - formData.mentorReason.length
        } more characters.`
      );
      return;
    }

    if (step < 4) {
      setStep(step + 1);
      return;
    }

    setIsLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (files.profileImage) data.append("profileImage", files.profileImage);
    if (files.collegeId) data.append("collegeId", files.collegeId);

    try {
      await api.post("/auth/register-mentor", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Application submitted! We will review your profile soon.");
      window.location.href = "/dashboard";
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Registration failed. Check character lengths."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-900/20 via-slate-950 to-slate-950 -z-10" />

      <form
        onSubmit={handleSubmit}
        className="max-w-xl w-full bg-slate-900/40 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl"
      >
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Mentor Application
            </h2>
            <div className="flex gap-1.5 mt-2">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 w-8 rounded-full transition-colors duration-300 ${
                    step >= s ? "bg-orange-500" : "bg-slate-700"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="p-3 bg-orange-500/10 rounded-2xl">
            <ShieldCheck className="text-orange-500" size={28} />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* STEP 1 & 2 remain the same as your provided code */}
            {step === 1 && (
              <div className="space-y-4">
                <p className="text-slate-400 text-sm mb-4">
                  Let's start with your account credentials.
                </p>
                <input
                  name="name"
                  placeholder="Full Name"
                  className="w-full bg-slate-800/50 border border-slate-700 p-4 rounded-xl outline-none focus:border-orange-500 transition-colors"
                  onChange={handleChange}
                  value={formData.name}
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Official College Email"
                  className="w-full bg-slate-800/50 border border-slate-700 p-4 rounded-xl outline-none focus:border-orange-500 transition-colors"
                  onChange={handleChange}
                  value={formData.email}
                  required
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Create Password"
                  className="w-full bg-slate-800/50 border border-slate-700 p-4 rounded-xl outline-none focus:border-orange-500 transition-colors"
                  onChange={handleChange}
                  value={formData.password}
                  required
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <p className="text-slate-400 text-sm mb-4">
                  Help us get to know you better.
                </p>
                <input
                  name="personalEmail"
                  type="email"
                  placeholder="Personal Email (Backup)"
                  className="w-full bg-slate-800/50 border border-slate-700 p-4 rounded-xl outline-none focus:border-orange-500 transition-colors"
                  onChange={handleChange}
                  value={formData.personalEmail}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="phoneNumber"
                    placeholder="Phone Number"
                    className="w-full bg-slate-800/50 border border-slate-700 p-4 rounded-xl outline-none focus:border-orange-500 transition-colors"
                    onChange={handleChange}
                    value={formData.phoneNumber}
                    required
                  />
                  <input
                    name="age"
                    type="number"
                    placeholder="Age"
                    className="w-full bg-slate-800/50 border border-slate-700 p-4 rounded-xl outline-none focus:border-orange-500 transition-colors"
                    onChange={handleChange}
                    value={formData.age}
                    required
                  />
                </div>
                <div className="relative">
                  <Globe
                    className="absolute left-4 top-4 text-slate-500"
                    size={20}
                  />
                  <input
                    name="linkedin"
                    placeholder="LinkedIn URL"
                    className="w-full bg-slate-800/50 border border-slate-700 p-4 pl-12 rounded-xl outline-none focus:border-orange-500 transition-colors"
                    onChange={handleChange}
                    value={formData.linkedin}
                  />
                </div>
              </div>
            )}

            {/* STEP 3: Education, Price & Character-validated Reason */}
            {step === 3 && (
              <div className="space-y-4">
                <p className="text-slate-400 text-sm mb-4">
                  Pricing and Guidance Details.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="college"
                    placeholder="College Name"
                    className="w-full bg-slate-800/50 border border-slate-700 p-4 rounded-xl outline-none focus:border-orange-500 transition-colors"
                    onChange={handleChange}
                    value={formData.college}
                    required
                  />
                  <div className="relative">
                    <span className="absolute left-4 top-4 text-slate-500 font-bold">
                      ₹
                    </span>
                    <input
                      name="expectedPrice"
                      type="number"
                      placeholder="Price/Session"
                      className="w-full bg-slate-800/50 border border-slate-700 p-4 pl-10 rounded-xl outline-none focus:border-orange-500 transition-colors"
                      onChange={handleChange}
                      value={formData.expectedPrice}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="branch"
                    placeholder="Branch"
                    className="w-full bg-slate-800/50 border border-slate-700 p-4 rounded-xl outline-none focus:border-orange-500 transition-colors"
                    onChange={handleChange}
                    value={formData.branch}
                    required
                  />
                  <input
                    name="year"
                    placeholder="Year"
                    className="w-full bg-slate-800/50 border border-slate-700 p-4 rounded-xl outline-none focus:border-orange-500 transition-colors"
                    onChange={handleChange}
                    value={formData.year}
                    required
                  />
                </div>
                <div className="relative">
                  <textarea
                    name="mentorReason"
                    placeholder="Why do you want to be a mentor? (Describe your expertise)"
                    className="w-full bg-slate-800/50 border border-slate-700 p-4 rounded-xl outline-none focus:border-orange-500 transition-colors h-32 resize-none"
                    onChange={handleChange}
                    value={formData.mentorReason}
                    required
                  />
                  <span
                    className={`absolute bottom-2 right-4 text-[10px] ${
                      formData.mentorReason.length < 100
                        ? "text-red-400"
                        : "text-green-400"
                    }`}
                  >
                    {formData.mentorReason.length}/100 characters
                  </span>
                </div>
              </div>
            )}

            {/* STEP 4: Documents (same as yours) */}
            {step === 4 && (
              <div className="space-y-6">
                <p className="text-slate-400 text-sm mb-4">
                  Upload verification documents.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                      Profile Photo
                    </label>
                    <div className="relative h-40 w-full border-2 border-dashed border-slate-700 rounded-2xl flex flex-col items-center justify-center bg-slate-800/30 overflow-hidden group">
                      {files.profileImage ? (
                        <img
                          src={URL.createObjectURL(files.profileImage)}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Camera
                          size={28}
                          className="text-slate-500 group-hover:text-orange-500 transition-colors"
                        />
                      )}
                      <input
                        type="file"
                        name="profileImage"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                      College ID Card
                    </label>
                    <div className="relative h-40 w-full border-2 border-dashed border-slate-700 rounded-2xl flex flex-col items-center justify-center bg-slate-800/30 group overflow-hidden">
                      {files.collegeId ? (
                        <div className="text-center p-2">
                          <span className="text-xs text-orange-400">
                            {files.collegeId.name}
                          </span>
                        </div>
                      ) : (
                        <Upload
                          size={28}
                          className="text-slate-500 group-hover:text-orange-500 transition-colors"
                        />
                      )}
                      <input
                        type="file"
                        name="collegeId"
                        onChange={handleFileChange}
                        accept="image/*,.pdf"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-4 mt-10">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-6 py-4 bg-slate-800 rounded-2xl hover:bg-slate-700 transition-colors text-slate-300"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-orange-600 to-orange-500 py-4 rounded-2xl font-bold flex justify-center items-center gap-2 hover:from-orange-500 hover:to-orange-400 transition-all shadow-lg shadow-orange-900/20 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : step === 4 ? (
              "Submit Application"
            ) : (
              "Continue"
            )}
            {!isLoading && step < 4 && <ChevronRight size={18} />}
          </button>
        </div>
      </form>
    </section>
  );
};

export default MentorRegistration;
