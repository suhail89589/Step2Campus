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
  const springValue = useSpring(motionValue, { duration: 2500, bounce: 0 });
  const rounded = useTransform(springValue, (latest) => Math.floor(latest));

  useEffect(() => {
    if (isInView) {
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
  const GOOGLE_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSfBD-IV0tTLxNfQEF1LnMJWM0nxup-qnLkFSR-fTwKwvZiLqw/viewform";

  const stats = [
    { number: "50", suffix: "+", label: "Verified Mentors", icon: Users },
    { number: "5", suffix: "+", label: "Partner Colleges", icon: Building2 },
    { number: "100", suffix: "+", label: "Students Reached", icon: Sparkles }, // Updated label for context
    { number: "4.9", suffix: "/5", label: "Student Rating", icon: BadgeCheck },
  ];

  return (
    <div className="relative w-full font-sans bg-[#FFFBF0] overflow-hidden selection:bg-orange-200">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[50vw] h-[50vw] bg-orange-200/40 rounded-full blur-[100px] mix-blend-multiply animate-blob" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50vw] h-[50vw] bg-amber-100/60 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-2000" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* SECTION 1: Social Proof */}
      <section className="py-24 px-6 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
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

          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <BadgeItem icon={Shield} text="SSL Encrypted" />
            <BadgeItem icon={Lock} text="Data Privacy" />
            <BadgeItem icon={BadgeCheck} text="Human Verified" />
          </div>
        </div>
      </section>

      {/* SECTION 2: CTA Card */}
      <section className="pb-24 px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative max-w-5xl mx-auto rounded-[3rem] p-8 md:p-16 text-center overflow-hidden shadow-[0_40px_80px_-20px_rgba(249,115,22,0.4)]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-600"></div>
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
              Ready to guide the <br />
              <span className="text-orange-100/90">next generation?</span>
            </h2>
            <p className="text-lg md:text-xl text-orange-50 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
              Help students skip the freshman confusion. Share your journey and
              make an impact by becoming a verified mentor.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <motion.a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl hover:bg-orange-50 transition-all duration-300 shadow-xl shadow-black/10 flex items-center justify-center gap-2 group text-lg"
              >
                Become a Mentor
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </motion.a>
            </div>

            <p className="mt-8 text-sm text-orange-200/80 font-medium italic">
              * Verification process takes 24-48 hours.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

const BadgeItem = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-2 text-gray-400 font-semibold text-sm bg-white/50 px-4 py-2 rounded-full border border-orange-100/50">
    <Icon size={16} />
    <span>{text}</span>
  </div>
);

export default TrustedCTASection;
