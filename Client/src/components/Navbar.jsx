import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  LogIn,
  LayoutDashboard,
  LogOut,
  Home as HomeIcon,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import logo from "../assets/image.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { scrollY } = useScroll();

  const isDashboardPage = location.pathname.includes("dashboard");

  // Auth Check Logic
  useEffect(() => {
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (savedUser && token) {
          setUser(JSON.parse(savedUser));
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsMenuOpen(false);
    navigate("/auth");
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
  }, [isMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        // THEME FIX: Swapped 'bg-white' for 'bg-[#FFFBF0]' to match sections
        className={`fixed top-0 left-0 right-0 z-[100] px-4 md:px-8 py-4 transition-all duration-500 ${
          isScrolled || isDashboardPage
            ? "bg-[#FFFBF0]/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-orange-100 dark:border-slate-800 shadow-md shadow-orange-900/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* --- Logo --- */}
          <Link to="/" className="flex items-center gap-2 group relative z-50">
            <img
              src={logo}
              alt="Logo"
              className="h-10 w-auto md:h-12 object-contain group-hover:scale-105 transition-transform"
            />
            <span className="font-bold text-lg md:text-xl tracking-tight text-slate-900 dark:text-white">
              Step2<span className="text-orange-600">Campus</span>
            </span>
          </Link>

          {/* --- Desktop Navigation --- */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {user ? (
              <>
                <Link
                  to={
                    isDashboardPage
                      ? "/"
                      : user.role === "ADMIN"
                        ? "/admin/dashboard"
                        : "/dashboard"
                  }
                  className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 font-bold transition-colors group"
                >
                  {isDashboardPage ? (
                    <>
                      <HomeIcon size={20} className="text-orange-500" /> Home
                    </>
                  ) : (
                    <>
                      <LayoutDashboard size={20} className="text-orange-500" />{" "}
                      Dashboard
                    </>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-slate-500 hover:text-red-600 font-bold transition-colors"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-6">
                <Link
                  to="/auth"
                  className="text-slate-700 dark:text-slate-300 font-bold hover:text-orange-600 transition-colors"
                >
                  Sign In
                </Link>
                <button
                  onClick={() => navigate("/auth")}
                  className="bg-gray-900 text-white px-8 py-2.5 rounded-full font-bold shadow-xl shadow-gray-900/10 hover:bg-orange-600 transition-all active:scale-95"
                >
                  Join Now
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden relative z-50">
            <button
              className="p-2 text-slate-800 dark:text-white hover:text-orange-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[40] bg-[#FFFBF0] dark:bg-slate-950 flex flex-col pt-32 px-8 md:hidden"
          >
            <div className="flex flex-col gap-8">
              {user ? (
                <>
                  <Link
                    to={
                      isDashboardPage
                        ? "/"
                        : user.role === "ADMIN"
                          ? "/admin/dashboard"
                          : "/dashboard"
                    }
                    className="flex items-center gap-4 text-2xl font-bold dark:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="p-3 bg-orange-100 rounded-xl text-orange-600">
                      {isDashboardPage ? (
                        <HomeIcon size={24} />
                      ) : (
                        <LayoutDashboard size={24} />
                      )}
                    </div>
                    {isDashboardPage ? "Home" : "Dashboard"}
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 text-2xl font-bold text-red-500 text-left"
                  >
                    <div className="p-3 bg-red-50 rounded-xl">
                      <LogOut size={24} />
                    </div>
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-6">
                  <Link
                    to="/auth"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-bold dark:text-white border-b border-orange-100 pb-4"
                  >
                    Sign In
                  </Link>
                  <button
                    onClick={() => {
                      navigate("/auth");
                      setIsMenuOpen(false);
                    }}
                    className="bg-gray-900 text-white py-5 rounded-2xl font-bold text-xl shadow-xl shadow-gray-900/20"
                  >
                    Join Now
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
