import React from "react";
import {
  BadgeCheck,
  ShieldCheck,
  ArrowRight,
  ScanFace,
  MailCheck,
  FileSearch,
} from "lucide-react";
import { motion } from "framer-motion";

const VERIFICATION_STEPS = [
  {
    title: "Student ID Match",
    description:
      "We cross-reference uploaded college IDs with enrollment databases.",
    icon: ScanFace,
  },
  {
    title: ".edu Email Check",
    description:
      "Required OTP verification via official institutional email addresses.",
    icon: MailCheck,
  },
  {
    title: "Manual Vetting",
    description:
      "Our team reviews every profile to ensure they are real humans, not bots.",
    icon: FileSearch,
  },
];

const VerificationSection = () => {
  // Constants defined inside or outside; usually outside for static,
  // but kept here for easy configuration.
  const GOOGLE_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSfBD-IV0tTLxNfQEF1LnMJWM0nxup-qnLkFSR-fTwKwvZiLqw/viewform";

  return (
    <section className="relative pt-24 pb-48 px-6 bg-[#FFFBF0] font-sans overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-orange-200/40 rounded-full blur-[100px] mix-blend-multiply opacity-70" />
        <div className="absolute top-[20%] -right-[10%] w-[40vw] h-[40vw] bg-amber-100/60 rounded-full blur-[100px] mix-blend-multiply opacity-70" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="order-2 lg:order-1"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-orange-100 text-orange-700 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
            <ShieldCheck size={14} /> Trust & Safety
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-[1.1]">
            Real Students. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              Zero Fakes.
            </span>
          </h2>

          <p className="text-gray-500 text-lg mb-10 leading-relaxed max-w-xl">
            We don't just "check the box." We have a 3-layer verification
            process to ensure every mentor is exactly who they say they are.
          </p>

          <div className="space-y-4">
            {VERIFICATION_STEPS.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-start p-4 rounded-2xl bg-white/40 hover:bg-white border border-orange-50 hover:border-orange-200 transition-all duration-300 group cursor-default shadow-sm hover:shadow-md"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-white border border-orange-100 rounded-xl flex items-center justify-center shadow-sm group-hover:bg-orange-500 transition-all">
                    <step.icon
                      className="text-gray-400 group-hover:text-white transition-colors"
                      size={24}
                    />
                  </div>
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* SDE Fix: Converted button to anchor for external link + Secure attributes */}
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600 shadow-xl shadow-gray-900/10 hover:shadow-orange-500/20 transition-all duration-300 group active:scale-95 no-underline"
          >
            Apply to be a Mentor
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </motion.div>

        {/* Right Column Visuals */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="order-1 lg:order-2 relative"
        >
          <div className="absolute top-10 right-10 w-3/4 h-3/4 bg-orange-300 rounded-[3rem] -rotate-6 -z-10 blur-sm opacity-40"></div>
          <div className="absolute bottom-10 left-10 w-3/4 h-3/4 bg-white rounded-[3rem] rotate-3 -z-10 shadow-lg border border-orange-50"></div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl border-[6px] border-white">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
              alt="Verified Student"
              className="object-cover w-full h-full"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute bottom-8 left-6 right-6 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/40 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-2.5 rounded-full text-green-600">
                  <BadgeCheck size={28} />
                </div>
                <div>
                  <p className="text-gray-900 font-bold leading-tight">
                    Identity Verified
                  </p>
                  <p className="text-xs text-gray-500 font-medium tracking-wide">
                    TRUSTED STUDENT
                  </p>
                </div>
              </div>
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VerificationSection;
