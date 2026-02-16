import React, { useState, useEffect } from "react";
import api from "../api/axios.js";
import { Bell, CheckCircle2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Configuration ---
const INTRO_DURATION = 2000; // Time for "Welcome" screen
const WORD_CHANGE_INTERVAL = 1000; // "Second wise" change
const ROTATING_WORDS = ["Real", "Chaotic", "Honest", "Unfiltered"];

const HeroPage = () => {
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  useEffect(() => {
    // Handle the intro sequence timing
    const timer = setTimeout(() => {
      setIsIntroComplete(true);
    }, INTRO_DURATION);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col font-sans bg-[#FFFBF0] overflow-hidden selection:bg-orange-200">
      {/* --- Background Elements --- */}
      <BackgroundBlobs />

      {/* --- AnimatePresence handles the switch between Intro and Main Content --- */}
      <AnimatePresence mode="wait">
        {!isIntroComplete ? (
          <IntroScreen key="intro" />
        ) : (
          <MainContent key="main" />
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Sub-Component: The "Welcome" Intro Screen ---
const IntroScreen = () => {
  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center bg-[#FFFBF0]"
      exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter"
      >
        Welcome to <span className="text-orange-600">Step2Campus</span>
      </motion.h2>
    </motion.div>
  );
};

// --- Sub-Component: Main Content (The Landing Page) ---
const MainContent = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleWaitlist = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      // SDE-2 Fix: Actually send the data to the backend
      // Since this is a "Quick Waitlist", we send a partial student profile
      await api.post("/auth/signup-student", {
        email,
        name: "Waitlist User",
        password: "DefaultPassword123!", // You might want to generate this or handle it differently
        college: "Pending",
        branch: "Pending",
      });

      setIsSubmitted(true);
    } catch (err) {
      alert(err.response?.data?.message || "Waitlist join failed");
    }
  };

  return (
    <main className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-4 pt-20 md:pt-32 pb-20">
      {/* Tagline Pill */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-orange-100 shadow-sm mb-8"
      >
        <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
        <span className="text-xs md:text-sm font-semibold tracking-wide text-gray-600 uppercase">
          Launching Soon · Spring 2026
        </span>
      </motion.div>

      {/* Dynamic Headline Component */}
      <RotatingHeadline />

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }} // Delayed to wait for headline
        className="text-gray-600 text-lg md:text-xl max-w-2xl leading-relaxed mb-10 font-medium"
      >
        The first student-to-student guidance platform. Stop relying on
        brochures. Start talking to the people actually living the life.
      </motion.p>

      {/* Countdown */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
        className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12"
      >
        <CountdownUnit value={timeLeft.days} label="Days" />
        <CountdownUnit value={timeLeft.hours} label="Hours" />
        <CountdownUnit value={timeLeft.minutes} label="Mins" />
        <CountdownUnit value={timeLeft.seconds} label="Secs" />
      </motion.div>

      {/* Input Form */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="w-full max-w-md relative group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-amber-300 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

        <div className="relative bg-white rounded-[1.8rem] p-2 shadow-xl border border-gray-100">
          {!isSubmitted ? (
            <form
              onSubmit={handleWaitlist}
              className="flex flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@university.edu"
                className="flex-1 px-6 py-4 bg-gray-50 text-gray-900 rounded-2xl focus:bg-white focus:ring-2 focus:ring-orange-100 border border-transparent focus:border-orange-200 outline-none transition-all placeholder:text-gray-400 font-medium"
                required
              />
              <button className="px-8 py-4 bg-gray-900 hover:bg-orange-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-gray-900/10 active:scale-[0.98] flex items-center justify-center gap-2 group/btn">
                Join
                <ArrowRight
                  size={18}
                  className="group-hover/btn:translate-x-1 transition-transform"
                />
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-3 py-4 text-green-600 font-bold text-lg">
              <CheckCircle2 size={24} />
              <span>You're on the list!</span>
            </div>
          )}
        </div>
        <p className="mt-4 text-sm text-gray-500 flex items-center justify-center gap-2">
          <Bell size={14} className="text-orange-500" />
          Limited to first 500 students for beta access.
        </p>
      </motion.div>
    </main>
  );
};

// --- Sub-Component: The Logic for Rotating Words ---
const RotatingHeadline = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Only cycle if we haven't reached the last word
    if (index < ROTATING_WORDS.length - 1) {
      const interval = setInterval(() => {
        setIndex((prev) => prev + 1);
      }, WORD_CHANGE_INTERVAL);
      return () => clearInterval(interval);
    }
  }, [index]);

  const currentWord = ROTATING_WORDS[index];
  const isFinalWord = index === ROTATING_WORDS.length - 1;

  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-6 tracking-tight leading-[1.1]"
    >
      Campus Life. <br />
      <span className="relative inline-flex flex-col h-[1.1em] overflow-hidden text-orange-600 align-top">
        {/* We use AnimatePresence to slide words in/out */}
        <AnimatePresence mode="popLayout">
          <motion.span
            key={currentWord}
            initial={{ y: "100%", opacity: 0, rotateX: -90 }}
            animate={{ y: "0%", opacity: 1, rotateX: 0 }}
            exit={{ y: "-100%", opacity: 0, rotateX: 90 }}
            transition={{ type: "spring", stiffness: 50, damping: 14 }}
            className="inline-block origin-bottom"
          >
            {currentWord}
            {isFinalWord ? "." : ""}
          </motion.span>
        </AnimatePresence>

        {/* SVG Underline - Only appears on the final word */}
        {isFinalWord && (
          <motion.svg
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
            className="absolute w-full h-3 -bottom-1 left-0 text-orange-200 -z-10"
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0 5 Q 50 10 100 5"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
            />
          </motion.svg>
        )}
      </span>
    </motion.h1>
  );
};

// --- Helpers & Visuals ---

const BackgroundBlobs = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-orange-200/40 rounded-full blur-[100px] mix-blend-multiply animate-blob" />
    <div className="absolute -bottom-[10%] -right-[10%] w-[50vw] h-[50vw] bg-amber-100/60 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-2000" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
  </div>
);

const CountdownUnit = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-2xl flex items-center justify-center border border-orange-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
      <div className="absolute inset-0 bg-orange-50 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300"></div>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className="text-3xl md:text-5xl font-bold text-gray-900 relative z-10 tabular-nums"
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </AnimatePresence>
    </div>
    <span className="text-[10px] md:text-xs text-gray-400 mt-2 uppercase tracking-widest font-bold">
      {label}
    </span>
  </div>
);

// Utility function
const calculateTimeLeft = () => {
  const difference = +new Date("2026-02-15") - +new Date();
  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
};

export default HeroPage;
