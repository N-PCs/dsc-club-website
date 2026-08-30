import { Link } from "@tanstack/react-router";
import { Database, Github, Linkedin, Twitter, Mail, ArrowUpRight, Heart } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand & Description */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Database className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white">DSC VITB</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Official Data Science Club at VIT Bhopal. Fostering innovation in AI, Machine Learning, Big Data Engineering, and Open Source.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">Navigation</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Guild</Link></li>
              <li><Link to="/events" className="hover:text-blue-400 transition-colors">Upcoming Events</Link></li>
              <li><Link to="/members" className="hover:text-blue-400 transition-colors">Team Roster</Link></li>
              <li><Link to="/gallery" className="hover:text-blue-400 transition-colors">Gallery</Link></li>
              <li><Link to="/join" className="hover:text-blue-400 transition-colors">Join Community</Link></li>
            </ul>
          </div>

          {/* Core Domains */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">Domains</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><span className="hover:text-blue-400 cursor-default">AI & Deep Learning</span></li>
              <li><span className="hover:text-blue-400 cursor-default">Data Engineering & Pipelines</span></li>
              <li><span className="hover:text-blue-400 cursor-default">Open Source Research</span></li>
              <li><span className="hover:text-blue-400 cursor-default">Competitive Coding & Math</span></li>
            </ul>
          </div>

          {/* Connect & Socials */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">Connect</h4>
            <p className="text-sm text-slate-400">
              VIT Bhopal University, Kotri Kalan, Sehore, Madhya Pradesh 466114
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-blue-600 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-blue-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="mailto:dsc@vitbhopal.ac.in"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-blue-600 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Data Science Club (DSC) VIT Bhopal. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-blue-400 transition-colors"
            >
              <span>Back to top</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
