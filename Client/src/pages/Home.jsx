import React, { Suspense, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Static Import for "Above the Fold" content
import Navbar from "../components/Navbar";
import HeroPage from "../components/Hero";

// Lazy Load "Below the Fold" content
const FeaturesSection = React.lazy(() => import("../components/Feature"));
const VerificationSection = React.lazy(() =>
  import("../components/Verification")
);
const TrustedCTASection = React.lazy(() => import("../components/CTA"));
const Footer = React.lazy(() => import("../components/Footer"));

const Preloader = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#FFFBF0] dark:bg-slate-950 transition-colors duration-500"
  >
    <div className="flex flex-col items-center gap-4">
      <div className="h-12 w-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin" />
      <span className="text-orange-900 dark:text-orange-500 font-bold tracking-widest text-xs uppercase">
        Step2Campus
      </span>
    </div>
  </motion.div>
);

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setIsLoading(false);
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      const timeout = setTimeout(handleLoad, 3000);
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(timeout);
      };
    }
  }, []);

  return (
    <div className="bg-[#FFFBF0] dark:bg-slate-950 min-h-screen transition-colors duration-500">
      <AnimatePresence>{isLoading && <Preloader />}</AnimatePresence>

      <Navbar />

      <main className="relative">
        <HeroPage />

        <Suspense
          fallback={<div className="h-screen bg-[#FFFBF0] dark:bg-slate-950" />}
        >
          <FeaturesSection />
          <VerificationSection />
          <TrustedCTASection />
        </Suspense>
      </main>

      <div className="relative z-20">
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
};

// CRITICAL FIX: React.lazy requires a default export
export default Home;
