import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const SiloHero: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(Math.max(scrollY / 450, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scale = 1 - scrollProgress * 0.05;
  const borderRadius = Math.round(16 + scrollProgress * 20);

  return (
    <section className="relative w-full pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Top Metadata Header (SILO layout style adapted for DSC) */}
      <div className="hidden sm:flex items-center justify-between text-[11px] font-mono tracking-widest text-slate-400 mb-6 px-3 uppercase">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-sky-400 animate-pulse" />
          <span className="font-bold text-sky-400 tracking-wider">OPERATIONAL // NODE-01</span>
        </div>

        <div className="text-center tracking-[0.2em] text-slate-400">
          <span>MACHINE LEARNING // DISTRIBUTED SYSTEMS // OPEN INTELLIGENCE</span>
        </div>

        <div className="text-right">
          <span className="text-sky-400 font-bold">EST. 2019</span>
        </div>
      </div>

      {/* Main Hero Card with Dynamic Smooth Scroll Scaling */}
      <div
        ref={containerRef}
        style={{
          transform: `scale(${scale})`,
          borderRadius: `${borderRadius}px`,
          transition: "transform 0.1s ease-out, border-radius 0.15s ease-out",
        }}
        className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] max-h-[720px] overflow-hidden border border-sky-400/25 bg-[#030612] shadow-[0_25px_80px_rgba(0,0,0,0.9)]"
      >
        {/* Subtle Ambient Cyber Grid & Glow Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-950/40 via-[#030612] to-black pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e912_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e912_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />

        {/* Ambient Dark & Blue Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/20 to-black/85 pointer-events-none" />

        {/* Bottom Banner Content */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6 z-10">
          <div className="space-y-2 sm:space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-950/40 px-3.5 py-1 text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-[0.2em] text-sky-300 backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span>DATA SCIENCE CLUB — VIT BHOPAL</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] leading-none">
              DSC VIT BHOPAL
            </h1>

            <p className="text-xs sm:text-sm font-mono text-slate-300 max-w-xl leading-relaxed drop-shadow">
              Turning raw computational curiosities into production neural models, distributed data
              pipelines, and open-source intelligence.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <a
              href="#events"
              className="inline-flex items-center justify-center rounded-full bg-sky-400 px-7 sm:px-8 py-3.5 text-xs sm:text-sm font-mono font-bold tracking-wider text-black uppercase hover:bg-sky-300 hover:scale-[1.03] transition-all duration-300 shadow-[0_0_25px_rgba(56,189,248,0.4)] cursor-pointer"
            >
              EXPLORE SPRINTS
            </a>
            <Link
              to="/join"
              className="inline-flex items-center justify-center rounded-full border border-sky-400/40 bg-black/60 px-6 sm:px-7 py-3.5 text-xs sm:text-sm font-mono font-bold tracking-wider text-white uppercase hover:border-sky-400 hover:bg-sky-400/15 hover:shadow-[0_0_20px_rgba(56,189,248,0.25)] transition-all duration-300 cursor-pointer backdrop-blur-md"
            >
              <span>JOIN CORE</span>
              <ArrowRight className="size-3.5 ml-1.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
