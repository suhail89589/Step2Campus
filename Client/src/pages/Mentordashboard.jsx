import React, { useState, useEffect } from "react";
import api from "../api/axios"; // Ensure this path is correct in your project
import {
  Clock,
  CheckCircle2,
  User,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Users,
  Loader2,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

// --- UI Components ---

const GlassCard = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={`bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl ${className}`}
  >
    {children}
  </motion.div>
);

const ProfileField = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/60 transition-colors group">
    <div className="p-2.5 bg-orange-500/10 rounded-xl text-orange-500 group-hover:scale-110 transition-transform">
      <Icon size={18} />
    </div>
    <div className="flex-1 overflow-hidden">
      <p className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-0.5">
        {label}
      </p>
      <p className="text-sm text-slate-200 font-medium truncate" title={value}>
        {value || "Not provided"}
      </p>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    APPROVED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    REJECTED: "bg-red-500/10 text-red-400 border-red-500/20",
    PENDING: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  };

  const config = styles[status] || styles.PENDING;

  return (
    <div
      className={`flex items-center gap-2 px-4 py-1.5 rounded-full border ${config}`}
    >
      {status === "APPROVED" ? <CheckCircle2 size={14} /> : <Clock size={14} />}
      <span className="text-[10px] font-bold uppercase tracking-widest">
        {status || "Pending"}
      </span>
    </div>
  );
};

// --- Main Component ---

const MentorDashboard = ({ user: initialUser }) => {
  const [user, setUser] = useState(initialUser);
  const [isSyncing, setIsSyncing] = useState(true);

  useEffect(() => {
    const syncStatus = async () => {
      try {
        const { data } = await api.get("/auth/me");
        if (data.success) {
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
        }
      } catch (err) {
        console.error("Status sync failed.", err);
      } finally {
        setIsSyncing(false);
      }
    };
    syncStatus();
  }, []);

  if (isSyncing) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
        <Loader2 className="text-orange-500 animate-spin" size={48} />
        <p className="text-slate-500 text-sm animate-pulse">
          Syncing profile...
        </p>
      </div>
    );
  }

  const isApproved = user?.status === "APPROVED";

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-200 font-sans selection:bg-orange-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2"
            >
              Mentor<span className="text-orange-500">Portal</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-slate-400 text-lg"
            >
              Welcome back, <span className="text-white">{user?.name}</span>
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <StatusBadge status={user?.status} />
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Identity & Details */}
          <div className="lg:col-span-4 space-y-6">
            <GlassCard>
              <div className="relative flex flex-col items-center mb-8">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-amber-500 rounded-2xl blur opacity-40 group-hover:opacity-60 transition-opacity" />
                  <img
                    src={
                      user?.profileImage ||
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                    }
                    alt="Profile"
                    className="relative w-32 h-32 rounded-2xl object-cover border-2 border-slate-800 shadow-2xl"
                  />
                  <div className="absolute -bottom-3 -right-3 bg-slate-900 p-1.5 rounded-full border border-slate-800">
                    <div className="bg-green-500 w-3 h-3 rounded-full animate-pulse" />
                  </div>
                </div>
                <h2 className="mt-4 text-xl font-bold text-white text-center">
                  {user?.name}
                </h2>
                <p className="text-slate-500 text-sm">
                  {user?.education?.branch} • {user?.education?.year}
                </p>
              </div>

              <div className="space-y-3">
                <ProfileField
                  icon={Mail}
                  label="College Email"
                  value={user?.emails?.college}
                />
                <ProfileField
                  icon={Phone}
                  label="Contact"
                  value={user?.phoneNumber}
                />
                <ProfileField
                  icon={GraduationCap}
                  label="Academics"
                  value={`${user?.education?.branch} (${user?.education?.year})`}
                />
                <ProfileField
                  icon={Briefcase}
                  label="Mentorship Fee"
                  value={`₹${user?.expectedPrice} / session`}
                />
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800">
                <h4 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                  <User size={14} /> Bio / Motivation
                </h4>
                <p className="text-sm text-slate-400 italic leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
                  "{user?.mentorReason || "No bio provided yet."}"
                </p>
              </div>
            </GlassCard>
          </div>

          {/* Right Column: Dashboard Actions */}
          <div className="lg:col-span-8 space-y-6">
            {/* Status Banners */}
            {!isApproved && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden bg-gradient-to-br from-orange-500/10 to-amber-500/5 border border-orange-500/20 rounded-[2rem] p-8"
              >
                <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12">
                  <Clock size={200} />
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center text-orange-500 mb-4">
                    <AlertCircle size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Application Under Review
                  </h2>
                  <p className="text-slate-400 max-w-lg leading-relaxed">
                    Our admin team is currently verifying your academic
                    credentials. Usually takes 24-48 hours. Once approved, you
                    will gain full access to student requests.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Main Action Area */}
            <GlassCard className="min-h-[400px] flex flex-col" delay={0.2}>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Users className="text-orange-500" /> My Students
                </h3>
                {isApproved && (
                  <button className="text-xs font-bold text-orange-500 hover:text-orange-400 uppercase tracking-wider flex items-center gap-1">
                    View All <ChevronRight size={14} />
                  </button>
                )}
              </div>

              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-800 rounded-2xl bg-slate-900/20">
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4 shadow-inner">
                  <Users size={32} className="text-slate-600" />
                </div>
                <h4 className="text-lg font-medium text-slate-300 mb-2">
                  {isApproved ? "No Active Sessions" : "Access Restricted"}
                </h4>
                <p className="text-slate-500 max-w-xs mx-auto mb-6">
                  {isApproved
                    ? "You haven't been assigned any students yet. Check back later!"
                    : "Once your profile is approved, your assigned students will appear here."}
                </p>

                {!isApproved && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 text-slate-400 text-xs font-bold uppercase tracking-widest opacity-70 cursor-not-allowed">
                    <Loader2 size={12} className="animate-spin" /> Waiting for
                    Approval
                  </span>
                )}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
