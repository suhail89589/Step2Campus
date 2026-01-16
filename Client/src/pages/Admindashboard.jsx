import React, { useState, useEffect, useMemo } from "react";
import api from "../api/axios";
import {
  Users,
  Search,
  Eye,
  Check,
  X,
  Activity,
  ExternalLink,
  Filter,
  GraduationCap,
  User,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Sub-Components ---
const StatCard = ({ title, value, icon, color }) => {
  const colorMap = {
    blue: "bg-blue-500/10 text-blue-500",
    green: "bg-emerald-500/10 text-emerald-500",
    orange: "bg-orange-500/10 text-orange-500",
  };
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-2xl ${colorMap[color]}`}>{icon}</div>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Realtime
        </span>
      </div>
      <h3 className="text-3xl font-bold dark:text-white mb-1">{value}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
        {title}
      </p>
    </motion.div>
  );
};

const TabPill = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    className={`relative px-6 py-2 rounded-full font-medium text-sm transition-all z-10 ${
      active ? "text-white" : "text-slate-500 dark:text-slate-400"
    }`}
  >
    {active && (
      <motion.div
        layoutId="activeTab"
        className="absolute inset-0 bg-orange-600 rounded-full -z-10 shadow-lg"
      />
    )}
    {label}
  </button>
);

const ModalRow = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row justify-between sm:items-center py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
    <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
    <span className="text-sm font-semibold dark:text-slate-200">
      {value || "N/A"}
    </span>
  </div>
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("mentors");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data: result } = await api.get("/admin/stats");
      setData(activeTab === "mentors" ? result.recentMentors : result.students);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const updateStatus = async (id, newStatus) => {
    try {
      await api.patch(`/admin/mentor-status/${id}`, { status: newStatus });
      setSelectedItem(null);
      fetchData();
    } catch (error) {
      alert("Update failed");
    }
  };

  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.email || item.emails?.college)
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  return (
    <div className="bg-slate-50 dark:bg-[#0B1120] min-h-screen font-sans pb-20 transition-colors">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
        {/* Tab Switcher */}
        <div className="flex justify-center">
          <div className="bg-slate-200 dark:bg-slate-800 p-1.5 rounded-full flex gap-1">
            <TabPill
              active={activeTab === "mentors"}
              onClick={() => setActiveTab("mentors")}
              label="Mentors"
            />
            <TabPill
              active={activeTab === "students"}
              onClick={() => setActiveTab("students")}
              label="Students"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title={`Total ${activeTab}`}
            value={data.length}
            color="blue"
            icon={<Users size={24} />}
          />
          <StatCard
            title="Pending"
            value={data.filter((i) => i.status === "PENDING").length}
            color="orange"
            icon={<Activity size={24} />}
          />
          <StatCard
            title="Status"
            value="Live"
            color="green"
            icon={<Check size={24} />}
          />
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search
                className="absolute left-4 top-3 text-slate-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-12 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-orange-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs font-bold uppercase border-b border-slate-200 dark:border-slate-800">
                  <th className="p-6">Profile</th>
                  <th className="p-6">College</th>
                  <th className="p-6">Status</th>
                  <th className="p-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="p-10 text-center dark:text-slate-400"
                    >
                      Loading records...
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700 overflow-hidden">
                            {item.profileImage && (
                              <img
                                src={item.profileImage}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div>
                            <p className="font-bold dark:text-white">
                              {item.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {item.email || item.emails?.college}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6 text-sm dark:text-slate-300">
                        {item.college || item.education?.college || "N/A"}
                      </td>
                      <td className="p-6">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${
                            item.status === "APPROVED"
                              ? "bg-green-500/10 text-green-500 border-green-500/20"
                              : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                          }`}
                        >
                          {item.status || "ACTIVE"}
                        </span>
                      </td>
                      <td className="p-6 text-center">
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="p-2 text-slate-400 hover:text-orange-500"
                        >
                          <Eye size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <h2 className="text-xl font-bold dark:text-white">
                  User Details
                </h2>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 hover:bg-red-500 hover:text-white rounded-full transition-all"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="overflow-y-auto p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedItem.profileImage}
                    className="w-20 h-20 rounded-2xl object-cover border dark:border-slate-700"
                  />
                  <div>
                    <h3 className="text-xl font-bold dark:text-white">
                      {selectedItem.name}
                    </h3>
                    <p className="text-slate-500">
                      {selectedItem.education?.branch} •{" "}
                      {selectedItem.education?.year}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl">
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">
                      Personal Info
                    </h4>
                    <ModalRow
                      label="Email"
                      value={
                        selectedItem.emails?.personal || selectedItem.email
                      }
                    />
                    <ModalRow label="Phone" value={selectedItem.phoneNumber} />
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl">
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">
                      Academic Info
                    </h4>
                    <ModalRow
                      label="College"
                      value={
                        selectedItem.college || selectedItem.education?.college
                      }
                    />
                    <ModalRow
                      label="ID Email"
                      value={selectedItem.emails?.college}
                    />
                  </div>
                </div>
                {selectedItem.mentorReason && (
                  <div className="p-4 bg-orange-50 dark:bg-orange-500/5 border border-orange-100 dark:border-orange-500/20 rounded-2xl">
                    <p className="text-sm italic dark:text-slate-300">
                      "{selectedItem.mentorReason}"
                    </p>
                  </div>
                )}
              </div>
              {selectedItem.status === "PENDING" && (
                <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex gap-4">
                  <button
                    onClick={() => updateStatus(selectedItem._id, "REJECTED")}
                    className="flex-1 py-3 font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => updateStatus(selectedItem._id, "APPROVED")}
                    className="flex-[2] py-3 font-bold text-white bg-orange-600 rounded-xl shadow-lg flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={18} /> Approve
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard; // <--- CRITICAL FIX: Ensure export default is here
