import React from "react";
import { Link } from "@tanstack/react-router";

export const SiloFooter: React.FC = () => {
  return (
    <footer className="relative w-full border-t border-sky-400/20 bg-black pt-16 pb-12 px-6 sm:px-12 text-white overflow-hidden">
      {/* Giant Background Watermark (Matches inspo footer) */}
      <div
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-mono font-black text-[18vw] text-sky-950/20 select-none pointer-events-none tracking-tighter uppercase whitespace-nowrap z-0"
        aria-hidden="true"
      >
        DSC VITB
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-sky-400/15">
          {/* Left Column: Brand & Info (col-span-6) */}
          <div className="md:col-span-6 space-y-6">
            <div className="flex items-center gap-4">
              <img src="/DSClogo.png" alt="DSC Club Logo" className="h-10 w-auto object-contain" />
              <div className="h-6 w-px bg-sky-400/30" />
              <img
                src="/Collegelogo.png"
                alt="VIT Bhopal Logo"
                className="h-9 w-auto object-contain brightness-95"
              />
            </div>

            <p className="text-xs font-mono text-slate-400 max-w-md leading-relaxed">
              Official Data Science Club of VIT Bhopal University. Dedicated to high-throughput
              machine learning, distributed architectures, and competitive data science.
            </p>

            <div className="flex items-center gap-3">
              {[
                {
                  icon: "fa-brands fa-github",
                  href: "https://github.com/cdsvitbhopal",
                  label: "GitHub",
                },
                {
                  icon: "fa-brands fa-linkedin-in",
                  href: "https://www.linkedin.com/company/dsc-vitb/",
                  label: "LinkedIn",
                },
                {
                  icon: "fa-brands fa-x-twitter",
                  href: "https://x.com/DSC_VITB",
                  label: "Twitter",
                },
                {
                  icon: "fa-brands fa-instagram",
                  href: "https://www.instagram.com/dsc_vitb/",
                  label: "Instagram",
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="size-9 rounded-full border border-sky-400/30 bg-[#050813] flex items-center justify-center text-slate-400 hover:text-black hover:bg-sky-400 hover:border-sky-400 transition-all text-xs"
                >
                  <i className={s.icon} />
                </a>
              ))}
            </div>

            <div className="text-xs font-mono text-slate-500 space-y-1">
              <a
                href="mailto:dsc@vitbhopal.ac.in"
                className="hover:text-sky-400 transition-colors block text-slate-300"
              >
                dsc@vitbhopal.ac.in
              </a>
              <p>VIT Bhopal University, Bhopal-Indore Highway, Kothri Kalan, Sehore, MP 466114</p>
            </div>
          </div>

          {/* Right Column: Navigation Links (col-span-6) */}
          <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div>
              <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-sky-400 mb-4 font-bold">
                Navigation
              </h4>
              <ul className="space-y-2.5 text-xs font-mono text-slate-400">
                <li>
                  <a href="/" className="hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/#about" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="/#domains" className="hover:text-white transition-colors">
                    Domains
                  </a>
                </li>
                <li>
                  <a href="/#events" className="hover:text-white transition-colors">
                    Events
                  </a>
                </li>
                <li>
                  <Link to="/members" className="hover:text-white transition-colors">
                    Team Dossier
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-white transition-colors">
                    Register
                  </Link>
                </li>
                <li>
                  <Link to="/join" className="hover:text-white transition-colors">
                    Join Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-sky-400 mb-4 font-bold">
                Ecosystem
              </h4>
              <ul className="space-y-2.5 text-xs font-mono text-slate-400">
                <li>
                  <Link to="/events" className="hover:text-white transition-colors">
                    Full Calendar
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="hover:text-white transition-colors">
                    Media Archive
                  </Link>
                </li>
                <li>
                  <a href="/#visit" className="hover:text-white transition-colors">
                    Campus Logistics
                  </a>
                </li>
                <li>
                  <a href="/#contact" className="hover:text-white transition-colors">
                    Contact & Collab
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-sky-400 mb-4 font-bold">
                Internal
              </h4>
              <ul className="space-y-2.5 text-xs font-mono text-slate-400">
                <li>
                  <Link
                    to="/admin"
                    className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 font-bold"
                  >
                    <span>🛡️</span> Admin Access
                  </Link>
                </li>
                <li>
                  <span className="text-slate-600">v1.4.0-stable</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© 2026 Data Science Club VIT Bhopal. All Rights Reserved.</p>
          <p className="text-[10px] text-slate-600 uppercase tracking-widest">
            ENGINEERED IN OBSIDIAN & ELECTRIC BLUE
          </p>
        </div>
      </div>
    </footer>
  );
};
