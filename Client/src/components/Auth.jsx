import React, { useState } from "react";
import api from "../api/axios"; // Secured Axios instance with baseURL including /api
import { Eye, EyeOff, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";
import { Link } from "react-router-dom";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const InputField = ({ label, icon: Icon, error, ...props }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">
      {label}
    </label>
    <div className="relative group">
      <input
        className={cn(
          "w-full bg-slate-900/50 border border-slate-700 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-orange-500/50 outline-none transition-all",
          Icon && "pl-11",
          error && "border-red-500"
        )}
        {...props}
      />
      {Icon && (
        <Icon
          size={18}
          className="absolute left-3.5 top-3.5 text-slate-500 group-focus-within:text-orange-400"
        />
      )}
    </div>
  </div>
);

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMsg({ type: "", text: "" });
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/signup";
      const { data } = await api.post(endpoint, formData);

      if (data.token) {
        // SDE-2 Tip: Clear old data first to avoid role-contamination
        localStorage.clear();
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Set success message
        setStatusMsg({
          type: "success",
          text: `Success! Welcome ${data.user.name}`,
        });

        // Explicitly check the role from the response, not state
        const destination =
          data.user.role === "ADMIN" ? "/admin/dashboard" : "/dashboard";

        setTimeout(() => {
          window.location.href = destination;
        }, 1000);
      }
    } catch (err) {
      console.error("Auth Error Trace:", err.response);
      const errorMessage =
        err.response?.data?.message ||
        "Authentication failed. Check your connection.";
      setStatusMsg({ type: "error", text: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center p-4 bg-slate-950 text-slate-200 overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black z-0" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-slate-900/40 backdrop-blur-2xl border border-slate-700/50 shadow-2xl rounded-3xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-slate-400 text-sm">
              Enter your credentials to continue
            </p>
          </div>

          {statusMsg.text && (
            <div
              className={cn(
                "mb-6 p-3 rounded-xl flex items-center gap-3 text-sm border animate-in fade-in slide-in-from-top-1",
                statusMsg.type === "error"
                  ? "bg-red-500/10 border-red-500/20 text-red-400"
                  : "bg-green-500/10 border-green-500/20 text-green-400"
              )}
            >
              {statusMsg.type === "error" ? (
                <AlertCircle size={18} />
              ) : (
                <CheckCircle2 size={18} />
              )}
              {statusMsg.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <InputField
                label="Full Name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            )}
            <InputField
              label="Email Address"
              type="email"
              name="email"
              placeholder="name@university.edu"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="relative">
              <InputField
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-9 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <button
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-600 to-amber-600 py-3.5 rounded-xl font-bold text-white flex justify-center items-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-orange-900/20"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-slate-800 pt-6 space-y-3">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setStatusMsg({ type: "", text: "" });
              }}
              className="text-orange-400 hover:text-orange-300 font-semibold text-sm transition-colors"
            >
              {isLogin
                ? "Need a student account?"
                : "Already have an account? Sign In"}
            </button>
            {!isLogin && (
              <p className="text-xs text-slate-500">
                Want to guide others?{" "}
                <Link
                  to="/apply-mentor"
                  className="text-orange-500 font-bold hover:underline"
                >
                  Apply as Mentor
                </Link>
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Auth;
