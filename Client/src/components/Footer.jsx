import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Twitter,Linkedin, Instagram, ShieldCheck, Heart } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const handleMentorRedirect = () => {
    navigate("/auth", {
      state: { initialRole: "MENTOR", initialIsLogin: false },
    });
  };

  return (
    <footer className="relative bg-[#0f0f0f] pt-24 pb-10 font-sans -mt-8 overflow-hidden">
      {/* Visual Bridge Curve */}
      <div className="absolute top-0 left-0 right-0 -mt-12 h-12 bg-[#0f0f0f] rounded-t-[3rem] z-10"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-20 items-start">
          {/* Brand Manifesto */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <Link to="/" className="inline-flex items-center gap-3 mb-8 group">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2.5 rounded-xl shadow-lg shadow-orange-500/20">
                <ShieldCheck size={28} className="text-white" />
              </div>
              <span className="text-3xl font-black tracking-tight text-white">
                Step2<span className="text-orange-500">Campus</span>
              </span>
            </Link>

            <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
              The anti-brochure for <br />
              <span className="text-gray-500">college admissions.</span>
            </h3>

            <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
              Real advice from those who lived it yesterday. 100% verified
              students. 0% marketing fluff.
            </p>
          </div>

          {/* Connect & Explore */}
          <div className="lg:col-span-5 flex flex-col lg:items-end gap-8 pt-4">
            <div className="flex flex-col lg:items-end gap-4">
              <span className="text-gray-500 text-sm font-bold tracking-widest uppercase">
                Connect
              </span>
              <div className="flex gap-4">
                <SocialIcon
                  icon={<Twitter size={24} />}
                  href="https://twitter.com/step2campus"
                />
                <SocialIcon
                  icon={<Linkedin size={24} />}
                  href="https://linkedin.com/company/step2campus/"
                />
                <SocialIcon
                  icon={<Instagram size={24} />}
                  href="https://www.instagram.com/step2campus"
                />
              </div>
            </div>

            <div className="flex flex-col lg:items-end gap-4 mt-4">
              <span className="text-gray-500 text-sm font-bold tracking-widest uppercase">
                Explore
              </span>
              <div className="flex gap-6">
                <button
                  onClick={handleMentorRedirect}
                  className="text-gray-400 hover:text-orange-500 font-medium transition-colors"
                >
                  Be a Mentor
                </button>
                <FooterLink to="/contact">Support</FooterLink>
                <FooterLink to="https://linkedin.com/company/step2campus/">Careers</FooterLink>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm flex items-center gap-1">
            © {currentYear} Step2Campus. Made with{" "}
            <Heart size={12} className="text-red-500 fill-red-500" /> by
            Students.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="text-gray-600 text-sm hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-600 text-sm hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon, href }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer" // Security Fix: Prevents tabnabbing
    whileHover={{ y: -5, backgroundColor: "rgba(255,255,255, 0.1)" }}
    className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all backdrop-blur-sm"
  >
    {icon}
  </motion.a>
);

const FooterLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-gray-400 hover:text-orange-500 text-base font-medium transition-colors"
  >
    {children}
  </Link>
);

export default Footer;
