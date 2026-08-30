import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  X,
  User,
  Mail,
  ShieldCheck,
  Github,
  MessageSquare,
  Linkedin,
} from "lucide-react";
import confetti from "canvas-confetti";

export function JoinCTA() {
  const [modalOpen, setModalOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [branch, setBranch] = useState("CSE (AI & ML)");
  const [year, setYear] = useState("2nd Year");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setSubmitted(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col justify-between h-full py-4 text-white">
      {/* Top Badge & Pitch */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-mono font-bold text-white shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-sky-300" />
          <span>JOIN THE CLUB — CHAPTER 06</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight leading-tight text-white">
          Become a Member of <br className="hidden sm:inline" />
          <span className="text-sky-300">DSC VIT Bhopal</span>
        </h2>

        <p className="text-blue-100 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-sans">
          Connect with 1,500+ student data engineers, machine learning developers, and researchers across campus. Participate in workshops, build open-source software, and join hackathon teams.
        </p>
      </div>

      {/* Main Action Callout Box */}
      <div className="my-auto py-8">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 max-w-3xl mx-auto text-left">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
              <ShieldCheck className="w-4 h-4" />
              <span>OFFICIAL STUDENT CHAPTER</span>
            </div>
            <h3 className="text-2xl font-bold font-display text-white">
              Membership Registration
            </h3>
            <p className="text-xs text-blue-100 max-w-md">
              Access technical bootcamps, community Discord channels, project collaboration groups, and hackathon teams.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="callout-bubble bg-white text-[#0B3D91] hover:bg-sky-50 text-sm font-bold px-8 py-4 shadow-xl hover:-translate-y-0.5 flex-shrink-0"
          >
            <span>Register Now</span>
            <ArrowRight className="w-4 h-4 text-[#0B3D91]" />
          </button>
        </div>
      </div>

      {/* Footer Contact & Socials */}
      <div className="pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-blue-200">
        <span>VIT BHOPAL UNIVERSITY • SEHORE, MADHYA PRADESH</span>
        
        <div className="flex items-center gap-4 text-white">
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-sky-300 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Discord</span>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-sky-300 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-sky-300 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>

      {/* Interactive Registration Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm text-slate-900">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative"
            >
              <button
                onClick={() => {
                  setModalOpen(false);
                  setSubmitted(false);
                }}
                className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div className="badge-blue mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Member Registration</span>
                  </div>

                  <h3 className="text-2xl font-bold font-display text-slate-900">
                    Join DSC VIT Bhopal
                  </h3>
                  <p className="text-xs text-slate-600">
                    Enter your university details to receive your community invite pass.
                  </p>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Alex Morgan"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#0B3D91]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      VIT Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="alex.morgan2024@vitbhopal.ac.in"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#0B3D91]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Branch
                      </label>
                      <select
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#0B3D91]"
                      >
                        <option>CSE (AI & ML)</option>
                        <option>CSE (Core)</option>
                        <option>CSE (Data Science)</option>
                        <option>Cyber Security</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Academic Year
                      </label>
                      <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#0B3D91]"
                      >
                        <option>1st Year</option>
                        <option>2nd Year</option>
                        <option>3rd Year</option>
                        <option>4th Year</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="callout-bubble w-full justify-center py-3 text-xs font-bold text-white bg-[#0B3D91] shadow-lg mt-2"
                  >
                    <span>Submit & Join Discord</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-slate-900">
                    Registration Submitted!
                  </h3>
                  <p className="text-xs text-slate-600">
                    Welcome to the club, <strong>{fullName}</strong>! An invite link has been sent to {email}.
                  </p>
                  <button
                    onClick={() => {
                      setModalOpen(false);
                      setSubmitted(false);
                    }}
                    className="btn-outline-slate text-xs px-6 py-2 mx-auto"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
