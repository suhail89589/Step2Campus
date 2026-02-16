import React from "react";
import {
  UserCheck,
  MessageCircle,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

// --- Configuration ---
const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfBD-IV0tTLxNfQEF1LnMJWM0nxup-qnLkFSR-fTwKwvZiLqw/viewform";

// --- Data ---
const FEATURES = [
  {
    title: "Verified Mentors",
    desc: "Every mentor is authenticated via college email. No bots, no fake profiles, just real seniors.",
    icon: <UserCheck size={28} />,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Unfiltered Chats",
    desc: "Get the raw truth about mess food, hostel curfew, and placements. No marketing fluff allowed.",
    icon: <MessageCircle size={28} />,
    color: "bg-orange-50 text-orange-600",
  },
  {
    title: "Career Insider",
    desc: "Access alumni networks and internship referrals exclusive to campus communities.",
    icon: <GraduationCap size={28} />,
    color: "bg-emerald-50 text-emerald-600",
  },
];

const STEPS = [
  { id: 1, title: "Join Waitlist", desc: "Secure your spot for early access." },
  {
    id: 2,
    title: "Find Your Senior",
    desc: "Filter by college, major, or interest.",
  },
  {
    id: 3,
    title: "Start Talking",
    desc: "Book a 15-min chat or text asynchronously.",
  },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const FeaturesSection = () => {
  // Handler for secure redirection
  const handleStartJourney = () => {
    window.open(GOOGLE_FORM_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative w-full font-sans overflow-hidden bg-[#FFFBF0] selection:bg-orange-200">
      {/* Background Layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-orange-200/40 rounded-full blur-[100px] mix-blend-multiply opacity-70" />
        <div className="absolute top-[40%] -left-[10%] w-[40vw] h-[40vw] bg-amber-100/60 rounded-full blur-[100px] mix-blend-multiply opacity-70" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* SECTION 1: Why Step2Campus? */}
      <section className="py-24 px-6 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 text-xs font-bold tracking-widest uppercase mb-4"
            >
              The Platform Advantage
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-6"
            >
              Why students <span className="text-orange-500">trust us</span>.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed"
            >
              We are building the bridge we wished we had. Real connections,
              verified identities, and zero noise.
            </motion.p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {FEATURES.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[2rem] p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-orange-100/50 hover:border-orange-200 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 to-orange-50/0 group-hover:to-orange-50/30 transition-all duration-500"></div>
                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed font-medium">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: How It Works */}
      <section className="py-24 px-6 relative z-10 border-t border-orange-100/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
              From confused to{" "}
              <span className="text-orange-500 underline decoration-orange-200 decoration-4 underline-offset-4">
                confident
              </span>
              .
            </h2>
            <p className="text-gray-500 text-lg">
              Three simple steps to unlock your campus network.
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-orange-200 via-orange-400 to-orange-200 -z-0"></div>

            {STEPS.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative flex flex-col items-center text-center group z-10"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg shadow-orange-100 border-4 border-white mb-8 group-hover:border-orange-500 transition-colors duration-300 relative">
                  <span className="text-3xl font-black text-gray-300 group-hover:text-orange-500 transition-colors">
                    0{step.id}
                  </span>
                  {index === 2 && (
                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 rounded-full animate-bounce shadow-sm">
                      Start!
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm font-medium max-w-[200px] leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA Button linked to Google Form */}
          <div className="flex justify-center mt-12">
            <motion.button
              onClick={handleStartJourney}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-full font-bold text-lg shadow-xl shadow-gray-900/20 hover:bg-orange-600 hover:shadow-orange-500/30 transition-all duration-300"
            >
              Start your journey
              <span className="bg-white/20 rounded-full p-1 group-hover:bg-white/30 transition-colors">
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </span>
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesSection;
