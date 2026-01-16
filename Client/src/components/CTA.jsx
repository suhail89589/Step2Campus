import React, { useEffect, useRef } from "react";
import {
  Shield,
  Lock,
  BadgeCheck,
  ArrowRight,
  Sparkles,
  Users,
  Building2,
} from "lucide-react";
import {
  motion,
  useInView,
  useSpring,
  useMotionValue,
  useTransform,
} from "framer-motion";

// --- Helper Component: Animated Counter ---
const Counter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2500, bounce: 0 }); // Slower, smoother spring
  const rounded = useTransform(springValue, (latest) => Math.floor(latest));

  useEffect(() => {
    if (isInView) {
      // Parse the number from the string (e.g. "500+" -> 500)
      const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
      motionValue.set(numericValue);
    }
  }, [isInView, value, motionValue]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

const TrustedCTASection = () => {
  const stats = [
    { number: "500", suffix: "+", label: "Verified Mentors", icon: Users },
    { number: "50", suffix: "+", label: "Partner Colleges", icon: Building2 },
    { number: "10000", suffix: "+", label: "Waitlist Members", icon: Sparkles },
    { number: "4.9", suffix: "/5", label: "Student Rating", icon: BadgeCheck },
  ];

  return (
    <div className="relative w-full font-sans bg-[#FFFBF0] overflow-hidden selection:bg-orange-200">
      {/* =========================================
          BACKGROUND LAYERS (Exact Match to Hero)
         ========================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top Right Orange Blob */}
        <div className="absolute -top-[20%] -right-[10%] w-[50vw] h-[50vw] bg-orange-200/40 rounded-full blur-[100px] mix-blend-multiply animate-blob" />
        {/* Bottom Left Amber Blob */}
        <div className="absolute -bottom-[20%] -left-[10%] w-[50vw] h-[50vw] bg-amber-100/60 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-2000" />

        {/* Architectural Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* =========================================
          SECTION 1: Social Proof (Stats)
         ========================================= */}
      <section className="py-24 px-6 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
                Trusted by students{" "}
                <span className="relative inline-block text-orange-600">
                  nationwide
                  {/* Subtle underline SVG */}
                  <svg
                    className="absolute w-full h-3 -bottom-1 left-0 text-orange-200 -z-10"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 5 Q 50 10 100 5"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                    />
                  </svg>
                </span>
                .
              </h2>
              <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                Joining forces with the best campuses to bring you the truth.
              </p>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 border-t border-orange-900/5 pt-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center group"
              >
                <div className="mb-4 p-4 rounded-2xl bg-white border border-orange-100 shadow-sm text-orange-500 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                  <stat.icon size={24} />
                </div>
                <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2 tracking-tight">
                  <Counter value={stat.number} suffix={stat.suffix} />
                </div>
                <span className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest group-hover:text-orange-600 transition-colors">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Trust Badges Row */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <BadgeItem icon={Shield} text="SSL Encrypted" />
            <BadgeItem icon={Lock} text="Data Privacy" />
            <BadgeItem icon={BadgeCheck} text="Human Verified" />
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: The "Mic Drop" CTA Card
         ========================================= */}
      <section className="pb-24 px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative max-w-5xl mx-auto rounded-[3rem] p-8 md:p-16 text-center overflow-hidden shadow-[0_40px_80px_-20px_rgba(249,115,22,0.4)]"
        >
          {/* Card Background Gradient - Matching the 'Unfiltered' vibe */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-600"></div>

          {/* Grain Texture Overlay for that 'Retro/Modern' feel */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>

          {/* Abstract Shapes inside the card */}
          <div className="absolute top-[-50%] left-[-20%] w-[600px] h-[600px] bg-white/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-50%] right-[-20%] w-[600px] h-[600px] bg-orange-900/20 rounded-full blur-[100px]"></div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
              Ready to skip the <br />
              <span className="text-orange-100/90">freshman confusion?</span>
            </h2>
            <p className="text-lg md:text-xl text-orange-50 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
              Join thousands of students making informed decisions. The waitlist
              is growing fast—secure your spot today.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 bg-white text-orange-600 font-bold rounded-2xl hover:bg-orange-50 transition-all duration-300 shadow-xl shadow-black/10 flex items-center justify-center gap-2 group"
              >
                Join Waitlist Now
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 bg-orange-600/30 text-white font-bold rounded-2xl border border-white/20 hover:bg-orange-600/50 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2"
              >
                Become a Mentor
              </motion.button>
            </div>

            <p className="mt-8 text-sm text-orange-200/60 font-medium">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

// Sub-component for badges
const BadgeItem = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-2 text-gray-400 font-semibold text-sm bg-white/50 px-4 py-2 rounded-full border border-orange-100/50">
    <Icon size={16} />
    <span>{text}</span>
  </div>
);

export default TrustedCTASection;
