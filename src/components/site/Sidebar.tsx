import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Instagram,
  MessageSquare,
  Menu,
  X,
  ChevronRight,
  Database,
} from "lucide-react";

export interface ChapterNav {
  id: string; // e.g. "home", "about", "events", "projects", "team", "join"
  number: string; // "01", "02", etc.
  title: string; // "Home", "About", etc.
  accentColor: string; // "#0B3D91", etc.
}

interface SidebarProps {
  chapters: ChapterNav[];
  activeChapterId: string;
  onSelectChapter: (chapterId: string) => void;
}

export function Sidebar({
  chapters,
  activeChapterId,
  onSelectChapter,
}: SidebarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    onSelectChapter(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* DESKTOP FIXED LEFT SIDEBAR (≥ md) */}
      <aside
        className="hidden md:flex fixed top-0 left-0 bottom-0 w-20 lg:w-24 bg-white/90 backdrop-blur-md border-r border-slate-200/80 z-40 flex-col justify-between items-center py-6 px-2 text-slate-900 select-none shadow-xs"
        aria-label="Chapter Navigation"
      >
        {/* Top: Rotated Club Wordmark */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={() => handleNavClick("home")}
            className="w-10 h-10 rounded-2xl bg-[#0B3D91] flex items-center justify-center text-white shadow-md hover:scale-105 transition-transform"
            aria-label="Data Science Club Home"
          >
            <Database className="w-5 h-5" />
          </button>
          
          <div className="writing-mode-vertical text-[10px] font-bold tracking-[0.25em] uppercase text-slate-500 mt-2">
            DATA SCIENCE CLUB <span className="text-[#0B3D91]">• VIT BHOPAL</span>
          </div>
        </div>

        {/* Middle: Chapter Navigation List (01–06) */}
        <nav className="flex flex-col items-center gap-4 my-auto">
          {chapters.map((ch) => {
            const isActive = activeChapterId === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => handleNavClick(ch.id)}
                className={`group relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-[#0B3D91] text-white shadow-md scale-110"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                }`}
                aria-label={`Chapter ${ch.number}: ${ch.title}`}
                aria-current={isActive ? "step" : undefined}
              >
                <span className="font-mono text-xs font-bold">{ch.number}</span>

                {/* Tooltip on Hover */}
                <span className="absolute left-14 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-xl z-50">
                  {ch.number} — {ch.title}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Bottom: Social Links */}
        <div className="flex flex-col items-center gap-3.5 text-slate-400">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#0B3D91] transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#0B3D91] transition-colors"
            aria-label="Discord"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#0B3D91] transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#0B3D91] transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
        </div>
      </aside>

      {/* MOBILE TOP BAR (< md) */}
      <header className="flex md:hidden fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 z-40 items-center justify-between px-4 shadow-xs">
        <button
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-2.5 text-left"
        >
          <div className="w-9 h-9 rounded-xl bg-[#0B3D91] flex items-center justify-center text-white shadow-xs">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <div className="font-extrabold text-sm text-slate-900 tracking-tight leading-none font-display">
              DATA SCIENCE CLUB
            </div>
            <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5 font-mono">
              VIT Bhopal University
            </div>
          </div>
        </button>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Fullscreen Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-white flex flex-col justify-between p-6 overflow-y-auto md:hidden"
          >
            {/* Top Close Bar */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0B3D91] flex items-center justify-center text-white">
                  <Database className="w-4 h-4" />
                </div>
                <div className="font-bold text-base text-slate-900 font-display">
                  Chapter Directory
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Nav Chapters List */}
            <nav className="py-8 space-y-3">
              {chapters.map((ch) => {
                const isActive = activeChapterId === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => handleNavClick(ch.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all text-left ${
                      isActive
                        ? "bg-[#0B3D91] text-white border-[#0B3D91] shadow-lg"
                        : "bg-slate-50 text-slate-900 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-mono text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center border ${
                          isActive
                            ? "border-white/40 bg-white/10"
                            : "border-slate-300 bg-white text-slate-700"
                        }`}
                      >
                        {ch.number}
                      </span>
                      <span className="font-display font-bold text-lg">
                        {ch.title}
                      </span>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 ${
                        isActive ? "text-white" : "text-slate-400"
                      }`}
                    />
                  </button>
                );
              })}
            </nav>

            {/* Bottom Socials & Info */}
            <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>VIT Bhopal University</span>
              <div className="flex items-center gap-4">
                <a href="https://github.com" target="_blank" rel="noreferrer">
                  <Github className="w-5 h-5 text-slate-600" />
                </a>
                <a href="https://discord.gg" target="_blank" rel="noreferrer">
                  <MessageSquare className="w-5 h-5 text-slate-600" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                  <Linkedin className="w-5 h-5 text-slate-600" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
