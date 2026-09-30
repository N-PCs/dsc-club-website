import React from "react";
import { Terminal, Cpu } from "lucide-react";

export const SiloOurStory: React.FC = () => {
  return (
    <section
      id="about"
      className="w-full py-20 sm:py-28 px-4 sm:px-8 max-w-5xl mx-auto text-center scroll-mt-24"
    >
      {/* Eyebrow & Number */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className="size-8 rounded-xl border border-sky-400/40 bg-sky-950/40 flex items-center justify-center font-mono text-xs font-bold text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
          01
        </span>
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-950/30 px-4 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-sky-400">
          <span className="size-1.5 rounded-full bg-sky-400" />
          <span>PHILOSOPHY & HERITAGE</span>
        </div>
      </div>

      <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-none">
        DSC VIT BHOPAL
      </h2>

      <p className="text-xs sm:text-sm font-mono text-slate-400 mt-4 tracking-wider uppercase max-w-xl mx-auto">
        The student engineering collective transforming central India&apos;s AI landscape.
      </p>

      {/* Signature Pill Manifesto Line (Exact match of inspo2_02.jpg) */}
      <div className="mt-10 sm:mt-14 text-xl sm:text-3xl lg:text-4xl font-medium text-slate-200 flex flex-wrap items-center justify-center gap-3">
        <span>DSC VIT Bhopal combines</span>
        <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/60 bg-sky-950/40 px-4 sm:px-5 py-1 text-sky-300 font-mono text-base sm:text-2xl font-bold shadow-[0_0_20px_rgba(56,189,248,0.25)]">
          <Cpu className="size-4 sm:size-5 text-sky-400" />
          <span>intelligence</span>
        </span>
        <span>and</span>
        <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/60 bg-sky-950/40 px-4 sm:px-5 py-1 text-sky-300 font-mono text-base sm:text-2xl font-bold shadow-[0_0_20px_rgba(56,189,248,0.25)]">
          <Terminal className="size-4 sm:size-5 text-sky-400" />
          <span>engineering</span>
        </span>
        <span>in a true technological experiment.</span>
      </div>

      {/* Historical Milestones */}
      <div className="mt-16 sm:mt-24 pt-12 border-t border-sky-400/15 max-w-4xl mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-14 text-left">
        <div className="shrink-0 text-center sm:text-left">
          <span className="text-6xl sm:text-7xl lg:text-8xl font-black font-mono tracking-tighter text-sky-400 drop-shadow-[0_0_35px_rgba(56,189,248,0.35)]">
            2019
          </span>
          <span className="block text-[11px] font-mono uppercase tracking-widest text-slate-500 mt-1">
            ESTABLISHED AT VIT BHOPAL
          </span>
        </div>

        <div className="space-y-4">
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
            Established in 2019 at VIT Bhopal University, the Data Science Club began with a bold
            mission: to bridge the divide between theoretical textbook algorithms and real-world,
            production-grade computational software. Today, we stand as a 1,500+ student ecosystem
            pushing the frontiers of neural networks, high-throughput distributed systems, and
            open-source technology.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <div className="px-4 py-2 rounded-xl border border-sky-400/20 bg-[#050814] text-xs font-mono text-slate-300">
              <span className="text-sky-400 font-bold">1,500+</span> Community Builders
            </div>
            <div className="px-4 py-2 rounded-xl border border-sky-400/20 bg-[#050814] text-xs font-mono text-slate-300">
              <span className="text-sky-400 font-bold">45+</span> Labs & Sprints Hosted
            </div>
            <div className="px-4 py-2 rounded-xl border border-sky-400/20 bg-[#050814] text-xs font-mono text-slate-300">
              <span className="text-sky-400 font-bold">₹2.5L+</span> Bounties & Hackathon Prizes
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
