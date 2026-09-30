import React from "react";
import { Link } from "@tanstack/react-router";
import { SiloEventData } from "./SiloEventModal";
import { upcomingEventList } from "./siloData";
import { ArrowRight } from "lucide-react";

interface SiloUpcomingEventsProps {
  onSelectEvent: (event: SiloEventData) => void;
}

export const SiloUpcomingEvents: React.FC<SiloUpcomingEventsProps> = ({ onSelectEvent }) => {
  return (
    <section
      id="upcoming"
      className="w-full py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto scroll-mt-24"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="size-8 rounded-xl border border-sky-400/40 bg-sky-950/40 flex items-center justify-center font-mono text-xs font-bold text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              08
            </span>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-950/30 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-sky-400">
              <span className="size-1.5 rounded-full bg-sky-400" />
              <span>UPCOMING SCHEDULE</span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-3">
            Upcoming Tracks & Sprints
          </h2>
          <p className="text-xs sm:text-sm font-mono text-slate-400 mt-2">
            Specialized machine learning tracks, streaming data workshops, and competitive
            datathons.
          </p>
        </div>

        <div>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 px-6 py-2.5 text-xs font-mono font-medium tracking-wider text-slate-300 hover:text-white hover:border-sky-400 hover:bg-sky-400/15 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all duration-300 uppercase cursor-pointer"
          >
            <span>FULL CALENDAR</span>
            <ArrowRight className="size-3 text-sky-400" />
          </Link>
        </div>
      </div>

      {/* 2-Row / 4-Col Grid of Sleek Rounded Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {upcomingEventList.map((evt) => {
          const parts = evt.date.split(",");
          const dayOfWeek = parts[0]?.trim() || "";
          const dateMonthParts = parts[1]?.trim().split(" ") || [];
          const month = dateMonthParts[0] || "";
          const dayNum = dateMonthParts[1] || "21";

          return (
            <article
              key={evt.id}
              onClick={() => onSelectEvent(evt)}
              className="group relative h-64 sm:h-72 rounded-3xl border border-sky-400/20 bg-[#050814] p-6 flex flex-col justify-between overflow-hidden hover:border-sky-400/80 hover:shadow-[0_0_40px_rgba(56,189,248,0.25)] hover:-translate-y-1.5 transition-all duration-300 ease-out cursor-pointer"
            >
              {/* Top Row: Date Numeral & Month Chip */}
              <div className="flex items-start justify-between z-10">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold font-mono text-white group-hover:text-sky-400 transition-colors">
                    {dayNum}
                  </span>
                  <div className="text-[10px] font-mono text-slate-400 leading-tight">
                    <span className="block text-slate-200">{dayOfWeek}</span>
                    <span className="block text-sky-400 uppercase font-semibold">{month}</span>
                  </div>
                </div>

                {evt.badge && (
                  <span className="bg-sky-400 text-black text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md">
                    {evt.badge}
                  </span>
                )}
              </div>

              {/* Center Abstract 3D Geometric Visual with Blue/White Glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity duration-500">
                <div className="relative size-32 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-2xl border border-sky-400/30 rotate-12 group-hover:rotate-45 transition-transform duration-700" />
                  <div className="absolute size-24 rounded-2xl border border-white/20 -rotate-6 group-hover:rotate-12 transition-transform duration-700" />
                  <div className="size-16 rounded-full bg-sky-500/20 blur-xl group-hover:bg-sky-400/30 transition-all" />
                  <div className="size-3 rounded-full bg-sky-400 shadow-[0_0_12px_#38bdf8]" />
                </div>
              </div>

              {/* Bottom Row: Category, Speaker & Hover DETAILS Button */}
              <div className="flex items-end justify-between z-10 gap-2">
                <div>
                  <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest block font-semibold">
                    {evt.category}
                  </span>
                  <h3 className="text-sm font-bold text-white tracking-tight leading-snug group-hover:text-sky-300 transition-colors mt-1 line-clamp-2">
                    {evt.title}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400 block mt-0.5 truncate">
                    {evt.speaker}
                  </span>
                </div>

                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 inline-flex items-center rounded-full border border-sky-400 bg-sky-400/20 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-sky-300 shrink-0">
                  DETAILS
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
